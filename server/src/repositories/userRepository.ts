import prisma from "../models/prisma";
import { User, Prisma } from "@prisma/client";

export class UserRepository {
  createUser = async (userData: {
    fullName: string;
    password: string;
    cpf: string;
    registration: string;
    email: string;
    community: {
      connect: {
        userId_communityID: { userId: number; communityID: number };
      }[];
    };
    roles: { connect: { userId_roleId: { userId: number; roleId: number } }[] };
    course: {
      connect: { courseId_userId: { userId: number; courseId: number } }[];
    };
    birthDate?: Date;
    phone?: string;
  }): Promise<User> => {
    try {
      return await prisma.user.create({
        data: this.buildUserData(userData),
      });
    } catch (error) {
      this.handlePrismaError(error, "creating user");
    }
  };

  findUserByEmail = async (email: string): Promise<User | null> => {
    try {
      return await prisma.user.findUnique({ where: { email } });
    } catch (error) {
      this.handlePrismaError(error, "fetching user by email");
    }
  };

  findUserByCPF = async (cpf: string): Promise<User | null> => {
    try {
      return await prisma.user.findUnique({ where: { cpf } });
    } catch (error) {
      this.handlePrismaError(error, "fetching user by CPF");
    }
  };

  findUserByRegistration = async (
    registration: string,
  ): Promise<User | null> => {
    try {
      return await prisma.user.findUnique({ where: { registration } });
    } catch (error) {
      this.handlePrismaError(error, "fetching user by registration");
    }
  };

  findUserByID = async (id: number): Promise<User | null> => {
    try {
      return await prisma.user.findUnique({ where: { id } });
    } catch (error) {
      this.handlePrismaError(error, "fetching user by ID");
    }
  };

  updateUserPassword = async (
    userId: number,
    hashedPassword: string,
  ): Promise<User> => {
    try {
      return await prisma.user.update({
        where: { id: userId },
        data: { password: hashedPassword },
      });
    } catch (error) {
      this.handlePrismaError(error, "updating user password");
    }
  };

  deleteUserAccount = async (userId: number): Promise<User> => {
    try {
      return await prisma.user.delete({ where: { id: userId } });
    } catch (error) {
      this.handlePrismaError(error, "deleting user");
    }
  };

  private buildUserData(userData: {
    fullName: string;
    password: string;
    cpf: string;
    registration: string;
    email: string;
    community: {
      connect: {
        userId_communityID: { userId: number; communityID: number };
      }[];
    };
    roles: { connect: { userId_roleId: { userId: number; roleId: number } }[] };
    course: {
      connect: { courseId_userId: { userId: number; courseId: number } }[];
    };
    birthDate?: Date;
    phone?: string;
  }) {
    const {
      fullName,
      password,
      cpf,
      registration,
      email,
      community,
      roles,
      course,
      birthDate,
      phone,
    } = userData;
    return {
      fullName,
      password,
      email,
      birthDate,
      phone,
      cpf,
      registration,
      community,
      roles,
      course,
    };
  }

  private handlePrismaError(error: unknown, action: string): never {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      switch (error.code) {
        case "P2002":
          throw new Error(
            `One or more unique fields are already in use while ${action}`,
          );
        case "P2003":
          throw new Error(
            `Invalid reference for community, role, or course while ${action}`,
          );
        case "P2025":
          throw new Error(`User not found while ${action}`);
        default:
          throw new Error(`Error ${action}`);
      }
    }
    throw new Error(`Unexpected error ${action}`);
  }
}
