import { Router } from "express";
import { PostController } from "../controllers/postController";
import { PostService } from "../services/postService/postService";
import { PostRepository } from "../repositories/postRepository/postRepository";
import { ItemFetcher } from "../utils/pagination";
import prisma from "../models/prisma";

const itemFetcher = new ItemFetcher(prisma);
const postRepository = new PostRepository(itemFetcher);
const postService = new PostService(postRepository);
const postController = new PostController(postService);

const router = Router();

router.get("/posts", postController.getAllPosts.bind(postController));
router.get("/posts/:id", postController.getPostById.bind(postController));
router.get(
  "/posts/profile/:profileId",
  postController.getPostsByProfileId.bind(postController),
);
router.get(
  "/posts/community/:communityId",
  postController.getPostsByCommunityId.bind(postController),
);
router.get("/posts/search", postController.searchPosts.bind(postController));
router.get(
  "/posts/count/profile/:profileId",
  postController.countPostsByProfileId.bind(postController),
);
router.get(
  "/posts/count/community/:communityId",
  postController.countPostsByCommunityId.bind(postController),
);
router.post("/posts", postController.createPost.bind(postController));
router.put("/posts/:id", postController.updatePost.bind(postController));
router.delete("/posts/:id", postController.deletePost.bind(postController));
router.get(
  "/posts/cursor",
  postController.fetchPostsWithCursor.bind(postController),
);

export default router;
