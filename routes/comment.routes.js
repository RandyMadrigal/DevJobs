import { Router } from "express";
import * as commentController from "../controllers/comments.controller.js";
import { createCommentValidation } from "../middleware/routesValidation.middleware.js";

const router = Router();

router.post(
  "/createComment",
  createCommentValidation,
  commentController.createComment
);

router.put("/editComment", commentController.editComment);

router.delete("/deleteComment", commentController.deleteComment);

export default router;
