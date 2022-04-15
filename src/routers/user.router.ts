import { Router } from "express";
import { param } from "express-validator";
import { UserController } from "../controllers/user.controller";
import {
  AuthenticationMiddleware,
  SelfAndAdminAuthorizationMiddleware,
} from "../middlewares/auth.middleware";
import { ValidationMiddleware } from "../middlewares/validation.middleware";
import { userUpdateVS } from "../validation/user.validation";

export const UserRouter = Router();

const userController = new UserController();

UserRouter.get("/count", userController.getUserCount);

UserRouter.get("/", userController.getAllUsers);

UserRouter.get("/:userId", userController.getUserById);

UserRouter.put(
  "/:userId",
  AuthenticationMiddleware(),
  SelfAndAdminAuthorizationMiddleware(),
  ValidationMiddleware(userUpdateVS),
  userController.updateUser
);

UserRouter.delete(
  "/:userId",
  param("userId").isMongoId().withMessage("user id is not valid"),
  AuthenticationMiddleware(),
  SelfAndAdminAuthorizationMiddleware(),
  userController.deleteUser
);

UserRouter.put(
  "/reset-password/:userId",
  AuthenticationMiddleware(),
  SelfAndAdminAuthorizationMiddleware(),
  userController.resetUserPassword
);

UserRouter.get(
  "/verify-user/:userId",
  param("userId").isMongoId().withMessage("user id is not valid"),
  userController.verifyUser
);

UserRouter.get(
  "/verify-user-redirect/:verifyToken",
  param("verifyToken").not().isJWT().withMessage("invalid jwt"),
  userController.verifyUserRedirect
);
