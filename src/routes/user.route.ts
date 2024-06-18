import express from "express";
import {
  authenticateAdmin,
  authenticateController,
} from "../controllers/authenticate.controller";
import {
  doctorRegister,
  getAllUsers,
  getUserByEmail,
  userAuth,
  userDeleteById,
  userLogin,
  userLogout,
  userRegister,
  userUpdate,
  partialUserUpdate,
} from "../controllers/user.controller";
const router = express.Router();
router.route("/login").post(userLogin);
router
  .route("/partial_update")
  .all(authenticateController)
  .put(partialUserUpdate);
router.route("/auth").get(userAuth);
router.route("/logout").get(userLogout);
router.route("/register_user").post(userRegister);
router.route("/register_doctor").post(doctorRegister);
router.route("/get_user_by_email").post(getUserByEmail);
//router.route("/update_user").put(authenticateAdmin, userUpdate);
router.route("/delete/:role").all(authenticateAdmin).delete(userDeleteById);

router.route("/view/all/:role").all(authenticateAdmin).get(getAllUsers);

export default router;
