import { Request, Response } from "express";
import { CommentVoteService } from "../services/commentService/commentVoteService";
import { VoteData } from "../services/commentService/commentVoteService";

export class CommentVoteController {
  private commentVoteService: CommentVoteService;

  constructor(commentVoteService: CommentVoteService) {
    this.commentVoteService = commentVoteService;
  }

  countVotes = async (req: Request, res: Response): Promise<void> => {
    const commentId = parseInt(req.params.commentId);
    try {
      const result =
        await this.commentVoteService.countVotesByCommentId(commentId);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: "Error counting votes." });
    }
  };

  toggleVote = async (req: Request, res: Response): Promise<void> => {
    const data: VoteData = {
      userId: req.body.userId,
      commentId: parseInt(req.params.commentId),
      commentVote: req.body.commentVote,
    };
    try {
      const result = await this.commentVoteService.toggleVoteOnComment(data);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: "Error toggling vote." });
    }
  };

  hasUserVoted = async (req: Request, res: Response): Promise<void> => {
    const commentId = parseInt(req.params.commentId);
    const userId = parseInt(req.params.userId);
    try {
      const result = await this.commentVoteService.hasUserVoted(
        commentId,
        userId,
      );
      res.status(200).json({ hasVoted: result });
    } catch (error) {
      res.status(500).json({ error: "Error checking vote status." });
    }
  };
}
