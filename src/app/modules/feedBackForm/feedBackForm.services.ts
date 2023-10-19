import { FeedbackForm } from '@prisma/client';
import { prisma } from '../../../shared/prisma';

const createFeedback = async (data: FeedbackForm): Promise<FeedbackForm> => {
  return await prisma.feedbackForm.create({
    data,
  });
};

const getAllFeedback = async (id: string, role: string) => {
  if (role === 'user') {
    return await prisma.feedbackForm.findMany({
      where: {
        userId: id,
      },
    });
  } else {
    return await prisma.feedbackForm.findMany({});
  }
};

const getSingleFeedback = async (id: string) => {
  return await prisma.feedbackForm.findUnique({
    where: {
      id,
    },
  });
};

const updateFeedback = async (
  id: string,
  userId: string,
  data: Partial<FeedbackForm>
) => {
  return await prisma.feedbackForm.update({
    where: {
      id,
      userId: userId,
    },
    data,
  });
};

const deleteFeedback = async (id: string, userId: string) => {
  return await prisma.feedbackForm.delete({
    where: {
      id,
      userId: userId,
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
