import prisma from "../../models/prisma";
import { Post } from "@prisma/client";
import { ItemFetcher, getPaginatedItems } from "../../utils/pagination";

export class PostRepository {
  private itemFetcher: ItemFetcher;

  constructor(itemFetcher: ItemFetcher) {
    this.itemFetcher = itemFetcher;
  }

  async getAllPosts(): Promise<Post[]> {
    return await prisma.post.findMany();
  }

  async getPaginatedPosts(
    lastPostId?: number,
    pageSize: number = 10,
  ): Promise<{ items: Post[]; nextCursor: number | null }> {
    return await getPaginatedItems(
      this.itemFetcher,
      "post",
      lastPostId,
      pageSize,
    );
  }

  async getPostById(id: number): Promise<Post | null> {
    return await prisma.post.findUnique({ where: { id } });
  }

  async createPost(data: {
    title: string;
    text: string;
    profileId: number;
    communityId: number;
  }): Promise<Post> {
    return await prisma.post.create({ data });
  }

  async updatePost(
    id: number,
    data: { title?: string; text?: string },
  ): Promise<Post> {
    return prisma.post.update({
      where: { id },
      data: {
        ...data,
      },
    });
  }

  async deletePost(id: number): Promise<Post> {
    return await prisma.post.delete({ where: { id } });
  }

  async getPostsByProfileId(profileId: number): Promise<Post[]> {
    return await prisma.post.findMany({ where: { profileId } });
  }

  async getPostsByCommunityId(communityId: number): Promise<Post[]> {
    return await prisma.post.findMany({ where: { communityId } });
  }

  async searchPosts(query: string): Promise<Post[]> {
    return await prisma.post.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { text: { contains: query, mode: "insensitive" } },
        ],
      },
    });
  }

  async countPostsByProfileId(profileId: number): Promise<number> {
    return await prisma.post.count({ where: { profileId } });
  }

  async countPostsByCommunityId(communityId: number): Promise<number> {
    return await prisma.post.count({ where: { communityId } });
  }
}

const itemFetcher = new ItemFetcher(prisma);
const postRepository = new PostRepository(itemFetcher);
