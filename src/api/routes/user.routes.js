const express = require("express");

const {registerUser, getUsers, loginUser, deleteUser, updateUserAdm, deleteUserAdmin, getUser, addFavorites} = require("../controllers/user.controller");

const {isAuth } = require("../../middlewares/auth.middleware");

const {upload} = require("../../middlewares/file.middleware")

const userRouter = express.Router();


userRouter.post("/login", loginUser);

userRouter.post("/register",upload.single("profileImgUrl"), registerUser);

userRouter.delete("/delete",isAuth(["user","admin"]), deleteUser);

userRouter.get("/", isAuth(["admin", "user"]), getUser)

userRouter.put("/", isAuth(["user","admin"]), addFavorites)



// Unicamente Con Rol de Admin

userRouter.delete("/deleteAdmin/:id", isAuth(["admin"]), deleteUserAdmin);

userRouter.get("/userAdmin",isAuth(["admin"]), getUsers);

userRouter.put("/:id", isAuth(["admin"]), updateUserAdm);


module.exports = userRouter;