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

router.get("/posts", (req, res) => postController.getAllPosts(req, res));
router.get("/posts/:id", (req, res) => postController.getPostById(req, res));
router.get("/posts/profile/:profileId", (req, res) =>
  postController.getPostsByProfileId(req, res),
);
router.get("/posts/community/:communityId", (req, res) =>
  postController.getPostsByCommunityId(req, res),
);
router.get("/posts/search", (req, res) => postController.searchPosts(req, res));
router.get("/posts/count/profile/:profileId", (req, res) =>
  postController.countPostsByProfileId(req, res),
);
router.get("/posts/count/community/:communityId", (req, res) =>
  postController.countPostsByCommunityId(req, res),
);
router.post("/posts", (req, res) => postController.createPost(req, res));
router.put("/posts/:id", (req, res) => postController.updatePost(req, res));
router.delete("/posts/:id", (req, res) => postController.deletePost(req, res));
router.get("/posts/cursor", (req, res) =>
  postController.fetchPostsWithCursor(req, res),
);

export default router;
