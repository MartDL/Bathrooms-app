import React, { useState } from "react";
import styled from "styled-components";

const PaginationBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledButton = styled.button`
  background-color: #ffffff;
  color: #333;
  padding: 8px 12px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  margin: 0 5px;

  &:hover {
    background-color: #ddd;
  }

  &:disabled {
    background-color: #ccc;
    color: #888;
    cursor: not-allowed;
  }
`;

export const PaginationBar = ({ currentPage, onPageChange, totalPages }) => {
  const [currentPageNumber, setCurrentPageNumber] = useState(currentPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPageNumber(pageNumber);
      onPageChange(pageNumber);
    }
  };

  return (
    <PaginationBarContainer>
      <StyledButton
        onClick={() => handlePageChange(1)}
        disabled={currentPageNumber === 1}
      >
        First
      </StyledButton>
      <StyledButton
        onClick={() => handlePageChange(currentPageNumber - 1)}
        disabled={currentPageNumber === 1}
      >
        Back
      </StyledButton>
      <StyledButton
        onClick={() => handlePageChange(currentPageNumber + 1)}
        disabled={currentPageNumber === totalPages}
      >
        Next
      </StyledButton>
      <StyledButton
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPageNumber === totalPages}
      >
        Last
      </StyledButton>
    </PaginationBarContainer>
  );
};
