import {
	deleteUser,
	updateUser,
	updateUserPassword,
} from "@controllers/userController";
import { verifyUserTokenAndAuthorization } from "@middlewares/tokenVerification";
import { Router } from "express";

const router: Router = Router();

router.delete("/:userId", verifyUserTokenAndAuthorization, deleteUser);
router.put("/:userId", verifyUserTokenAndAuthorization, updateUser);
router.put(
	"/changePassword/:userId",
	verifyUserTokenAndAuthorization,
	updateUserPassword
);

export default router;
