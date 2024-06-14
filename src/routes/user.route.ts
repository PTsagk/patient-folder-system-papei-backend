import express from "express";
import {
  userLogin,
  userRegister,
  userUpdate,
  getAllUsers,
  userDeleteById,
  userAuth,
  updateUserPfp,
  updateUserInfo,
} from "../controllers/user.controller";
import {
  authenticateAdmin,
  authenticateController,
} from "../controllers/authenticate.controller";
const router = express.Router();
router.route("/login").post(userLogin);
router.route("/auth").get(userAuth);
router.route("/register").post(userRegister);
//@ts-ignore
router.route("/update_user").put(authenticateAdmin, userUpdate);
router.route("/delete_user/").all(authenticateAdmin).delete(userDeleteById);

router.route("/view/all_users").all(authenticateAdmin).get(getAllUsers);

router.route("/update_pfp").patch(updateUserPfp);
router.route("/update_pfp_info").patch(updateUserInfo);

export default router;
