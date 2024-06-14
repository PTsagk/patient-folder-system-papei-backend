import express from "express";
import {
  userLogin,
  userRegister,
  userUpdate,
  getAllUsers,
  userDeleteById,
  userAuth,
  updateUserPfp,
} from "../controllers/user.controller";
import { authenticateAdmin } from "../controllers/authenticate.controller";
const router = express.Router();
router.route("/login/:role").post(userLogin);
router.route("/auth").get(userAuth);
router.route("/register_user").post(userRegister);
router.route("/register_doctor").post(userRegister);
//@ts-ignore
router.route("/update_user").put(authenticateAdmin, userUpdate);
router.route("/delete/:role").all(authenticateAdmin).delete(userDeleteById);

router.route("/view/all/:role").all(authenticateAdmin).get(getAllUsers);

router.route("/update_pfp/:role").patch(updateUserPfp);

export default router;
