import prisma from "../../models/prisma";
import { CommentVote } from "@prisma/client";

export class CommentVoteRepository {
  constructor() {}
  async voteComment(voteData: {
    userId: number;
    commentId: number;
    commentVote: boolean;
  }): Promise<CommentVote> {
    return await prisma.commentVote.create({ data: voteData });
  }

  async updateVote(
    id: number,
    newVoteData: { commentVote: boolean },
  ): Promise<CommentVote> {
    return await prisma.commentVote.update({
      where: { id },
      data: newVoteData,
    });
  }

  async deleteVote(userId: number, commentId: number): Promise<CommentVote> {
    return await prisma.commentVote.delete({
      where: {
        userId_commentId: {
          userId,
          commentId,
        },
      },
    });
  }

  async getVotesByCommentId(commentId: number): Promise<CommentVote[]> {
    return await prisma.commentVote.findMany({ where: { commentId } });
  }

  async getVoteByUserAndCommentId(
    commentId: number,
    userId: number,
  ): Promise<CommentVote | null> {
    return await prisma.commentVote.findUnique({
      where: {
        userId_commentId: {
          userId,
          commentId,
        },
      },
    });
  }

  async countVotesByCommentId(
    commentId: number,
  ): Promise<{ upvotes: number; downvotes: number }> {
    const upvotes = await prisma.commentVote.count({
      where: { commentId, commentVote: true },
    });

    const downvotes = await prisma.commentVote.count({
      where: { commentId, commentVote: false },
    });

    return { upvotes, downvotes };
  }
}
