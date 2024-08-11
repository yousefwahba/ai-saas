"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { AudioLines } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Empty } from "@/components/empty";
import { Heading } from "@/components/heading";
import { Loader } from "@/components/loader";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { voiceFormSchema } from "./constants";
import { useProModel } from "@/hooks/use-pro-model";
import toast from "react-hot-toast";

const VoicePage = () => {
  const proModel = useProModel();

  const router = useRouter();
  const [audioUrl, setAudioUrl] = useState("");

  const form = useForm<z.infer<typeof voiceFormSchema>>({
    resolver: zodResolver(voiceFormSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof voiceFormSchema>) => {
    try {
      setAudioUrl("");

      const response = await fetch("/api/voice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: values.prompt }),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudioUrl(audioUrl);
    } catch (error: any) {
      if (error instanceof Error && error.message.includes("status 403")) {
        proModel.onOpen();
      } else {
        toast.error("Something went wrong. Please try again later.");
      }
    } finally {
      form.reset();
      router.refresh();
    }
  };

  return (
    <div>
      <Heading
        title="Text to Speech"
        description="Turn Text into Voice"
        icon={AudioLines}
        iconColor="text-emerald-500"
        bgColor="bg-emerald-500/10"
      />

      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              autoComplete="off"
              autoCapitalize="off"
              className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading}
                        aria-disabled={isLoading}
                        placeholder="Good morning"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button
                className="col-span-12 lg:col-span-2 w-full"
                disabled={isLoading}
                aria-disabled={isLoading}
              >
                Generate
              </Button>
            </form>
          </Form>
        </div>

        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loader />
            </div>
          )}
          {!audioUrl && !isLoading && <Empty label="No voice generated." />}

          {audioUrl && (
            <audio controls>
              <source src={audioUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          )}
        </div>
      </div>
    </div>
  );
};

export default VoicePage;
