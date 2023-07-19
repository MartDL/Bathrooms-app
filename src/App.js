import React, { useState, useEffect } from "react";
import Select from "react-select";
import styled from "styled-components";
import { ProductCard, PriceFilter, PaginationBar } from "./components/index";
import "./App.css";

const Container = styled.div`
  display: flex;
  width: 100%;
  padding: 0;
  margin: 20px 0;
`;

const FiltersContainer = styled.div`
  width: 300px;
  height: 100vh;
  margin: 15px;
`;

const InfoBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 65vw;
  .sort-dropdown {
    width: 210px;
  }
`;

const ItemsContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 75vw;
  flex-wrap: wrap;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: fit-content;
`;

const App = () => {
  const [products, setProducts] = useState();
  console.log("products", products);
  const [currentProducts, setCurrentProducts] = useState({
    query: "toilets",
    pageNumber: 0,
    size: 0,
    additionalPages: 0,
    sort: 1,
    facets: undefined,
  });
  const [selectedOption, setSelectedOption] = useState(null);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages =
    products && Math.ceil(products.pagination.total / products.products.length);

  const sortProductOptions = [
    { value: "recommended", label: "Sort by Recommended" },
    { value: "priceLowToHigh", label: "Price: Low - High" },
    { value: "priceHighToLow", label: "Price: High - Low" },
    { value: "largestDiscount", label: "Largest Discount" },
  ];

  const fetchDataFromAPI = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: currentProducts.query,
        pageNumber: currentProducts.pageNumber,
        size: currentProducts.size,
        additionalPages: currentProducts.additionalPages,
        sort: currentProducts.sort,
        facets: currentProducts.facets,
      }),
    };
    try {
      const fetchResponse = await fetch(
        "https://spanishinquisition.victorianplumbing.co.uk/interviews/listings?apikey=yj2bV48J40KsBpIMLvrZZ1j1KwxN4u3A83H8IBvI",
        requestOptions
      );
      const data = await fetchResponse.json();
      setProducts(data);
      return data;
    } catch (error) {
      console.log("error", error);
      return error;
    }
  };

  useEffect(() => {
    // fetch updated data from API and update the page whenever filters/sort selected
    fetchDataFromAPI();
  }, [currentProducts, setCurrentProducts]);

  // Updates the sort order when a user selects an option
  const handleOptionChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    if (selectedOption.value === "recommended") {
      setCurrentProducts({
        ...currentProducts,
        sort: 1,
      });
    } else if (selectedOption.value === "priceLowToHigh") {
      setCurrentProducts({
        ...currentProducts,
        sort: 2,
      });
    } else if (selectedOption.value === "priceHighToLow") {
      setCurrentProducts({
        ...currentProducts,
        sort: 3,
      });
    } else if (selectedOption.value === "largestDiscount") {
      setCurrentProducts({
        ...currentProducts,
        sort: 4,
      });
    } else {
      return null;
    }
  };

  // updates the price range of visable products
  const handlePriceChange = ({ min, max }) => {
    setMinPrice(min);
    setMaxPrice(max);
    setCurrentProducts({
      ...currentProducts,
      facets: {
        prices: [
          {
            value: {
              gte: min,
              lte: max,
            },
          },
        ],
      },
    });
  };

  // handles pagination events
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    setCurrentProducts({
      ...currentProducts,
      pageNumber: pageNumber,
    });
  };

  return (
    <Container>
      <FiltersContainer>
        <PriceFilter
          title={products && products.facets[0].displayName}
          minPrice={minPrice}
          maxPrice={maxPrice}
          onPriceChange={handlePriceChange}
        />
      </FiltersContainer>
      <ContentContainer>
        <InfoBarContainer>
          <div className="sort-dropdown">
            <Select
              options={sortProductOptions}
              value={selectedOption}
              onChange={handleOptionChange}
              placeholder="Sort by..."
            />
          </div>
          <PaginationBar
            currentPage={currentPage}
            onPageChange={handlePageChange}
            totalPages={totalPages}
          />
          <div className="products-count">
            Products: {products && products.pagination.total}
          </div>
        </InfoBarContainer>
        <ItemsContainer>
          {products === undefined ? (
            <div>Loading...</div>
          ) : (
            products.products.map((card, index) => (
              <ProductCard key={index} data={card} />
            ))
          )}
        </ItemsContainer>
      </ContentContainer>
    </Container>
  );
};

export default App;
