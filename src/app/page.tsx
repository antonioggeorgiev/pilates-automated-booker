import { PilatesHomePage } from "~/components/pilates-home-page/PilatesHomePage";
import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";

export default async function Home() {
  const session = await auth();

  if (session?.user) {
    void api.post.getLatest.prefetch();
  }

  return (
    <HydrateClient>
      <main className="flex min-h-screen">
        <PilatesHomePage />
      </main>
    </HydrateClient>
  );
}
