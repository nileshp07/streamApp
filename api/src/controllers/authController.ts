import { Request, Response } from "express";

import { decryptPassword, encryptPassword } from "@managers/passwordManager";
import { createToken } from "@managers/tokenManager";

import { loginUserSchema, registerUserSchema } from "@schema/user";
import { createNewUser, findUserByEmail } from "@utils/prismaQueryFns";

export const register = async (req: Request, res: Response) => {
	const parsedInput = registerUserSchema.safeParse(req.body);

	if (!parsedInput.success) {
		return res.status(400).json({
			message: "INVALID INPUTS",
			error: parsedInput.error,
		});
	}

	const {
		firstName,
		lastName,
		email,
		password: inputPassword,
	} = parsedInput.data;

	try {
		const existingUser = await findUserByEmail(email);

		if (existingUser) {
			return res.status(403).json({
				message: "USER ALREADY EXISTS",
			});
		}

		const newUser = await createNewUser(
			firstName,
			lastName,
			email,
			encryptPassword(inputPassword)
		);

		const accessToken = createToken({
			id: newUser.id,
		});

		res.cookie("accessToken", accessToken);

		const { password, ...otherDetails } = newUser;

		return res.status(201).json({
			message: "REGISTERED SUCCESSFULLY",
			token: accessToken,
			data: otherDetails,
		});
	} catch (error) {
		return res.status(500).json({
			error: error,
		});
	}
};

export const login = async (req: Request, res: Response) => {
	const parsedInput = loginUserSchema.safeParse(req.body);

	if (!parsedInput.success) {
		return res.status(400).json({
			message: "INVALID INPUTS",
			error: parsedInput.error,
		});
	}

	const { email } = parsedInput.data;

	try {
		const user = await findUserByEmail(email);

		if (!user) {
			return res.status(404).json({
				message: "USER NOT FOUND",
			});
		}

		const decryptedPassword = decryptPassword(user.password);

		if (decryptedPassword != req.body.password) {
			return res.status(401).json({
				message: "INVALID CREDENTIALS",
			});
		}

		const accessToken = createToken({
			id: user.id,
		});

		res.cookie("accessToken", accessToken);

		return res.status(201).json({
			message: "LOGIN SUCCESSFULLY",
			token: accessToken,
		});
	} catch (error) {
		return res.status(500).json({
			error: error,
		});
	}
};

export const logout = async (req: Request, res: Response) => {
	return res.clearCookie("accessToken").status(200).json({
		message: "LOGGED OUT SUCCESSFULLY",
	});
};
