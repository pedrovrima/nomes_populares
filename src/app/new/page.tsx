"use client";

import { CreatePost } from "@/app/_components/create-post";
import { api } from "@/trpc/server";
import { useRouter, useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  console.log(searchParams);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="mb-12 text-2xl font-extrabold tracking-tight sm:text-[3rem]">
          Adicionar Nomes Populares
        </h1>

        <CreatePost initialValue={{ speciesId: 1 }} />
      </div>
    </main>
  );
}

async function CrudShowcase() {
  // const latestPost = await api.post.getLatest.query();

  return (
    <div className="w-full max-w-xs">
      {/* {latestPost ? ( */}
      {/* <p className="truncate">Your most recent post: {latestPost.name}</p> */}
      {/* ) : ( */}
      {/* <p>You have no posts yet.</p> */}
      {/* )} */}
    </div>
  );
}
