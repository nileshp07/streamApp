import { NextFunction, Request, Response } from "express";

import { decryptPassword, encryptPassword } from "@managers/passwordManager";
import { updatedUserSchema, updateUserPasswordSchema } from "@schema/user";
import {
	deleteUserById,
	findUserById,
	updateUserById,
	updateUserPasswordById,
} from "@utils/prismaQueryFns";

export const deleteUser = async (req: Request, res: Response) => {
	const userId = req.params.userId;

	try {
		const existingUser = await findUserById(userId);

		if (!existingUser) {
			return res.status(404).json({
				message: "USER NOT FOUND",
			});
		}

		await deleteUserById(userId);

		return res.status(200).json({
			message: "USER DELETED SUCCESSFULLY",
		});
	} catch (error) {
		return res.status(500).json({
			error: error,
		});
	}
};

export const updateUserPassword = async (req: Request, res: Response) => {
	const userId = req.params.userId;
	const { oldPassword, newPassword } = req.body;

	const parsedInput = updateUserPasswordSchema.safeParse(req.body);

	if (!parsedInput.success) {
		return res.status(400).json({
			message: "INVALID INPUTS",
			error: parsedInput.error,
		});
	}

	try {
		const user = await findUserById(userId);

		if (!user) {
			return res.status(404).json({
				message: "USER NOT FOUND",
			});
		}

		const originalPassword = decryptPassword(user.password);

		if (oldPassword !== originalPassword) {
			return res.status(401).json({
				message: "INVALID CREDENTIALS",
			});
		}

		const updatedUser = await updateUserPasswordById(
			userId,
			encryptPassword(newPassword)
		);

		const { password, ...otherDetails } = updatedUser;

		return res.status(200).json({
			message: "PASSWORD UPDATED SUCCESSFULLY",
			data: otherDetails,
		});
	} catch (error) {
		return res.status(500).json({
			error: error,
		});
	}
};

export const updateUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const userId = req.params.userId;

	const parsedInput = updatedUserSchema.safeParse(req.body);

	if (!parsedInput.success) {
		return res.status(400).json({
			message: "INVALID INPUTS",
			error: parsedInput.error,
		});
	}

	const { firstName, lastName, email } = parsedInput.data;

	try {
		const user = await findUserById(userId);

		if (!user) {
			return res.status(404).json({
				message: "USER NOT FOUND",
			});
		}

		const updatedUser = await updateUserById(
			userId,
			firstName,
			lastName,
			email
		);

		const { password, ...otherDetails } = updatedUser;

		return res.status(201).json({
			message: "DETAILS UPDATED SUCCESSFULLY",
			data: otherDetails,
		});
	} catch (error) {
		return res.status(500).json({
			error: error,
		});
	}
};
