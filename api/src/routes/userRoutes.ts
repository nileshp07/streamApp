import {
	deleteUser,
	updateUser,
	updateUserPassword,
} from '@controllers/userController';
import {veryifyUserTokenAndAuthorization} from '@middlewares/tokenVerification';
import {Router} from 'express';

const router: Router = Router();

router
	.delete('/:userId', veryifyUserTokenAndAuthorization, deleteUser)
	.put(
		'/changePassword/:userId',
		veryifyUserTokenAndAuthorization,
		updateUserPassword
	)
	.put('/:userId', veryifyUserTokenAndAuthorization, updateUser);
export default router;
