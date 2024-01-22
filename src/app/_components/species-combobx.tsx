"use client";

import { createFormActions } from "@mantine/form";
import { useState } from "react";
import {
  InputBase,
  Combobox,
  useCombobox,
  TextInputProps,
} from "@mantine/core";
import { api } from "@/trpc/react";

function SpeciesCombox(props: any) {
  const { initialValue } = props;
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const speciesQuery = api.species.getAll.useQuery();
  const formActions = createFormActions("test");
  const [search, setSearch] = useState(
    () =>
      speciesQuery.data?.find((item) => item.id === initialValue.speciesId)
        ?.scientificName || "",
  );
  console.log(search, initialValue);
  const groceries = speciesQuery.data?.map((item) => item.scientificName) || [];

  const shouldFilterOptions = groceries.every((item) => item !== search);
  const filteredOptions = shouldFilterOptions
    ? groceries.filter((item) =>
        item?.toLowerCase().includes(search.toLowerCase().trim()),
      )
    : groceries;

  const options = filteredOptions.map((item) => (
    <Combobox.Option value={item || ""} key={item}>
      {item}
    </Combobox.Option>
  ));

  return (
    <Combobox
      store={combobox}
      onOptionSubmit={(val) => {
        setSearch(val);

        const speciesId = speciesQuery.data?.find(
          (item) => item.scientificName === val,
        )?.id;
        formActions.setFieldValue("speciesId", speciesId);
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <InputBase
          label="Espécie"
          withAsterisk
          rightSection={<Combobox.Chevron />}
          rightSectionPointerEvents="none"
          onClick={() => combobox.openDropdown()}
          onFocus={() => combobox.openDropdown()}
          onBlur={(event) => {
            combobox.closeDropdown();
          }}
          placeholder="Search value"
          value={search}
          onChange={(event) => {
            combobox.updateSelectedOptionIndex();
            setSearch(event.currentTarget.value);
          }}
        />
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>
          {options.length > 0 ? (
            options
          ) : (
            <Combobox.Empty>Nothing found</Combobox.Empty>
          )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}

export default SpeciesCombox;
