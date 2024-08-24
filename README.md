# AI-SaaS Platform

This platform provides advanced AI services, including chat, image, video, voice, and code generation, with integrated subscription management and customer support.

![Ai Saas](./public/readme/mockup.png)

## Key Features

- **Chat**: AI-powered conversational capabilities.
  ![Chat](./public/readme/chat.png)

- **Image & Video Generation**: Create high-quality visual content.
  ![Image](./public/readme/image.png)

- **Voice Synthesis**: Convert text to natural-sounding speech.
  ![Voice](./public/readme/voice.png)

- **Code Generation**: Automatically generate code snippets.
  ![Code](./public/readme/Code.png)
- **Subscription Management**: Seamlessly handle user subscriptions and payments.
  ![Stripe](./public/readme/stripe.png)

- **Customer Support**: Built-in tools for customer assistance."i want to update each
  ![support](./public/readme/customer-support.png)

## Technology Stack

- **Frontend**: [Next.js](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://shadcn.dev/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **AI Services**:
  - Chat: [Gemini API](https://gemini.com/)
  - Image & Video: [Replicate API](https://replicate.com/)
  - Voice: [Eleven Labs](https://elevenlabs.io/)
- **Database**: [Neon](https://neon.tech/) (PostgreSQL) with [Prisma](https://www.prisma.io/) ORM

## Getting Started

### Prerequisites

- Node.js v14+
- API keys for Gemini, Replicate, Eleven Labs, Clerk, and Neon
  to see the result.

### Installation

1. **Clone the repository:**

   ```bash
   git clone git@github.com:yousefwahba/ai-saas.git
   cd ai-saas-platform
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure environment variables in a `.env` file:**

   ```bash
   #Clerk
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
   CLERK_SECRET_KEY=
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=/dashboard
   NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/dashboard

   GOOGLE_GENERATIVE_AI_API_KEY=

   REPLICATE_API_TOKEN=

   STABILITY_API_KEY=

   ELEVEN_LABS_API_KEY=
   ELEVENLABS_VOICE_ID=

   #NeonDB
   DATABASE_URL=
   DATABASE_URL_UNPOOLED=

   #Stripe
   STRIPE_API_KEY=
   STRIPE_WEBHOOK_SECRET=

   NEXT_PUBLIC_APP_URL=

   NEXT_PUBLIC_CRISP_WEBSITE_ID=
   ```

4. **Start the development server:**

   ```bash
   npm run dev
   ```

5. Open http://localhost:3000 (check your open port) with your browser to see the result.

## Resources

This project was developed using resources and tutorials from **Coding with Antonio**, which provided valuable insights into design and implementation. For routing, I used the **Vercel AI SDK** for its efficient text streaming and selected **Neon (Postgres)** as the database instead of PlanetScale.
