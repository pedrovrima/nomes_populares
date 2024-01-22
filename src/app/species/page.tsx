"use client";

import { api } from "@/trpc/react";
import Link from "next/link";
import { Box, Center, Text } from "@mantine/core";

export default async function Home() {
  const species = api.species.getAll.useQuery();
  return (
    <Box mt={"lg"} h={"full"}>
      <Center>
        <ul>
          {species?.data?.map((item) => (
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
