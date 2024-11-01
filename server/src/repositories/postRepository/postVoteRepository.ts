import prisma from "../../models/prisma";
import { PostVote } from "@prisma/client";

export class PostVoteRepository {
  constructor() {}

  async votePost(voteData: {
    userId: number;
    postId: number;
    postVote: boolean;
  }): Promise<PostVote> {
    return await prisma.postVote.create({ data: voteData });
  }

  async updateVote(
    id: number,
    newVoteData: { postVote: boolean },
  ): Promise<PostVote> {
    return await prisma.postVote.update({
      where: { id },
      data: newVoteData,
    });
  }

  async deleteVote(userId: number, postId: number): Promise<PostVote> {
    return await prisma.postVote.delete({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });
  }

  async getVotesByPostId(postId: number): Promise<PostVote[]> {
    return await prisma.postVote.findMany({ where: { postId } });
  }

  async getVoteByUserAndPostId(
    postId: number,
    userId: number,
  ): Promise<PostVote | null> {
    return await prisma.postVote.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });
  }

  async countVotesByPostId(
    postId: number,
  ): Promise<{ upvotes: number; downvotes: number }> {
    const upvotes = await prisma.postVote.count({
      where: { postId, postVote: true }, // Altere 'vote' para 'postVote'
    });

    const downvotes = await prisma.postVote.count({
      where: { postId, postVote: false }, // Altere 'vote' para 'postVote'
    });

    return { upvotes, downvotes };
  }
}
