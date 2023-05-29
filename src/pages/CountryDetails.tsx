import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { SearchType, getData } from "../services/CountriesService";
import { Button } from "../components/Button";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { ErrorBoundary } from "react-error-boundary";

interface Currencies {
  [key: string]: Currency;
}
type Currency = {
  name: string;
  symbol: string;
};

type CountryDetails = {
  altSpellings: string[];
  borders: string[];
  capital: string[];
  currencies: Currencies;
  flags: { png: string; alt: string };
  languages: {};
  population: number;
  region: string;
  subregion: string;
  tld: string;
  name: {
    common: string;
  };
};

const StyledCountryDetails = styled.div`
  padding: 2rem;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const InnerContainer = styled.div`
  padding: 2rem;
`;

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  flex-wrap: wrap;
  gap: 1rem;
`;

const DetailsList = styled.ul`
  list-style-type: none;
  padding: 0;

  li {
    line-height: 2rem;
  }
`;

const BorderCountries = styled.span`
  display: flex;
  flex-direction: row;
  max-width: 500px;
  flex-wrap: wrap;
`;

const StyledImg = styled.img`
  object-fit: contain;
  display: inline-block;
  width: 500px;
  height: 300px;
  padding: 2rem;
`;

export const CountryDetails = () => {
  const { countryId } = useParams();
  const navigate = useNavigate();
  const [details, setDetails] = useState<CountryDetails>();
  const [borderCountriesDetails, setBorderCountriesDetails] =
    useState<CountryDetails[]>();
  const [borderCountries, setBorderCountries] = useState<string[] | undefined>(
    undefined
  );

  useEffect(() => {
    const controller = new AbortController();

    if (!countryId) {
      return;
    }

    getData(controller.signal, SearchType.Name, countryId).then((response) => {
      setDetails(response[0]);
      if (response[0].borders?.length) {
        setBorderCountries(response[0].borders);
      }
    });
    return () => {
      controller.abort;
    };
  }, [countryId]);

  useEffect(() => {
    const controller = new AbortController();
    if (!borderCountries) {
      return;
    }

    if (borderCountries)
      getData(
        controller.signal,
        SearchType.Code,
        `?codes=${borderCountries?.toString()}`
      ).then((response) => {
        setBorderCountriesDetails(response);
      });

    return () => {
      controller.abort;
    };
  }, [borderCountries]);

  return (
    <StyledCountryDetails>
      <Button
        onClick={() => navigate("/")}
        text={"Back"}
        icon={<AiOutlineArrowLeft />}
      />
      {details ? (
        <Container>
          <StyledImg src={details.flags.png} alt={details.flags.alt} />
          <InnerContainer>
            <h2>{countryId}</h2>
            <DetailsContainer>
              <DetailsList>
                <li>
                  <b>Native Name:</b> {details.altSpellings[1]}
                </li>
                <li>
                  <b>Population:</b> {details.population}
                </li>
                <li>
                  <b>Region:</b> {details.region}
                </li>
                <li>
                  <b>Region Sub:</b> {details.subregion}
                </li>
                <li>
                  <b>Capital:</b> {details.capital[0]}
                </li>
              </DetailsList>
              <DetailsList>
                <li>
                  <b>Top Level Domain:</b> {details.tld}
                </li>
                <li>
                  <b>Currencies: </b>
                  {Array.from(Object.values(details.currencies)).map(
                    (value) => (
                      <span key={value.name}>{value.name} </span>
                    )
                  )}
                </li>
                <li>
                  <b>Languages: </b>
                  {Object.values(details.languages)}
                </li>
              </DetailsList>
            </DetailsContainer>
            {borderCountriesDetails && (
              <div>
                <b>Border Countries:</b>
                <BorderCountries>
                  {borderCountriesDetails.map((country: CountryDetails) => (
                    <span style={{ margin: "0.2rem" }} key={country.tld}>
                      <Button
                        text={country.name.common}
                        onClick={() =>
                          navigate(`/country/${country.name.common}`)
                        }
                      />
                    </span>
                  ))}
                </BorderCountries>
              </div>
            )}
          </InnerContainer>
        </Container>
      ) : (
        <p>Oops 🙊! No data for this country is available at the moment!</p>
      )}
    </StyledCountryDetails>
  );
};
