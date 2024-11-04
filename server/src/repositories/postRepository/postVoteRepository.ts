import prisma from "../../models/prisma";
import { PostVote } from "@prisma/client";

export class PostVoteRepository {
  constructor() {}

  votePost = async (voteData: {
    userId: number;
    postId: number;
    postVote: boolean;
  }): Promise<PostVote> => {
    return await prisma.postVote.create({ data: voteData });
  };

  updateVote = async (
    id: number,
    newVoteData: { postVote: boolean },
  ): Promise<PostVote> => {
    return await prisma.postVote.update({
      where: { id },
      data: newVoteData,
    });
  };

  deleteVote = async (userId: number, postId: number): Promise<PostVote> => {
    return await prisma.postVote.delete({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });
  };

  getVotesByPostId = async (postId: number): Promise<PostVote[]> => {
    return await prisma.postVote.findMany({ where: { postId } });
  };

  getVoteByUserAndPostId = async (
    postId: number,
    userId: number,
  ): Promise<PostVote | null> => {
    return await prisma.postVote.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });
  };

  countVotesByPostId = async (
    postId: number,
  ): Promise<{ upvotes: number; downvotes: number }> => {
    const upvotes = await prisma.postVote.count({
      where: { postId, postVote: true },
    });

    const downvotes = await prisma.postVote.count({
      where: { postId, postVote: false },
    });

    return { upvotes, downvotes };
  };
}
