import { Request, Response } from "express";
import { PostVoteService } from "../services/postService/postVoteService";

export class PostVoteController {
  private postVoteService: PostVoteService;

  constructor(postVoteService: PostVoteService) {
    this.postVoteService = postVoteService;
  }

  countVotes = async (req: Request, res: Response): Promise<void> => {
    const postId = parseInt(req.params.postId);
    try {
      const result = await this.postVoteService.countVotesByPostId(postId);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: "Error counting votes." });
    }
  };

  toggleVote = async (req: Request, res: Response): Promise<void> => {
    const { userId, postId, postVote } = req.body;
    try {
      const vote = await this.postVoteService.toggleVoteOnPost({
        userId,
        postId,
        postVote,
      });
      res.status(200).json(vote);
    } catch (error) {
      res.status(500).json({ error: "Error toggling vote." });
    }
  };

  hasUserVoted = async (req: Request, res: Response): Promise<void> => {
    const postId = parseInt(req.params.postId);
    const userId = parseInt(req.params.userId);
    try {
      const hasVoted = await this.postVoteService.hasUserVoted(postId, userId);
      res.status(200).json({ hasVoted });
    } catch (error) {
      res.status(500).json({ error: "Error checking vote status." });
    }
  };
}
