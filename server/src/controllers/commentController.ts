import { CommentService } from "../services/commentService/commentService";
import { Request, Response } from "express";

export class CommentController {
  private commentService: CommentService;

  constructor(commentService: CommentService) {
    this.commentService = commentService;
  }

  fetchCommentsWithCursor = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const lastCommentId = req.query.lastCommentId
        ? parseInt(req.query.lastCommentId as string, 10)
        : undefined;
      const pageSize = req.query.pageSize
        ? parseInt(req.query.pageSize as string, 10)
        : 10;
      const { comments, nextCursor } =
        await this.commentService.fetchCommentsWithCursor(
          lastCommentId,
          pageSize,
        );
      res.status(200).json({ comments, nextCursor });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: "An unknown error occurred" });
      }
    }
  };

  getAllComments = async (req: Request, res: Response): Promise<void> => {
    try {
      const comments = await this.commentService.getAllComments();
      res.status(200).json(comments);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: "An unknown error occurred" });
      }
    }
  };

  getCommentsByProfileId = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const profileId = parseInt(req.params.profileId, 10);
      const comments =
        await this.commentService.getCommentsByProfileId(profileId);
      res.status(200).json(comments);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: "An unknown error occurred" });
      }
    }
  };

  getCommentsByPostId = async (req: Request, res: Response): Promise<void> => {
    try {
      const postId = parseInt(req.params.postId, 10);
      const comments = await this.commentService.getCommentsByPostId(postId);
      res.status(200).json(comments);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: "An unknown error occurred" });
      }
    }
  };

  fetchChildComments = async (req: Request, res: Response): Promise<void> => {
    try {
      const parentCommentId = parseInt(req.params.parentCommentId, 10);
      const includeReplies = req.query.includeReplies === "true";
      const comments = await this.commentService.fetchChildComments(
        parentCommentId,
        includeReplies,
      );
      res.status(200).json(comments);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: "An unknown error occurred" });
      }
    }
  };

  countCommentsByPostId = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const postId = parseInt(req.params.postId, 10);
      const count = await this.commentService.countCommentsByPostId(postId);
      res.status(200).json({ count });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: "An unknown error occurred" });
      }
    }
  };

  countChildComments = async (req: Request, res: Response): Promise<void> => {
    try {
      const parentCommentId = parseInt(req.params.parentCommentId, 10);
      const count =
        await this.commentService.countChildComments(parentCommentId);
      res.status(200).json({ count });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: "An unknown error occurred" });
      }
    }
  };

  createComment = async (req: Request, res: Response): Promise<void> => {
    try {
      const commentData = req.body;
      const comment = await this.commentService.createComment(commentData);
      res.status(201).json(comment);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "An unknown error occurred" });
      }
    }
  };

  updateComment = async (req: Request, res: Response): Promise<void> => {
    try {
      const commentId = parseInt(req.params.id, 10);
      const commentData = req.body;
      const updatedComment = await this.commentService.updateComment(
        commentId,
        commentData,
      );
      if (!updatedComment) {
        res.status(404).json({ message: "Comment not found" });
        return;
      }
      res.status(200).json(updatedComment);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "An unknown error occurred" });
      }
    }
  };

  deleteComment = async (req: Request, res: Response): Promise<void> => {
    try {
      const commentId = parseInt(req.params.id, 10);
      const deletedComment = await this.commentService.deleteComment(commentId);
      if (!deletedComment) {
        res.status(404).json({ message: "Comment not found" });
        return;
      }
      res.status(204).send();
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "An unknown error occurred" });
      }
    }
  };

  getCommentsWithReplies = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const postId = parseInt(req.params.postId, 10);
      const comments = await this.commentService.getCommentsWithReplies(postId);
      res.status(200).json(comments);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: "An unknown error occurred" });
      }
    }
  };
}
