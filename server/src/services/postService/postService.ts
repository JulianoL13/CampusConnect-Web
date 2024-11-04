import { PostRepository } from "../../repositories/postRepository/postRepository";
import { Post } from "@prisma/client";

export class PostService {
  private postRepository: PostRepository;

  constructor(postRepository: PostRepository) {
    this.postRepository = postRepository;
  }

  fetchPostsWithCursor = async (
    lastPostId?: number,
    pageSize: number = 10,
  ): Promise<{ posts: Post[]; nextCursor: number | null }> => {
    const { items: posts, nextCursor } =
      await this.postRepository.getPaginatedPosts(lastPostId, pageSize);

    return { posts, nextCursor };
  };

  getAllPosts = async (): Promise<Post[]> => {
    return this.postRepository.getAllPosts();
  };

  getPostById = async (id: number): Promise<Post | null> => {
    return this.postRepository.getPostById(id);
  };

  createPost = async (data: {
    title: string;
    text: string;
    profileId: number;
    communityId: number;
  }): Promise<Post> => {
    return this.postRepository.createPost(data);
  };

  updatePost = async (
    id: number,
    data: { title?: string; text?: string },
  ): Promise<Post> => {
    return this.postRepository.updatePost(id, data);
  };

  deletePost = async (id: number): Promise<Post> => {
    return this.postRepository.deletePost(id);
  };

  getPostsByProfileId = async (profileId: number): Promise<Post[]> => {
    return this.postRepository.getPostsByProfileId(profileId);
  };

  getPostsByCommunityId = async (communityId: number): Promise<Post[]> => {
    return this.postRepository.getPostsByCommunityId(communityId);
  };

  searchPosts = async (query: string): Promise<Post[]> => {
    return this.postRepository.searchPosts(query);
  };

  countPostsByProfileId = async (profileId: number): Promise<number> => {
    return this.postRepository.countPostsByProfileId(profileId);
  };

  countPostsByCommunityId = async (communityId: number): Promise<number> => {
    return this.postRepository.countPostsByCommunityId(communityId);
  };
}
