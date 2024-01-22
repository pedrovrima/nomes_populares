import { api } from "@/trpc/server";
import Link from "next/link";
import { Box, Center, Text } from "@mantine/core";

export default async function Home() {
  const species = await api.species.getAll.query();
  return (
    <Box mt={"lg"} h={"full"}>
      <Center>
        <ul>
          {species?.map((item) => (
            <li key={item.id}>
              <Link href={`/species/${item.id}`}>
                <Text td="underline">{item.scientificName}</Text>
              </Link>
            </li>
          ))}
        </ul>
      </Center>
    </Box>
  );
}
