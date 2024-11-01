import { PostRepository } from "../../repositories/postRepository/postRepository";
import { Post } from "@prisma/client";

export class PostService {
  private postRepository: PostRepository;

  constructor(postRepository: PostRepository) {
    this.postRepository = postRepository;
  }

  async fetchPostsWithCursor(
    lastPostId?: number,
    pageSize: number = 10,
  ): Promise<{ posts: Post[]; nextCursor: number | null }> {
    const { items: posts, nextCursor } =
      await this.postRepository.getPaginatedPosts(
        lastPostId,

        pageSize,
      );

    return { posts, nextCursor };
  }

  async getAllPosts(): Promise<Post[]> {
    return this.postRepository.getAllPosts();
  }

  async getPostById(id: number): Promise<Post | null> {
    return this.postRepository.getPostById(id);
  }

  async createPost(data: {
    title: string;

    text: string;

    profileId: number;

    communityId: number;
  }): Promise<Post> {
    return this.postRepository.createPost(data);
  }

  async updatePost(
    id: number,

    data: { title?: string; text?: string },
  ): Promise<Post> {
    return this.postRepository.updatePost(id, data);
  }

  async deletePost(id: number): Promise<Post> {
    return this.postRepository.deletePost(id);
  }

  async getPostsByProfileId(profileId: number): Promise<Post[]> {
    return this.postRepository.getPostsByProfileId(profileId);
  }

  async getPostsByCommunityId(communityId: number): Promise<Post[]> {
    return this.postRepository.getPostsByCommunityId(communityId);
  }

  async searchPosts(query: string): Promise<Post[]> {
    return this.postRepository.searchPosts(query);
  }

  async countPostsByProfileId(profileId: number): Promise<number> {
    return this.postRepository.countPostsByProfileId(profileId);
  }

  async countPostsByCommunityId(communityId: number): Promise<number> {
    return this.postRepository.countPostsByCommunityId(communityId);
  }
}
