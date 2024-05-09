// To add a custom property on Request interface

declare namespace Express {
	export interface Request {
		user?: any;
	}
}
