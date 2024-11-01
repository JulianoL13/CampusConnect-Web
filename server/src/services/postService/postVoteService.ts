import { PostVoteRepository } from "../../repositories/postRepository/postVoteRepository";
import { PostVote } from "@prisma/client";
import { VoteData, toggleVote } from "../../utils/toggleVote";

export class PostVoteService {
  private postVoteRepository: PostVoteRepository;

  constructor(postVoteRepository: PostVoteRepository) {
    this.postVoteRepository = postVoteRepository;
  }

  async toggleVoteOnPost(data: VoteData): Promise<PostVote | null> {
    const voteData: VoteData = {
      userId: data.userId,
      targetId: data.postId,
      vote: data.postVote,
    };

    // Utilize a função toggleVote
    return await toggleVote(voteData, this.postVoteRepository);
  }

  async hasUserVoted(postId: number, userId: number): Promise<boolean> {
    const existingVote = await this.postVoteRepository.getVoteByUserAndPostId(
      postId,
      userId,
    );
    return existingVote !== null;
  }

  async countVotesByPostId(postId: number) {
    const { upvotes, downvotes } =
      await this.postVoteRepository.countVotesByPostId(postId);
    return { upvotes, downvotes };
  }
}
