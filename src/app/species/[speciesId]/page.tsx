import { api } from "@/trpc/server";
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  List,
  ListItem,
  Text,
  Title,
} from "@mantine/core";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: { speciesId: string };
}) {
  const speciesData = await api.species.getOne.query({
    speciesId: +params.speciesId,
  });

  return (
    <>
      {speciesData && (
        <Container>
          <Flex align={"center"} direction={"column"} mb={30}>
            <h1 className="font-serif text-4xl font-bold italic">
              {speciesData.scientificName}
            </h1>
            <h2 className="font-serif text-lg font-bold italic">
              Português: {speciesData.brName}
            </h2>
            <h2 className="font-serif text-lg font-bold italic">
              Inglês: {speciesData.enName}
            </h2>
          </Flex>
          <Center mb={10}>
            <Title order={3}>Nome Populares</Title>
          </Center>
          <Flex align={"center"} direction={"column"} mb={10}>
            <List listStyleType="disc">
              {speciesData?.popular?.map((popular) => (
                <ListItem mb={"md"} key={popular.id}>
                  <Text fw={700} size={"lg"}>
                    {popular.name}
                  </Text>
                  <Text>
                    Relatado por: {popular.sourceName} / {popular.region}
                  </Text>

                  <Text>Registrado por: {popular.collector}</Text>
                  <Text></Text>
                </ListItem>
              ))}
            </List>
            <Link
              href={{
                pathname: `/new`,
                query: { speciesId: speciesData.id },
              }}
            >
              Adicionar Nome Popular
            </Link>
          </Flex>
        </Container>
      )}
    </>
  );
}
