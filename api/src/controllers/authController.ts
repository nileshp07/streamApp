import {string, z} from 'zod';
import {Request, Response} from 'express';
import {encryptPassword, decryptPassword} from '@managers/passwordManager';
import {createToken} from '@managers/tokenManager';

import {createNewUser, findUserByEmail} from '@utils/prismaQueryFns';
import {loginUserSchema, registerUserSchema} from '@schema/user';

export const register = async (req: Request, res: Response) => {
	const parsedInput = registerUserSchema.safeParse(req.body);

	if (!parsedInput.success) {
		return res.status(401).json({
			message: 'Invalid inputs.',
			error: parsedInput.error,
		});
	}

	const {firstName, lastName, email, password: inputPassword} = parsedInput.data;

	try {
		const existingUser = await findUserByEmail(email);

		if (existingUser) {
			return res.status(403).json({
				message: 'User with that email already exists.',
			});
		}

		const newUser = await createNewUser(firstName, lastName, email, encryptPassword(inputPassword));

		// create jwt token with the newUser id as payload
		const accessToken = createToken({
			id: newUser.id,
		});

		res.cookie('accessToken', accessToken);

		// exclude password field from newUser
		const {password, ...otherDetails} = newUser;

		return res.status(201).json({
			message: 'Registered Successfully.',
			token: accessToken,
			data: otherDetails,
		});
	} catch (error: any) {
		return res.status(500).json({
			error: error,
			message: error.response.data.message,
		});
	}
};

export const login = async (req: Request, res: Response) => {
	const parsedInput = loginUserSchema.safeParse(req.body);

	if (!parsedInput.success) {
		return res.status(401).json({
			message: 'Invalid inputs.',
			error: parsedInput.error,
		});
	}

	const {email} = parsedInput.data;

	try {
		const user = await findUserByEmail(email);

		if (!user) {
			return res.status(404).json({
				message: 'No user found with that email.',
			});
		}

		const decryptedPassword = decryptPassword(user.password);

		if (decryptedPassword != req.body.password) {
			return res.status(401).json({
				message: 'Wrong Credentials',
			});
		}

		const accessToken = createToken({
			id: user.id,
		});

		// Store the token in cookie
		res.cookie('accessToken', accessToken);

		return res.status(201).json({
			message: 'Login successful.',
			token: accessToken,
		});
	} catch (error) {
		return res.status(500).json({
			error: error,
		});
	}
};

export const logout = async (req: Request, res: Response) => {
	return res.clearCookie('accessToken').status(200).json({
		message: 'Successfully Logged OUT.',
	});
};
