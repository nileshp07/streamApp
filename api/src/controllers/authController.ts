import {string, z} from 'zod';
import {Request, Response} from 'express';
import {encryptPassword, decryptPassword} from '@managers/passwordManager';
import {createToken} from '@managers/tokenManager';

import {PrismaClient} from '@prisma/client';
const prisma = new PrismaClient();

export const register = async (req: Request, res: Response) => {
	const inputSchema = z.object({
		firstName: string().min(3, 'Minimum 3 charcters requried.'),
		lastName: string().min(3, 'Minimum 3 ch,aracters required.'),
		email: string().email(),
		password: string().min(
			8,
			'Password must be of minimum of 8 charcters long.'
		),
	});

	const parsedInput = inputSchema.safeParse(req.body);

	if (!parsedInput.success) {
		return res.status(401).json({
			message: 'Invalid inputs.',
			error: parsedInput.error,
		});
	}

	try {
		const existingUser = await prisma.user.findFirst({
			where: {
				email: req.body.email,
			},
		});

		if (existingUser) {
			return res.status(403).json({
				message: 'User with that email already exists.',
			});
		}

		const newUser = await prisma.user.create({
			data: {
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				email: req.body.email,
				password: encryptPassword(req.body.password),
			},
		});

		// create jwt token with the newUser id as payload
		const accessToken = createToken({
			id: newUser.id,
		});

		// Store the token in cookie
		res.cookie('accessToken', accessToken);

		// exclude password field from newUser
		const {password, ...otherdetails} = newUser;

		// send response
		return res.status(201).json({
			message: 'Registered Successfully.',
			token: accessToken,
			data: otherdetails,
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

	try {
		const user = await prisma.user.findFirst({
			where: {
				email: req.body.email,
			},
		});

		if (!user) {
			return res.status(404).json({
				message: 'No user found with that email.',
			});
		}

		// decrpting the hashed password stored in the db
		const decryptedPassword = decryptPassword(user.password);

		if (decryptedPassword != req.body.password) {
			return res.status(401).json({
				message: 'Wrong Credentials',
			});
		}

		// Create jwt token with userid as payload
		const accessToken = createToken({
			id: user.id,
		});

		// Store the token in cookie
		res.cookie('accessToken', accessToken);

		// Send the token as response
		return res.status(201).json({
			message: 'Login successfull.',
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
