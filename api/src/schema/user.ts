import { z } from "zod";

export const registerUserSchema = z.object({
	firstName: z.string().min(3, "Minimum 3 characters required."),
	lastName: z.string().min(3, "Minimum 3 characters required."),
	email: z.string().email(),
	password: z
		.string()
		.min(8, "Password must be of minimum of 8 characters long."),
});

export const loginUserSchema = z.object({
	email: z.string().email(),
	password: z.string(),
});

export const updatedUserSchema = z.object({
	firstName: z.union([z.string(), z.undefined()]),
	lastName: z.union([z.string(), z.undefined()]),
	email: z.union([z.string().email(), z.undefined()]),
});

export const updateUserPasswordSchema = z.object({
	password: z.string(),
	newPassword: z.string(),
});
