const express = require("express");
const jwt = require("jsonwebtoken");
const {
    getUser,
    getAllUsers,
    getUserByEmail,
    getUserById,
    createUser,
    // deleteUser,
} = require("../db/index");

const usersRouter = express.Router();

usersRouter.get("/all", async (req, res, next) => {
    try {
        const users = await getAllUsers();
        res.send({ users });
    } catch (error) {
        next(error);
    }
});

usersRouter.get("/:id", async (req, res, next) => {
    try {
        const userId = req.params.id;
        const user = await getUserById(userId);
        res.send({ user });
    } catch (error) {
        next(error);
    }
});

usersRouter.post("/register", async (req, res, next) => {
    const { email, password, first_name, last_name } = req.body;

    try {
        const user = await getUserByEmail(email);

        if (user) {
            next({
                name: "user exists",
                error: "user exists",
            });
            return;
        }

        if (password.length < 6) {
            next({
                name: "passwordLengthError",
                error: "Password must be at least 6 characters long.",
            });
            return;
        }

        const newUser = await createUser({
            email,
            password,
            first_name,
            last_name,
        });

        res.send({ user: newUser });
    } catch (error) {
        next(error);
    }
});

usersRouter.post("/login", async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await getUser({ email, password });

        if (!user) {
            res.send({
                name: "invalidCredentials",
                error: "Invalid email or password.",
            });
            return;
        }

        const token = jwt.sign(
            {
                email: user.email,
                id: user.id,
            },
            process.env.JWT_SECRET
        );
        res.send({ user, token });
    } catch (error) {
        next(error);
    }
});

// usersRouter.delete("/delete/:id", async (req, res, next) => {
//     const { token } = req.body;
//     console.log(token);
//     try {
//         const userId = req.params.id;
//         const user = await getUserById(userId);
//         console.log(user);

//         if (!user) {
//             res.send({ name: "userNotFound", message: "No user found." });
//             return;
//         }

//         const { id, email } = user;
//         deleteUser({ id, email });
//         res.send({
//             name: "accountDeleted",
//             message: `Account deleted for ${email}.`,
//         });
//     } catch (error) {
//         next(error);
//     }
// });

module.exports = usersRouter;
