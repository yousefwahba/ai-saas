"use client";
import { BotAvatar } from "@/components/bot-avatar";
import { Empty } from "@/components/empty";
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useChat } from "ai/react";
import { Code } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function CodePage() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "api/code",
  });

  return (
    <div>
      <Heading
        title="Code Generation"
        description="Generate code using descriptive text."
        icon={Code}
        iconColor="text-violet-700"
        bgColor="bg-violet-700/10"
      />
      <div className="px-4 lg:px-8">
        <form
          onSubmit={handleSubmit}
          autoComplete="off"
          autoCapitalize="off"
          className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
        >
          <div className="col-span-12 lg:col-span-10">
            <Input
              className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
              value={input}
              placeholder="Simple toggle button using React hooks."
              onChange={handleInputChange}
            />
          </div>
          <Button type="submit" className="col-span-12 lg:col-span-2 w-full">
            Send
          </Button>
        </form>
        <div className="space-y-4 mt-4">
          {messages.length === 0 && <Empty label="Start a conversation" />}
          <div className="flex flex-col-reverse gap-y-4">
            {messages.map((message, i) => (
              <div
                key={i}
                className={cn(
                  "p-8 w-full flex items-start gap-x-8 rounded-lg",
                  message.role === "user"
                    ? "bg-white border border-black/10"
                    : "bg-muted"
                )}
              >
                {message.role === "user" ? "" : <BotAvatar />}
                <div className="text-sm overflow-auto">
                  <ReactMarkdown
                    components={{
                      pre: ({ node, ...props }) => (
                        <div className="overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg">
                          <pre {...props} />
                        </div>
                      ),
                      code: ({ node, ...props }) => (
                        <code
                          className="bg-black/10 rounded-lg p-1"
                          {...props}
                        />
                      ),
                    }}
                    className="text-sm overflow-hidden leading-7"
                  >
                    {message.content}
                  </ReactMarkdown>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
