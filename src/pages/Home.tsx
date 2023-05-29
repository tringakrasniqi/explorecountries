import { useState } from "react";
import { Card } from "../components/Card";
import { Filters } from "../components/custom/Filters";
import { ErrorBoundary } from "react-error-boundary";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export type Country = {
  population: number;
  name: { common: string };
  region: string;
  capital: string[];
  flags: {
    alt: string;
    png: string;
    svg: string;
  };
};

const Main = styled.main`
  .countries {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

export const Home = () => {
  const [countries, setAllCountries] = useState<Array<Country>>([]);
  const navigate = useNavigate();

  return (
    <>
      <Filters setCountriesData={setAllCountries} />
      <Main>
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
          <div className="countries">
            {countries.map((country) => (
              <div key={country.name.common}>
                <Card
                  onClick={() => navigate(`/country/${country.name.common}`)}
                  area={country.population}
                  name={country.name.common}
                  region={country.region}
                  capital={
                    country.capital ? country.capital[0] : country.name.common
                  }
                  image={{ alt: country.flags.alt, png: country.flags.png }}
                />
              </div>
            ))}
          </div>
        </ErrorBoundary>
      </Main>
    </>
  );
};
