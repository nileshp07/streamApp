import { NextFunction, Request, Response } from "express";

import { verifyAuthToken } from "@managers/tokenManager";

export const verifyUserToken = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const userAuthToken = req.cookies.accessToken;

	if (!userAuthToken) {
		return res.status(401).json({
			message: "NOT AUTHENTICATED",
		});
	}

	const user = verifyAuthToken(userAuthToken);

	if (!user) {
		return res.status(403).json({
			message: "INVALID AUTH-TOKEN",
		});
	}

	req.user = user;

	next();
};

export const verifyUserTokenAndAuthorization = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	verifyUserToken(req, res, () => {
		if (req.user?.id !== Number(req.params.userId)) {
			return res.status(403).json({
				message: "UNAUTHORIZED USER",
			});
		}

		next();
	});
};
