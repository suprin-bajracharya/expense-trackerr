import {Router} from "express";
import TransactionRouters from "./transactions.js"
import AuthApi from "./AuthApi.js"
import UserApi from "./UserApi.js"
import CategoryApi from "./CategoryApi.js"
import passport from "passport";

const router = Router();

const auth = passport.authenticate('jwt', {session: false})

router.use("/auth", AuthApi)
router.use("/user", UserApi)
router.use("/transaction", auth, TransactionRouters)
router.use("/category", auth, CategoryApi)

export default router;