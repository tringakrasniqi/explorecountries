import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { SearchType, getData } from "../services/CountriesService";
import { StyledButtonWithIcon } from "../components/Button";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { AnchorLink } from "../components/Link";

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
      <StyledButtonWithIcon
        onClick={() => navigate("/")}
        icon={<AiOutlineArrowLeft />}
      >
        Back
      </StyledButtonWithIcon>
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
                      <span key={value.name}>
                        {value.name} ({value.symbol}){" "}
                      </span>
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
              <>
                <b>Border Countries:</b>
                <BorderCountries>
                  {borderCountriesDetails.map((country: CountryDetails) => (
                    <AnchorLink
                      key={country.name.common}
                      href={`/country/${country.name.common}`}
                    >
                      {country.name.common}
                    </AnchorLink>
                  ))}
                </BorderCountries>
              </>
            )}
          </InnerContainer>
        </Container>
      ) : (
        <p>Loading...</p>
      )}
    </StyledCountryDetails>
  );
};
