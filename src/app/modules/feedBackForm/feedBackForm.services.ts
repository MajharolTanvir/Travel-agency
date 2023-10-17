import { FeedbackForm } from '@prisma/client';
import { prisma } from '../../../shared/prisma';

const createFeedback = async (data: FeedbackForm): Promise<FeedbackForm> => {
  return await prisma.feedbackForm.create({
    data,
  });
};

const getAllFeedback = async () => {
  return await prisma.feedbackForm.findMany({});
};

const getSingleFeedback = async (id: string) => {
  return await prisma.feedbackForm.findUnique({
    where: {
      id,
    },
  });
};

const updateFeedback = async (id: string, data: Partial<FeedbackForm>) => {
  return await prisma.feedbackForm.update({
    where: {
      id,
    },
    data,
  });
};

const deleteFeedback = async (id: string) => {
  return await prisma.feedbackForm.delete({
    where: {
      id,
    },
  });
};

export const FeedbackFormService = {
  createFeedback,
  getAllFeedback,
  getSingleFeedback,
  updateFeedback,
  deleteFeedback,
};
