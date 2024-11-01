import { PrismaClient, Post, Comment } from "@prisma/client";

type ModelNames = "post" | "comment";

type ModelReturnType<T extends ModelNames> = T extends "post" ? Post : Comment;

type CommonFindManyArgs = {
  take: number;
  cursor?: { id: number };
  skip?: number;
  orderBy: { createdAt: "asc" | "desc" };
};

export class ItemFetcher {
  private prisma: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prisma = prismaClient;
  }

  async fetchItems<T extends ModelNames>(
    model: T,
    pageSize: number,
    lastId?: number,
  ): Promise<ModelReturnType<T>[]> {
    const commonArgs: CommonFindManyArgs = {
      take: pageSize,
      ...(lastId ? { cursor: { id: lastId }, skip: 1 } : {}),
      orderBy: { createdAt: "desc" },
    };

    if (model === "post") {
      return (await this.prisma.post.findMany(
        commonArgs,
      )) as ModelReturnType<T>[];
    } else if (model === "comment") {
      return (await this.prisma.comment.findMany(
        commonArgs,
      )) as ModelReturnType<T>[];
    } else {
      throw new Error("Modelo não suportado");
    }
  }
}

export async function getPaginatedItems<T extends ModelNames>(
  itemFetcher: ItemFetcher,

  model: T,

  lastId: number | null = null,

  pageSize: number = 10,
): Promise<{ items: ModelReturnType<T>[]; nextCursor: number | null }> {
  try {
    const items = await itemFetcher.fetchItems(
      model,
      pageSize,
      lastId !== null ? lastId : undefined,
    );
    const nextCursor = items.length > 0 ? items[items.length - 1].id : null;

    return { items, nextCursor };
  } catch (error) {
    console.error("Erro ao buscar itens paginados:", error);
    throw new Error("Falha ao buscar itens");
  }
}
