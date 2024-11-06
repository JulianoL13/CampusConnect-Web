import { Router } from "express";
import { PostVoteController } from "../controllers/postVoteController";
import { PostVoteService } from "../services/postService/postVoteService";
import { PostVoteRepository } from "../repositories/postRepository/postVoteRepository";

const router = Router();
const postVoteRepository = new PostVoteRepository();
const postVoteService = new PostVoteService(postVoteRepository);
const postVoteController = new PostVoteController(postVoteService);

router.get("/posts/:postId/votes", (req, res) =>
  postVoteController.countVotes(req, res),
);
router.post("/posts/:postId/votes", (req, res) =>
  postVoteController.toggleVote(req, res),
);
router.get("/posts/:postId/votes/users/:userId", (req, res) =>
  postVoteController.hasUserVoted(req, res),
);

export default router;
