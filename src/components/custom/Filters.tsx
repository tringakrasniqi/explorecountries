import styled from "styled-components";
import { Dropdown } from "../Dropdown";
import { InputField } from "../InputField";
import { useEffect, useState } from "react";
import { SearchType, getData } from "../../services/CountriesService";
import { Country } from "../../pages/Home";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const Filters = ({
  setCountriesData,
}: {
  setCountriesData: React.Dispatch<React.SetStateAction<Country[]>>;
}) => {
  const regions = ["Africa", "America", "Asia", "Europe", "Oceania"];
  const [dropdownValue, setDropdownValue] = useState("europe");
  const [searchValue, setSearchValue] = useState();

  useEffect(() => {
    const controller = new AbortController();
    let searchType = SearchType.Region;
    let value = dropdownValue;

    if (searchValue) {
      value = searchValue;
      searchType = SearchType.Name;
    }

    getData(controller.signal, searchType, value).then((response) =>
      setCountriesData(response)
    );

    return () => {
      controller.abort;
    };
  }, [dropdownValue, searchValue]);

  const handleDropdownChange = (event: any) => {
    setDropdownValue(event.target.value);
    setSearchValue(undefined);
  };

  const handleSearchCountry = (event: any) => {
    setSearchValue(event.target.value);
  };

  return (
    <Container>
      <InputField
        id="filter"
        label="Search countries"
        onChange={handleSearchCountry}
      />

      <Dropdown
        label="Filter by Region"
        items={regions}
        onChange={handleDropdownChange}
        defaultValue="Europe"
      />
    </Container>
  );
};
