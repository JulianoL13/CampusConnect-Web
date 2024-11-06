import { CommentRepository } from "../../repositories/commentRepository/commentRepository";
import { Comment } from "@prisma/client";

export class CommentService {
  private commentRepository: CommentRepository;

  constructor(commentRepository: CommentRepository) {
    this.commentRepository = commentRepository;
  }

  fetchCommentsWithCursor = async (
    lastCommentId?: number,
    pageSize: number = 10,
  ): Promise<{ comments: Comment[]; nextCursor: number | null }> => {
    const { items: comments, nextCursor } =
      await this.commentRepository.getPaginatedComment(lastCommentId, pageSize);

    return { comments, nextCursor };
  };

  getAllComments = async (): Promise<Comment[]> => {
    return this.commentRepository.getAllComments();
  };

  getCommentsByProfileId = async (profileId: number): Promise<Comment[]> => {
    return this.commentRepository.getCommentsByProfileId(profileId);
  };

  getCommentsByPostId = async (postId: number): Promise<Comment[]> => {
    return this.commentRepository.getCommentsByPostId(postId);
  };

  fetchChildComments = async (
    parentCommentId: number,
    includeReplies: boolean = false,
  ): Promise<Comment[]> => {
    return this.commentRepository.getChildComments(
      parentCommentId,
      includeReplies,
    );
  };

  createComment = async (data: {
    text: string;
    postId: number;
    profileId: number;
    parentId?: number;
  }): Promise<Comment> => {
    return this.commentRepository.createComment(data);
  };

  countCommentsByPostId = async (postId: number): Promise<number> => {
    return this.commentRepository.countCommentsByPostId(postId);
  };

  countChildComments = async (parentCommentId: number): Promise<number> => {
    return this.commentRepository.countChildComments(parentCommentId);
  };

  updateComment = async (
    id: number,
    data: { text?: string },
  ): Promise<Comment> => {
    return this.commentRepository.updateComment(id, data);
  };

  deleteComment = async (id: number): Promise<Comment> => {
    return this.commentRepository.deleteComment(id);
  };

  getCommentsWithReplies = async (postId: number): Promise<Comment[]> => {
    return this.commentRepository.getCommentsWithReplies(postId);
  };
}
