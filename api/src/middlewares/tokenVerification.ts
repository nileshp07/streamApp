import {verifyAuthToken} from '@managers/tokenManager';
import {Request, Response, NextFunction} from 'express';

export const verifyUserToken = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const userAuthToken = req.cookies.accessToken;

	if (!userAuthToken) {
		return res.status(401).json({
			message: 'NOT AUTHENTICATED.',
		});
	}

	const user = verifyAuthToken(userAuthToken);

	if (!user) {
		return res.status(403).json({
			message: 'Invalid Token.',
		});
	}

	req.user = user;

	next();
};

export const veryifyUserTokenAndAuthorization = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	verifyUserToken(req, res, () => {
		if (req.user?.id === Number(req.params.userId)) {
			next();
		} else {
			return res.status(403).json({
				message: 'Unauthorized User',
			});
		}
	});
};
