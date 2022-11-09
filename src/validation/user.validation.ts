import { body, param } from "express-validator";

const userIdCheck = param("userId").exists({ checkFalsy: true }).isMongoId().withMessage("invalid user ID");

export const userGetByIdVS = [userIdCheck];

export const userUpdateVS = [
    param("userId").isMongoId().withMessage("invalid user ID"),
    body("email").not().exists().withMessage("exclude email "),
    body("password").not().exists().withMessage("exclude password field"),
];
