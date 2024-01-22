import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";
import Search from "./_components/search";

export default async function Home() {
  noStore();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="mb-12 text-2xl font-extrabold tracking-tight sm:text-[3rem]">
          Nomes Populares
        </h1>
        <Search />

        <Link href="/species">Espécies</Link>
        <Link href="/new">Adicionar Nome Popular</Link>
      </div>
    </main>
  );
}
