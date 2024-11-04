import { Router } from "express";
import { CommentController } from "../controllers/commentController";
import { CommentService } from "../services/commentService/commentService";
import { CommentRepository } from "../repositories/commentRepository/commentRepository";
import { ItemFetcher } from "../utils/pagination";
import prisma from "../models/prisma";

const itemFetcher = new ItemFetcher(prisma);
const commentRepository = new CommentRepository(itemFetcher);
const commentService = new CommentService(commentRepository);
const commentController = new CommentController(commentService);

const router = Router();

router.get("/comments/cursor", (req, res) =>
  commentController.fetchCommentsWithCursor(req, res),
);
router.get("/comments", (req, res) =>
  commentController.getAllComments(req, res),
);
router.get("/comments/profile/:profileId", (req, res) =>
  commentController.getCommentsByProfileId(req, res),
);
router.get("/comments/post/:postId", (req, res) =>
  commentController.getCommentsByPostId(req, res),
);
router.get("/comments/child/:parentCommentId", (req, res) =>
  commentController.fetchChildComments(req, res),
);
router.get("/comments/count/post/:postId", (req, res) =>
  commentController.countCommentsByPostId(req, res),
);
router.get("/comments/count/child/:parentCommentId", (req, res) =>
  commentController.countChildComments(req, res),
);
router.post("/comments", (req, res) =>
  commentController.createComment(req, res),
);
router.put("/comments/:id", (req, res) =>
  commentController.updateComment(req, res),
);
router.delete("/comments/:id", (req, res) =>
  commentController.deleteComment(req, res),
);
router.get("/comments/with-replies/:postId", (req, res) =>
  commentController.getCommentsWithReplies(req, res),
);

export default router;
