import jwt from "jsonwebtoken";

export const createToken = (values: Record<string, any>) => {
	return jwt.sign(values, process.env.JWT_SECRET as string, {
		expiresIn: "90d",
	});
};

export const verifyAuthToken = (token: string) => {
	try {
		const user = jwt.verify(token, process.env.JWT_SECRET as string);
		return user;
	} catch (error) {
		return null;
	}
};
