import { DatePicker } from "~/components/ui/date-picker";
import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import PilatesList from "~/components/pilates-list/PilatesList";

export default async function Home() {
  const session = await auth();

  if (session?.user) {
    void api.post.getLatest.prefetch();
  }

  return (
    <HydrateClient>
      <main className="flex min-h-screen">
        <DatePicker />
        <PilatesList />
      </main>
    </HydrateClient>
  );
}
