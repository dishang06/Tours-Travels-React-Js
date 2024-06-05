import express from "express";
const router = express.Router();
import contactFrom from "../controllers/contactController.js";

router.route("/query").post(contactFrom);

export default router;
