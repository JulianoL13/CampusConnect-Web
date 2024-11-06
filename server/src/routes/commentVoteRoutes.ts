import { Router } from "express";
import { CommentVoteController } from "../controllers/commentVoteController";
import { CommentVoteService } from "../services/commentService/commentVoteService";
import { CommentVoteRepository } from "../repositories/commentRepository/commentVoteRepository";

const commentVoteRepository = new CommentVoteRepository();
const commentVoteService = new CommentVoteService(commentVoteRepository);
const commentVoteController = new CommentVoteController(commentVoteService);

const router = Router();

router.get("/comments/:commentId/votes", (req, res) =>
  commentVoteController.countVotes(req, res),
);
router.post("/comments/:commentId/vote", (req, res) =>
  commentVoteController.toggleVote(req, res),
);
router.get("/comments/:commentId/votes/user/:userId", (req, res) =>
  commentVoteController.hasUserVoted(req, res),
);

export default router;
