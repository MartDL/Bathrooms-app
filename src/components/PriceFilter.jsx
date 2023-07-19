import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 280px;
  height: 110px;
  background-color: #fff;
  border-radius: 3px;
  margin-top: 35px;
  padding: 20px 10px;
  .filter-title {
    margin: 0 0 0 10px;
  }
`;

const PriceFilterContainer = styled.div`
  display: flex;
  .text-label {
    font-size: 16px;
    padding: 0 3px;
  }
`;

const StyledPriceInput = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  input {
    width: 50px;
    height: 40px;
    margin: 3px;
    padding: 0 5px;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const StyledButton = styled.button`
  height: 45px;
  width: 60px;
  margin: auto 5px;
  padding: 10px 20px;
  background-color: #8d8d8d;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-weight: 800;
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover {
    background-color: #7c7c7c;
    transition: 0.7s;
  }
`;

export const PriceFilter = ({ title, minPrice, maxPrice, onPriceChange }) => {
  const [minInput, setMinInput] = useState(minPrice);
  const [maxInput, setMaxInput] = useState(maxPrice);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "minPrice") {
      setMinInput(parseInt(value));
    } else if (name === "maxPrice") {
      setMaxInput(parseInt(value));
    }
  };

  const handleSubmit = () => {
    onPriceChange({ min: minInput, max: maxInput });
  };

  return (
    <Container>
      <h2 className="filter-title">{title}</h2>
      <PriceFilterContainer>
        <h5 className="text-label">£</h5>
        <StyledPriceInput>
          <input
            type="number"
            name="minPrice"
            value={minInput || null}
            placeholder="Min"
            onChange={handleInputChange}
          />
        </StyledPriceInput>
        <h5 className="text-label">to</h5>
        <StyledPriceInput>
          <input
            type="number"
            name="maxPrice"
            value={maxInput || null}
            placeholder="Max"
            onChange={handleInputChange}
          />
        </StyledPriceInput>
        <StyledButton onClick={handleSubmit}>Go</StyledButton>
      </PriceFilterContainer>
    </Container>
  );
};
