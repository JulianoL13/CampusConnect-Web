import prisma from "../../models/prisma";
import { Post } from "@prisma/client";
import { ItemFetcher, getPaginatedItems } from "../../utils/pagination";

export class PostRepository {
  private itemFetcher: ItemFetcher;

  constructor(itemFetcher: ItemFetcher) {
    this.itemFetcher = itemFetcher;
  }

  getAllPosts = async (): Promise<Post[]> => {
    return await prisma.post.findMany();
  };

  getPaginatedPosts = async (
    lastPostId?: number,
    pageSize: number = 10,
  ): Promise<{ items: Post[]; nextCursor: number | null }> => {
    return await getPaginatedItems(
      this.itemFetcher,
      "post",
      lastPostId,
      pageSize,
    );
  };

  getPostById = async (id: number): Promise<Post | null> => {
    return await prisma.post.findUnique({ where: { id } });
  };

  createPost = async (data: {
    title: string;
    text: string;
    profileId: number;
    communityId: number;
  }): Promise<Post> => {
    return await prisma.post.create({ data });
  };

  updatePost = async (
    id: number,
    data: { title?: string; text?: string },
  ): Promise<Post> => {
    return prisma.post.update({
      where: { id },
      data: {
        ...data,
      },
    });
  };

  deletePost = async (id: number): Promise<Post> => {
    return await prisma.post.delete({ where: { id } });
  };

  getPostsByProfileId = async (profileId: number): Promise<Post[]> => {
    return await prisma.post.findMany({ where: { profileId } });
  };

  getPostsByCommunityId = async (communityId: number): Promise<Post[]> => {
    return await prisma.post.findMany({ where: { communityId } });
  };

  searchPosts = async (query: string): Promise<Post[]> => {
    return await prisma.post.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { text: { contains: query, mode: "insensitive" } },
        ],
      },
    });
  };

  countPostsByProfileId = async (profileId: number): Promise<number> => {
    return await prisma.post.count({ where: { profileId } });
  };

  countPostsByCommunityId = async (communityId: number): Promise<number> => {
    return await prisma.post.count({ where: { communityId } });
  };
}
