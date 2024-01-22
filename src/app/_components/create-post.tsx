"use client";

import { useRouter } from "next/navigation";

import { TextInput, Checkbox, Button, Group, Box } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Popular } from "@/server/db/schema";
import { api } from "@/trpc/react";
import SpeciesCombox from "./species-combobx";

export function CreatePost({ initialValue }: { initialValue?: Popular }) {
  console.log(initialValue);
  const formValues = {
    name: "",
    collector: "",
    region: "",
    sourceName: "",
    speciesId: 0,
    ...initialValue,
  };
  const form = useForm({
    name: "test",
    initialValues: formValues,
  });

  const createPopular = api.popular.create.useMutation({
    onSuccess: () => {
      form.reset();
    },
  });

  return (
    <Box maw={340} mx="auto">
      <form
        onSubmit={form.onSubmit((values) => {
          createPopular.mutate(values);
          console.log(values);
        })}
      >
        <TextInput
          withAsterisk
          label="Nome Popular"
          placeholder=""
          {...form.getInputProps("name")}
        />

        <TextInput
          withAsterisk
          label="Nome da Fonte"
          placeholder=""
          {...form.getInputProps("sourceName")}
        />

        <TextInput
          withAsterisk
          label="Coletor"
          placeholder=""
          {...form.getInputProps("collector")}
        />

        <TextInput
          withAsterisk
          label="Região"
          placeholder=""
          {...form.getInputProps("region")}
        />

        <SpeciesCombox
          initialValue={initialValue}
          setFieldValue={form.setFieldValue}
        />
        <Group justify="flex-end" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
}
