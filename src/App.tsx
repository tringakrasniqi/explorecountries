import { useEffect, useState } from "react";
import styled from "styled-components";
import { getData } from "./api";
import { NavBar } from "./components/custom/NavBar";
import { Card } from "./components/ui/Card";
import { ThemeProvider } from "styled-components";

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

const BodyContainer = styled.div`
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.text};
  transition: all 0.25s ease;
`;

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

const light = {
  background: "#fafafa",
  elements: "#ffffff",
  text: "#111517",
  shadow: "hsl(0, 0%, 52%)",
};

const dark = {
  background: "#202c37",
  elements: "#2b3945",
  text: "#ffffff",
  shadow: "#202c37",
};

function App() {
  const [countries, setAllCountries] = useState<Array<Country>>([]);
  const [theme, setTheme] = useState("dark");
  const isDarkTheme = theme === "dark";

  useEffect(() => {
    const controller = new AbortController();

    getData(controller.signal).then((response) => setAllCountries(response));

    return () => {
      controller.abort;
    };
  }, []);

  const toggleTheme = () => {
    setTheme(isDarkTheme ? "light" : "dark");
  };

  return (
    <ThemeProvider theme={isDarkTheme ? dark : light}>
      <BodyContainer>
        <NavBar toggleTheme={toggleTheme} isDarkMode={isDarkTheme} />
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
      </BodyContainer>
    </ThemeProvider>
  );
}

export default App;
