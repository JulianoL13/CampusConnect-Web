import prisma from "../../models/prisma";
import { Comment } from "@prisma/client";
import { ItemFetcher, getPaginatedItems } from "../../utils/pagination";

export class CommentRepository {
  private itemFetcher: ItemFetcher;

  constructor(itemFetcher: ItemFetcher) {
    this.itemFetcher = itemFetcher;
  }

  getAllComments = async (): Promise<Comment[]> => {
    return await prisma.comment.findMany();
  };

  getPaginatedComment = async (
    lastCommentId?: number,
    pageSize: number = 10,
  ): Promise<{ items: Comment[]; nextCursor: number | null }> => {
    return await getPaginatedItems(
      this.itemFetcher,
      "comment",
      lastCommentId,
      pageSize,
    );
  };

  getCommentsByProfileId = async (profileId: number): Promise<Comment[]> => {
    return await prisma.comment.findMany({ where: { profileId } });
  };

  getCommentsByPostId = async (postId: number): Promise<Comment[]> => {
    return await prisma.comment.findMany({ where: { postId } });
  };

  getChildComments = async (
    parentCommentId: number,
    includeReplies: boolean = false,
  ): Promise<Comment[]> => {
    return await prisma.comment.findMany({
      where: { parentId: parentCommentId },
      include: {
        profile: true,
        commentVotes: true,
        ...(includeReplies && { replies: true }),
      },
    });
  };

  countCommentsByPostId = async (postId: number): Promise<number> => {
    return await prisma.comment.count({ where: { postId } });
  };

  countChildComments = async (parentCommentId: number): Promise<number> => {
    return await prisma.comment.count({ where: { parentId: parentCommentId } });
  };

  createComment = async (data: {
    text: string;
    postId: number;
    profileId: number;
    parentId?: number;
  }): Promise<Comment> => {
    return await prisma.comment.create({ data });
  };

  updateComment = async (
    id: number,
    data: { text?: string },
  ): Promise<Comment> => {
    return prisma.comment.update({
      where: { id },
      data: {
        ...data,
      },
    });
  };

  deleteComment = async (id: number): Promise<Comment> => {
    return await prisma.comment.delete({ where: { id } });
  };

  getCommentsWithReplies = async (postId: number) => {
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
  };
}
