"use client";

import { useRouter } from "next/navigation";

import { TextInput, Checkbox, Button, Group, Box } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Popular } from "@/server/db/schema";
import { api } from "@/trpc/react";
import SpeciesCombox from "./species-combobx";

interface FormValues {
  name: string;
  collector: string;
  region: string;
  sourceName: string;
  speciesId: number;
}

export function CreatePost({ initialValue }: { initialValue?: Popular }) {
  const formValues = {
    name: "",
    collector: "",
    region: "",
    sourceName: "",
    speciesId: initialValue?.speciesId || 0,
  };
  const form = useForm<FormValues>({
    name: "test",
    initialValues: formValues,
    validate: (values) => {
      const errors: Record<string, string> = {};

      if (!values.name) {
        errors.name = "Nome Popular é obrigatório";
      }

      if (!values.collector) {
        errors.collector = "Coletor é obrigatório";
      }

      if (!values.region) {
        errors.region = "Região é obrigatório";
      }

      if (!values.sourceName) {
        errors.sourceName = "Nome da Fonte é obrigatório";
      }

      if (!values.speciesId) {
        errors.speciesId = "Espécie é obrigatório";
      }

      return errors;
    },
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
          form.setValues({ speciesId: 0 });
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
