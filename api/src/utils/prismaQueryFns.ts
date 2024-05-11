import {PrismaClient} from '@prisma/client';
const prisma = new PrismaClient();

type encryptPasswordFnType = (input: string) => string;

export const findUserById = async (userId: string) => {
	const user = await prisma.user.findFirst({
		where: {
			id: Number(userId),
		},
	});

	return user;
};

export const findUserByEmail = async (email: string) => {
	const user = await prisma.user.findFirst({
		where: {
			email,
		},
	});

	return user;
};

export const deleteUserById = async (userId: string) => {
	await prisma.user.delete({
		where: {
			id: Number(userId),
		},
	});
};

export const updateUserPasswordById = async (
	userId: string,
	encryptPassword: encryptPasswordFnType,
	newPassword: string
) => {
	await prisma.user.update({
		where: {
			id: Number(userId),
		},
		data: {
			password: encryptPassword(newPassword),
		},
	});
};

export const updateUserById = async (
	userId: string,
	firstName: string | undefined,
	lastName: string | undefined,
	email: string | undefined
) => {
	const user = await prisma.user.update({
		where: {
			id: Number(userId),
		},
		data: {
			firstName,
			lastName,
			email,
		},
	});

	return user;
};

export const createNewUser = async (
	firstName: string,
	lastName: string,
	email: string,
	inputPassword: string,
	encryptPassword: encryptPasswordFnType
) => {
	const newUser = await prisma.user.create({
		data: {
			firstName,
			lastName,
			email,
			password: encryptPassword(inputPassword),
		},
	});

	return newUser;
};
