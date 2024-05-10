import {string, z} from 'zod';
import {Request, Response} from 'express';
import {encryptPassword, decryptPassword} from '@managers/passwordManager';
import {createToken} from '@managers/tokenManager';

import {PrismaClient} from '@prisma/client';
import {createNewUser, findUserByEmail} from '@utils/prismaQueryFns';
const prisma = new PrismaClient();

export const register = async (req: Request, res: Response) => {
	const inputSchema = z.object({
		firstName: string().min(3, 'Minimum 3 characters required.'),
		lastName: string().min(3, 'Minimum 3 characters required.'),
		email: string().email(),
		password: string().min(
			8,
			'Password must be of minimum of 8 characters long.'
		),
	});

	const parsedInput = inputSchema.safeParse(req.body);

	if (!parsedInput.success) {
		return res.status(401).json({
			message: 'Invalid inputs.',
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
				message: 'User with that email already exists.',
			});
		}

		const newUser = await createNewUser(
			firstName,
			lastName,
			email,
			inputPassword,
			encryptPassword
		);

		// create jwt token with the newUser id as payload
		const accessToken = createToken({
			id: newUser.id,
		});

		// Store the token in cookie
		res.cookie('accessToken', accessToken);

		// exclude password field from newUser
		const {password, ...otherDetails} = newUser;

		// send response
		return res.status(201).json({
			message: 'Registered Successfully.',
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
	const inputSchema = z.object({
		email: z.string().email(),
		password: z.string(),
	});

	const parsedInput = inputSchema.safeParse(req.body);

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

		// decrypting the hashed password stored in the db
		const decryptedPassword = decryptPassword(user.password);

		if (decryptedPassword != req.body.password) {
			return res.status(401).json({
				message: 'Wrong Credentials',
			});
		}

		// Create jwt token with userId as payload
		const accessToken = createToken({
			id: user.id,
		});

		// Store the token in cookie
		res.cookie('accessToken', accessToken);

		// Send the token as response
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
