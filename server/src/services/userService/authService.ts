import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserRepository } from "../../repositories/userRepository";
import { User } from "@prisma/client";

export type RegisterUserData = Omit<User, "id" | "createdAt" | "updatedAt"> & {
  birthDate?: Date;
  phone?: string;
  community: { connect: { id: number }[] };
  roles: { connect: { id: number } };
  course: { connect: { id: number }[] };
};

export class AuthService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async register(userData: RegisterUserData): Promise<User> {
    await this.validateNewUser(userData);

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;

    const adaptedUserData = {
      ...userData,
      community: {
        connect: userData.community.connect.map((item) => ({
          userId_communityID: { userId: 0, communityID: item.id },
        })),
      },
      roles: {
        connect: [
          { userId_roleId: { userId: 0, roleId: userData.roles.connect.id } },
        ],
      },
      course: {
        connect: userData.course.connect.map((item) => ({
          courseId_userId: { userId: 0, courseId: item.id },
        })),
      },
    };

    return await this.userRepository.createUser(adaptedUserData);
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ user: User; token: string }> {
    const user = await this.userRepository.findUserByEmail(email);
    if (!user) throw new Error("Usuário não encontrado");

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error("Senha inválida");

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: process.env.JWT_EXPIRES_IN },
    );

    return { user, token };
  }

  private async validateNewUser(userData: RegisterUserData): Promise<void> {
    const [existingEmail, existingCPF, existingRegistration] =
      await Promise.all([
        this.userRepository.findUserByEmail(userData.email),
        this.userRepository.findUserByCPF(userData.cpf),
        this.userRepository.findUserByRegistration(userData.registration),
      ]);

    if (existingEmail) throw new Error("Este email já está em uso");
    if (existingCPF) throw new Error("Este CPF já está em uso");
    if (existingRegistration) throw new Error("Esta matrícula já está em uso");
  }
}
