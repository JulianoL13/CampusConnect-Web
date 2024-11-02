import bcrypt from "bcrypt";
import { userRepository } from "../../repositories/userRepository";
import { User } from "@prisma/client";

const userRepo = new userRepository();

export type RegisterUserData = Omit<User, "id" | "createdAt" | "updatedAt"> & {
  birthDate?: Date;
  phone?: string;
};

export async function register(userData: RegisterUserData) {
  if (await userRepo.findUserByEmail(userData.email))
    throw new Error("Este email já está em uso");
  if (await userRepo.findUserByCPF(userData.cpf))
    throw new Error("Este CPF já está em uso");
  if (await userRepo.findUserByRegistration(userData.registration))
    throw new Error("Esta matrícula já está em uso");

  const hashedPassword = await bcrypt.hash(userData.password, 10);
  userData.password = hashedPassword;

  return await userRepo.createUser(userData);
}

export async function login(email: string, password: string): Promise<User> {
  const user = await userRepo.findUserByEmail(email);
  if (!user) throw new Error("Usuário não encontrado");

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new Error("Senha inválida");

  return user;
}
