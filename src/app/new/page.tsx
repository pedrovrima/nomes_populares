"use client";

import { CreatePost } from "@/app/_components/create-post";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense>
      <Search />
    </Suspense>
  );
}

function Search() {
  const searchParams = useSearchParams();

  const _speciesId = searchParams.get("speciesId");
  const speciesId = _speciesId ? parseInt(_speciesId) : 0;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="mb-12 text-2xl font-extrabold tracking-tight sm:text-[3rem]">
          Adicionar Nomes Populares
        </h1>

        <CreatePost initialValue={{ speciesId }} />
      </div>
    </main>
  );
}
