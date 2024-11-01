import { CommentRepository } from "../../repositories/commentRepository/commentRepository";
import { Comment } from "@prisma/client";

export class CommentService {
  private commentRepository: CommentRepository;

  constructor(commentRepository: CommentRepository) {
    this.commentRepository = commentRepository;
  }

  async getAllComments(): Promise<Comment[]> {
    return this.commentRepository.getAllComments();
  }

  async getCommentsByProfileId(profileId: number): Promise<Comment[]> {
    return this.commentRepository.getCommentsByProfileId(profileId);
  }

  async getCommentsByPostId(postId: number): Promise<Comment[]> {
    return this.commentRepository.getCommentsByPostId(postId);
  }

  async fetchChildComments(
    parentCommentId: number,
    includeReplies: boolean = false,
  ): Promise<Comment[]> {
    return this.commentRepository.getChildComments(
      parentCommentId,
      includeReplies,
    );
  }

  async createComment(data: {
    text: string;
    postId: number;
    profileId: number;
    parentId?: number;
    communityId: number;
  }): Promise<Comment> {
    return this.commentRepository.createComment(data);
  }

  async countCommentsByPostId(postId: number): Promise<number> {
    return this.commentRepository.countCommentsByPostId(postId);
  }

  async countChildComments(parentCommentId: number): Promise<number> {
    return this.commentRepository.countChildComments(parentCommentId);
  }

  async updateComment(
    id: number,
    data: { title?: string; text?: string },
  ): Promise<Comment> {
    return this.commentRepository.updateComment(id, data);
  }

  async deleteComment(id: number): Promise<Comment> {
    return this.commentRepository.deleteComment(id);
  }

  async getCommentsWithReplies(postId: number): Promise<Comment[]> {
    return this.commentRepository.getCommentsWithReplies(postId);
  }
}
