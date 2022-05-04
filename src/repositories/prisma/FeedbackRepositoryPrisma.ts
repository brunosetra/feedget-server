import { prisma } from "../../prisma";
import { FeedbackCreateData, FeedbackRepository } from "../FeedbackRepository";

export class FeedbackRepositoryPrisma implements FeedbackRepository {
  async create({
    type,
    comment,
    screenshot,
  }: FeedbackCreateData): Promise<void> {
    await prisma.feedback.create({
      data: {
        type,
        comment,
        screenshot,
      },
    });
  }
}
