import {Router} from "express";
import * as TransactionController from "../controller/TransactionController.js"


const router = Router()

// Show ALl
router.get(
    '/', TransactionController.index
)

// Create reoute
router.post('/',TransactionController.create)

// Update/Edit Route
router.patch('/:id', TransactionController.update)

// Delete Route
router.delete('/:id', TransactionController.remove)

export default router;