"use client";

import { Zap } from "lucide-react";
import { Button } from "./ui/button";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

interface SubscriptionButtonProps {
  isPro: boolean;
}
export const SubscriptionButton = ({ isPro }: SubscriptionButtonProps) => {
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    try {
      setLoading(true);
      const responce = await axios.get("/api/stripe");
      window.location.href = responce.data.url;
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button
      disabled={loading}
      variant={isPro ? "default" : "premium"}
      onClick={onClick}
    >
      {isPro ? "Manage Subscription" : "Upgrade to Pro"}
      {!isPro && <Zap className="ml-2 h-4 w-4 fill-white" />}
    </Button>
  );
};
