import styled from "styled-components";

const StyledCard = styled.section`
  min-width: 250px;
  max-width: 300px;
  margin: 2rem;
  border: 1px solid ${(props) => props.theme.elements};
  border-radius: 6px;
  background-color: ${(props) => props.theme.elements};

  .info {
    padding: 1rem;
  }
`;

const StyledImg = styled.img`
  width: 300px;
  height: 150px;
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
  onClick?: () => void;
};

const StyledHeader = styled.h2`
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const Card = ({
  name,
  area,
  region,
  capital,
  image,
  onClick,
}: CardProps) => {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter") {
      onClick && onClick();
    }
  };

  return (
    <StyledCard
      onClick={onClick}
      style={{ cursor: onClick === undefined ? "default" : "pointer" }}
      tabIndex={0}
      onKeyDown={handleKeyPress}
    >
      <StyledImg src={image.png} alt={image.alt} />
      <div className="info">
        <StyledHeader>{name}</StyledHeader>
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
