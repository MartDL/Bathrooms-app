import React, { useState, useEffect } from "react";

export const useProductData = (initialProducts) => {
  const [products, setProducts] = useState(initialProducts);
  const [currentProducts, setCurrentProducts] = useState({
    query: "toilets",
    pageNumber: 0,
    size: 0,
    additionalPages: 0,
    sort: 1,
    facets: undefined,
  });

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

  return { products, currentProducts, setCurrentProducts };
};
