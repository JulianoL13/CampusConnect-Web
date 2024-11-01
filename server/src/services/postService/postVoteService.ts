import { PostVoteRepository } from "../../repositories/postRepository/postVoteRepository";
import { PostVote } from "@prisma/client";

export interface VoteData {
  userId: number;
  postId: number;
  postVote: boolean;
}

export class PostVoteService {
  private postVoteRepository: PostVoteRepository;

  constructor(postVoteRepository: PostVoteRepository) {
    this.postVoteRepository = postVoteRepository;
  }

  async countVotesByPostId(postId: number) {
    const { upvotes, downvotes } =
      await this.postVoteRepository.countVotesByPostId(postId);
    return { upvotes, downvotes };
  }

  private isDuplicateVote(existingVote: boolean, newVote: boolean): boolean {
    return existingVote === newVote;
  }

  private async removeVote(userId: number, postId: number): Promise<null> {
    await this.postVoteRepository.deleteVote(userId, postId);
    return null;
  }

  private async updateExistingVote(
    voteId: number,
    newVote: boolean,
  ): Promise<PostVote> {
    return this.postVoteRepository.updateVote(voteId, {
      postVote: newVote,
    });
  }

  private async createNewVote(data: VoteData): Promise<PostVote> {
    return this.postVoteRepository.votePost(data);
  }

  async toggleVoteOnPost(data: VoteData): Promise<PostVote | null> {
    const { userId, postId, postVote } = data;

    const existingVote = await this.postVoteRepository.getVoteByUserAndPostId(
      postId,
      userId,
    );

    if (existingVote) {
      if (this.isDuplicateVote(existingVote.postVote, postVote)) {
        return await this.removeVote(userId, postId);
      }
      return await this.updateExistingVote(existingVote.id, postVote);
    } else {
      return await this.createNewVote(data);
    }
  }

  async hasUserVoted(postId: number, userId: number): Promise<boolean> {
    const existingVote = await this.postVoteRepository.getVoteByUserAndPostId(
      postId,
      userId,
    );
    return existingVote !== null;
  }
}
