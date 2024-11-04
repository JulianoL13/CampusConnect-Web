import prisma from "../../models/prisma";
import { Comment } from "@prisma/client";
import { ItemFetcher, getPaginatedItems } from "../../utils/pagination";

export class CommentRepository {
  private itemFetcher: ItemFetcher;
  constructor(itemFetcher: ItemFetcher) {
    this.itemFetcher = itemFetcher;
  }
  async getAllComments(): Promise<Comment[]> {
    return await prisma.comment.findMany();
  }

  async getPaginatedComment(
    lastCommentId?: number,
    pageSize: number = 10,
  ): Promise<{ items: Comment[]; nextCursor: number | null }> {
    return await getPaginatedItems(
      this.itemFetcher,
      "comment",
      lastCommentId,
      pageSize,
    );
  }

  async getCommentsByProfileId(profileId: number): Promise<Comment[]> {
    return await prisma.comment.findMany({ where: { profileId } });
  }

  async getCommentsByPostId(postId: number): Promise<Comment[]> {
    return await prisma.comment.findMany({ where: { postId } });
  }

  async getChildComments(
    parentCommentId: number,
    includeReplies: boolean = false,
  ): Promise<Comment[]> {
    return await prisma.comment.findMany({
      where: { parentId: parentCommentId },
      include: {
        profile: true,
        commentVotes: true,
        ...(includeReplies && { replies: true }),
      },
    });
  }

  async countCommentsByPostId(postId: number): Promise<number> {
    return await prisma.comment.count({ where: { postId } });
  }

  async countChildComments(parentCommentId: number): Promise<number> {
    return await prisma.comment.count({ where: { parentId: parentCommentId } });
  }

  async createComment(data: {
    text: string;
    postId: number;
    profileId: number;
    parentId?: number;
  }): Promise<Comment> {
    return await prisma.comment.create({ data });
  }

  async updateComment(id: number, data: { text?: string }): Promise<Comment> {
    return prisma.comment.update({
      where: { id },
      data: {
        ...data,
      },
    });
  }

  async deleteComment(id: number): Promise<Comment> {
    return await prisma.comment.delete({ where: { id } });
  }

  async getCommentsWithReplies(postId: number) {
    const comments = await prisma.comment.findMany({
      where: {
        postId: postId,
        parentId: null,
      },
      include: {
        replies: {
          include: {
            profile: true,
          },
        },
        profile: true,
      },
    });
    return comments;
  }
}
const itemFetcher = new ItemFetcher(prisma);
const postRepository = new CommentRepository(itemFetcher);
