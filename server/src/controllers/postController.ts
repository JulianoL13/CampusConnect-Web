import { PostService } from "../services/postService/postService";
import { Request, Response } from "express";

export class PostController {
  private postService: PostService;

  constructor(postService: PostService) {
    this.postService = postService;
  }
  public async fetchPostsWithCursor(
    req: Request,
    res: Response,
  ): Promise<void> {
    try {
      const lastPostId = req.query.lastPostId
        ? parseInt(req.query.lastPostId as string, 10)
        : undefined;
      const pageSize = req.query.pageSize
        ? parseInt(req.query.pageSize as string, 10)
        : 10;
      const { posts, nextCursor } = await this.postService.fetchPostsWithCursor(
        lastPostId,
        pageSize,
      );
      res.status(200).json({ posts, nextCursor });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: "An unknown error occurred" });
      }
    }
  }

  public async createPost(req: Request, res: Response): Promise<void> {
    try {
      const postData = req.body;
      const newPost = await this.postService.createPost(postData);
      res.status(201).json(newPost);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: "An unknown error occurred" });
      }
    }
  }

  public async updatePost(req: Request, res: Response): Promise<void> {
    try {
      const postId = parseInt(req.params.id, 10);
      const postData = req.body;
      const updatedPost = await this.postService.updatePost(postId, postData);
      if (!updatedPost) {
        res.status(404).json({ message: "Post not found" });
        return;
      }
      res.status(200).json(updatedPost);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "An unknown error occurred" });
      }
    }
  }

  public async deletePost(req: Request, res: Response): Promise<void> {
    try {
      const postId = parseInt(req.params.id, 10);
      const deletedPost = await this.postService.deletePost(postId);
      if (!deletedPost) {
        res.status(404).json({ message: "Post not found" });
        return;
      }
      res.status(204).send();
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "An unknown error occurred" });
      }
    }
  }

  public async getAllPosts(req: Request, res: Response): Promise<void> {
    try {
      const posts = await this.postService.getAllPosts();
      res.status(200).json(posts);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: "An unknown error occurred" });
      }
    }
  }

  public async getPostById(req: Request, res: Response): Promise<void> {
    try {
      const postId = parseInt(req.params.id, 10);
      const post = await this.postService.getPostById(postId);
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "Post not found" });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: "An unknown error occurred" });
      }
    }
  }

  public async getPostsByProfileId(req: Request, res: Response): Promise<void> {
    try {
      const profileId = parseInt(req.params.profileId, 10);
      const posts = await this.postService.getPostsByProfileId(profileId);
      res.status(200).json(posts);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: "An unknown error occurred" });
      }
    }
  }

  public async getPostsByCommunityId(
    req: Request,
    res: Response,
  ): Promise<void> {
    try {
      const communityId = parseInt(req.params.communityId, 10);
      const posts = await this.postService.getPostsByCommunityId(communityId);
      res.status(200).json(posts);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: "An unknown error occurred" });
      }
    }
  }

  public async searchPosts(req: Request, res: Response): Promise<void> {
    try {
      const query = req.query.q as string;
      const posts = await this.postService.searchPosts(query);
      res.status(200).json(posts);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: "An unknown error occurred" });
      }
    }
  }

  public async countPostsByProfileId(
    req: Request,
    res: Response,
  ): Promise<void> {
    try {
      const profileId = parseInt(req.params.profileId, 10);
      const count = await this.postService.countPostsByProfileId(profileId);
      res.status(200).json({ count });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: "An unknown error occurred" });
      }
    }
  }

  public async countPostsByCommunityId(
    req: Request,
    res: Response,
  ): Promise<void> {
    try {
      const communityId = parseInt(req.params.communityId, 10);
      const count = await this.postService.countPostsByCommunityId(communityId);
      res.status(200).json({ count });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: "An unknown error occurred" });
      }
    }
  }
}
