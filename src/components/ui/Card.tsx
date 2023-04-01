import styled from "styled-components";

const StyledCard = styled.div`
  min-width: 300px;
  margin: 2rem;
  border: 1px solid #ddd;
  border-radius: 3px;

  .info {
    padding: 1rem;
  }
`;

const StyledImg = styled.img`
  width: 300px;
  height: 200px;
  object-fit: cover;
  border-radius: 0 3px;
`;

type CardProps = {
  name: string;
  area?: number;
  region: string;
  capital: string;
  image: {
    alt: string;
    png: string;
  };
};

export const Card = ({ name, area, region, capital, image }: CardProps) => {
  return (
    <StyledCard>
      <StyledImg src={image.png} alt={image.alt} />
      <div className="info">
        <h2>{name}</h2>
        <p>
          <b>Population:</b> {area}
        </p>
        <p>
          <b>Region:</b> {region}
        </p>
        <p>
          <b>Capital:</b> {capital}
        </p>
      </div>
    </StyledCard>
  );
};
