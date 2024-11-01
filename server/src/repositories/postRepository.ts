import prisma from "../models/prisma";
import { Post } from "@prisma/client";

export class postRepository {
  async getAllPost(): Promise<Post[]> {
    return await prisma.post.findMany();
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
    data: {
      title?: string;
      text?: string;
    },
  ): Promise<Post> {
    return await prisma.post.update({
      where: { id },
      data: {
        ...(data.title && { title: data.title }),
        ...(data.text && { text: data.text }),
      },
    });
  }

  async deletePost(id: number): Promise<Post> {
    return await prisma.post.delete({ where: { id } });
  }
}
