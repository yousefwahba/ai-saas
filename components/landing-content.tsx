"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Avatar, AvatarImage } from "./ui/avatar";

const TESTIMONIALS = [
  {
    name: "Ziad",
    image: "/testimonials/user-4.webp",
    title: "Marketing Specialist",
    description:
      "This tool has revolutionized our marketing strategy and brought outstanding results.",
  },
  {
    name: "Mahmoud",
    image: "/testimonials/user-2.webp",
    title: "Student",
    description:
      "This app is essential for managing my academic workload. It keeps me organized and on track.",
  },
  {
    name: "Mohamad",
    image: "/testimonials/user-3.webp",
    title: "Entrepreneur",
    description:
      "A game-changer for my business! The features are intuitive, and the performance is top-notch.",
  },
  {
    name: "Ahmed",
    image: "/testimonials/user-1.webp",
    title: "Graphic Designer",
    description:
      "The user interface is sleek, and the functionality is impressive. Highly recommended!",
  },
];

export const LandingContent = () => {
  return (
    <div className="px-10 pb-20">
      <div>
        <h2 className="text-center text-4xl text-white font-extrabold mb-10">
          Testimonials
          <span className="text-muted-foreground text-sm text-bold ml-1">
            fake :)
          </span>
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {TESTIMONIALS.map((testimonial) => (
          <Card
            key={testimonial.description}
            className="bg-[#192339] border-none text-white"
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-x-2">
                <Avatar className="w-16 h-16 rounded-full ">
                  <AvatarImage
                    className="w-full h-full rounded-full object-cover "
                    src={testimonial.image}
                  />
                </Avatar>
                <div>
                  <p className="text-lg">{testimonial.name}</p>
                  <p className="text-zinc-400 text-sm">{testimonial.title}</p>
                </div>
              </CardTitle>

              <CardContent className="pt-4 px-0">
                {testimonial.description}
              </CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};
