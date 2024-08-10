import { auth } from "@clerk/nextjs/server";
import prismadb from "./prismadb";

const DAY_IN_MS = 24 * 60 * 60 * 1000;

export const checkSubscription = async () => {
  const { userId } = auth();

  if (!userId) return false;

  const userSubscription = await prismadb.userSubscription.findUnique({
    where: {
      userId,
    },
    select: {
      stripeSubscriptionId: true,
      stripeCurrentPeriodEnd: true,
      stripeCustomerId: true,
      stripePriceId: true,
    },
  });

  if (!userSubscription) return false;

  const isValid =
    userSubscription.stripeSubscriptionId &&
    userSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS >
      Date.now();

  return !!isValid;
};
