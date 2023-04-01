import { useEffect, useState } from "react";
import styled from "styled-components";
import { getData } from "./api";
import { NavBar } from "./components/custom/NavBar";
import { Card } from "./components/ui/Card";

type Country = {
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
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  .countries {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

function App() {
  const [countries, setAllCountries] = useState<Array<Country>>([]);

  useEffect(() => {
    const controller = new AbortController();

    getData(controller.signal).then((response) => setAllCountries(response));

    return () => {
      controller.abort;
    };
  }, []);

  return (
    <div className="App">
      <NavBar />
      <Main>
        <div className="countries">
          {countries.map((country) => (
            <Card
              area={country.population}
              name={country.name.common}
              region={country.region}
              capital={country.capital[0]}
              image={{ alt: country.flags.alt, png: country.flags.png }}
            />
          ))}
        </div>
      </Main>
    </div>
  );
}

export default App;
