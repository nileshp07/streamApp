import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const findUserById = (userId: string) =>
	prisma.user.findFirst({
		where: {
			id: Number(userId),
		},
	});

export const findUserByEmail = (email: string) =>
	prisma.user.findFirst({
		where: {
			email,
		},
	});

export const deleteUserById = (userId: string) =>
	prisma.user.delete({
		where: {
			id: Number(userId),
		},
	});

export const updateUserPasswordById = (userId: string, newPassword: string) =>
	prisma.user.update({
		where: {
			id: Number(userId),
		},
		data: {
			password: newPassword,
		},
	});

export const updateUserById = (
	userId: string,
	firstName: string | undefined,
	lastName: string | undefined,
	email: string | undefined
) =>
	prisma.user.update({
		where: {
			id: Number(userId),
		},
		data: {
			firstName,
			lastName,
			email,
		},
	});

export const createNewUser = (
	firstName: string,
	lastName: string,
	email: string,
	inputPassword: string
) =>
	prisma.user.create({
		data: {
			firstName,
			lastName,
			email,
			password: inputPassword,
		},
	});
