import { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { UsersRepository } from "../users-repository";

export class PrismaUsersRepository implements UsersRepository {
  async findById(
    id: string
  ): Promise<{
    id: string;
    name: string;
    email: string;
    password: string;
    created_at: Date;
  } | null> {
    throw new Error("Method not implemented.");
  }
  async findByEmail(email: string) {
    const emailExist = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return emailExist;
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    });

    return user;
  }
}
