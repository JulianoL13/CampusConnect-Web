import prisma from "../models/prisma";
import { User } from "@prisma/client";

export class userRepository {
  async createUser(data: {
    fullName: string;
    password: string;
    email: string;
    birthDate?: Date;
    phone?: string;
    cpf: string;
    registration: string;
    community: { connect: { id: number }[] };
    role: { connect: { id: number } };
    course: { connect: { id: number }[] };
  }): Promise<User> {
    return await prisma.user.create({ data });
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { email },
    });
  }

  async findUserByCPF(cpf: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { cpf },
    });
  }

  async findUserByRegistration(registration: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { registration },
    });
  }

  async findUserByID(id: number): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { id },
    });
  }

  async updateUserPassword(
    userId: number,
    hashedPassword: string,
  ): Promise<User> {
    return await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });
  }

  async deleteUserAccount(userId: number): Promise<User> {
    return await prisma.user.delete({
      where: { id: userId },
    });
  }
}
