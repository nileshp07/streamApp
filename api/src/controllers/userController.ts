import {NextFunction, Request, Response} from 'express';
import {z} from 'zod';
import {decryptPassword, encryptPassword} from '@managers/passwordManager';

import {PrismaClient} from '@prisma/client';
const prisma = new PrismaClient();

export const deleteUser = async (req: Request, res: Response) => {
	const userId = req.params.userId;

	try {
		const existingUser = await prisma.user.findFirst({
			where: {
				id: Number(userId),
			},
		});

		if (!existingUser) {
			return res.status(404).json({
				message: 'User Does not exists.',
			});
		}

		await prisma.user.delete({
			where: {
				id: Number(userId),
			},
		});

		return res.status(200).json({
			message: 'User deleted successfully.',
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			error: error,
		});
	}
};

export const updateUserPassword = async (req: Request, res: Response) => {
	const userId = req.params.userId;

	const inputSchema = z.object({
		password: z.string(),
		newPassword: z.string(),
	});

	const parsedInput = inputSchema.safeParse(req.body);

	if (!parsedInput.success) {
		return res.status(401).json({
			message: 'Invalid inputs.',
			error: parsedInput.error,
		});
	}

	const {password, newPassword} = req.body;

	try {
		const user = await prisma.user.findFirst({
			where: {
				id: Number(userId),
			},
		});

		if (!user) {
			return res.status(404).json({
				message: 'User does not exists.',
			});
		}

		const originalPassword = decryptPassword(user.password);

		if (password === originalPassword) {
			await prisma.user.update({
				where: {
					id: Number(userId),
				},
				data: {
					password: encryptPassword(newPassword),
				},
			});

			const {password, ...otherDetails} = user;

			return res.status(200).json({
				message: 'Password updated successfully.',
				data: otherDetails, //excluding password field
			});
		} else {
			return res.status(403).json({
				message: 'Wrong Credentials',
			});
		}
	} catch (error) {
		console.log(error);
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

	const inputSchema = z.object({
		firstName: z.union([z.string(), z.undefined()]),
		lastName: z.union([z.string(), z.undefined()]),
		email: z.union([z.string().email(), z.undefined()]),
	});

	const parsedInput = inputSchema.safeParse(req.body);

	if (!parsedInput.success) {
		return res.status(401).json({
			message: 'Invalid inputs.',
			error: parsedInput.error,
		});
	}

	const {firstName, lastName, email} = parsedInput.data;

	try {
		const user = await prisma.user.findFirst({
			where: {
				id: Number(userId),
			},
		});

		if (!user) {
			return res.status(404).json({
				message: 'User does not exists.',
			});
		}

		const updatedUser = await prisma.user.update({
			where: {
				id: Number(userId),
			},
			data: {
				firstName,
				lastName,
				email,
			},
		});

		const {password, ...otherDetails} = updatedUser;

		return res.status(201).json({
			message: 'User data updated successfully.',
			data: otherDetails,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			error: error,
		});
	}
};
