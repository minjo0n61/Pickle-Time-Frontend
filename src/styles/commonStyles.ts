import styled from '@emotion/styled';

export const GridTemplate = styled.div`
  display: grid;
  justify-content: center;
  align-items: flex-start;

  margin-top: 2rem;

  grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  grid-gap: 2rem;
`;

export const TwoColumnGridTemplate = styled.div`
  display: grid;
  justify-content: center;
  align-items: flex-start;
  grid-template-columns: 1fr 1fr;
  grid-gap: 2rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
  grid-auto-rows: minmax(15rem, 1fr);

  @media (max-width: 500px) {
    grid-gap: 1.5rem;
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
  }
`;
