import React from "react";
import styled from "styled-components";

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  height: 420px;
  width: 310px;
  margin: 15px;
  background: #fff;
  border-radius: 5px;
`;

const ContentContainer = styled.div`
  padding: 5px 10px;
`;

const StyledImage = styled.img`
  border-radius: 5px;
  width: 100%;
`;

const StyledTitle = styled.h3`
  font-size: 16px;
  font-weight: 500;
  padding: 2px;
  margin: 0;
`;

const StyledPrice = styled.h2`
  color: #f00000;
  font-weight: 900;
  font-size: 20px;
  margin: 0;
`;

const StyledAverageRating = styled.h3`
  font-weight: 400;
  font-size: 14px;
  margin: 0;
`;

export const ProductCard = (data) => {
  return (
    <ItemContainer>
      <StyledImage
        src={data.data.image.url}
        alt={data.data.image.attributes.imageAltText}
      />
      <ContentContainer>
        <StyledTitle>{data.data.productName}</StyledTitle>
        <StyledPrice>£{data.data.price.priceIncTax}</StyledPrice>
        {data.data.reviewsCount > 0 && (
          <StyledAverageRating>
            Rating: {data.data.averageRating} out of 5 ({data.data.reviewsCount}
            )
          </StyledAverageRating>
        )}
        <div></div>
      </ContentContainer>
    </ItemContainer>
  );
};
