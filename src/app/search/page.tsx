"use client";

import { api } from "@/trpc/react";
import { Box, Loader, NavLink, Text, TextInput } from "@mantine/core";
import Link from "next/link";
import { useState } from "react";

export default () => {
  const [searchTerm, setSearchTerm] = useState("");
  const data = api.species.searchString.useQuery(
    { searchString: searchTerm },
    {
      enabled: searchTerm.length > 2,
    },
  );

  return (
    <Box maw={340} mx="auto">
      <TextInput
        label="Pesquisar"
        placeholder="Pesquisar"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.currentTarget.value)}
      />

      {data.isFetching && <Loader />}
      {data?.data?.map((item) => (
        <Link href={`/species/${item.id}`} key={item.id}>
          <Text td="underline">{item.scientificName}</Text>
        </Link>
      ))}
    </Box>
  );
};
