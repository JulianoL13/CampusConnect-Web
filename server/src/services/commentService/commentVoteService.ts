import { CommentVoteRepository } from "../../repositories/commentRepository/commentVoteRepository";
import { CommentVote } from "@prisma/client";

export interface VoteData {
  userId: number;
  commentId: number;
  commentVote: boolean;
}

export class CommentVoteService {
  private commentVoteRepository: CommentVoteRepository;

  constructor(commentVoteRepository: CommentVoteRepository) {
    this.commentVoteRepository = commentVoteRepository;
  }
  async countVotesByCommentId(commentId: number) {
    const { upvotes, downvotes } =
      await this.commentVoteRepository.countVotesByCommentId(commentId);
    return { upvotes, downvotes };
  }

  private isDuplicateVote(existingVote: boolean, newVote: boolean): boolean {
    return existingVote === newVote;
  }

  private async removeVote(userId: number, commentId: number): Promise<null> {
    await this.commentVoteRepository.deleteVote(userId, commentId);
    return null;
  }

  private async updateExistingVote(
    voteId: number,
    newVote: boolean,
  ): Promise<CommentVote> {
    return this.commentVoteRepository.updateVote(voteId, {
      commentVote: newVote,
    });
  }

  private async createNewVote(data: VoteData): Promise<CommentVote> {
    return this.commentVoteRepository.voteComment(data);
  }

  async toggleVoteOnComment(data: VoteData): Promise<CommentVote | null> {
    const { userId, commentId, commentVote } = data;

    const existingVote =
      await this.commentVoteRepository.getVoteByUserAndCommentId(
        commentId,
        userId,
      );

    if (existingVote) {
      if (this.isDuplicateVote(existingVote.commentVote, commentVote)) {
        return await this.removeVote(userId, commentId);
      }
      return await this.updateExistingVote(existingVote.id, commentVote);
    } else {
      return await this.createNewVote(data);
    }
  }

  async hasUserVoted(commentId: number, userId: number): Promise<boolean> {
    const existingVote =
      await this.commentVoteRepository.getVoteByUserAndCommentId(
        commentId,
        userId,
      );
    return existingVote !== null;
  }
}
