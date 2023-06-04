import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import {
  ThemeProvider,
  createGlobalStyle,
  DefaultTheme,
} from "styled-components";
import { Home } from "./pages/Home";
import { NavBar } from "./components/custom/NavBar";
import { CountryDetails } from "./pages/CountryDetails";
import { ErrorPage } from "./pages/ErrorPage";

const light: DefaultTheme = {
  background: "#fafafa",
  elements: "#ffffff",
  text: "#111517",
  shadow: "hsl(0, 0%, 74%)",
  textHover: "#2b3945",
};

const dark: DefaultTheme = {
  background: "#202c37",
  elements: "#2b3945",
  text: "#ffffff",
  shadow: "rgba(0, 0, 0, 0.51)",
  textHover: "hsl(0, 0%, 52%)",
};

const GlobalCSS = createGlobalStyle`
:root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.text};
  transition: all 0.25s ease;
}

body {
  margin: 0;
  max-width: 1200px;
  margin: auto;
}
`;

function App() {
  const [theme, setTheme] = useState("dark");
  const isDarkTheme = theme === "dark";

  const toggleTheme = () => {
    setTheme(isDarkTheme ? "light" : "dark");
  };

  return (
    <ThemeProvider theme={isDarkTheme ? dark : light}>
      <Router>
        <NavBar toggleTheme={toggleTheme} isDarkMode={isDarkTheme} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/country/:countryId" element={<CountryDetails />} />
          <Route path="/404" element={<ErrorPage />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </Router>
      <GlobalCSS />
    </ThemeProvider>
  );
}

export default App;
