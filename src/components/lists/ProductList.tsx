import { useUserContext } from "../../context/UserContext";
import { ProductType } from "../../data/types";
import { productsSorter } from "../../utils/dataSorters";
import InfoBox from "../InfoBox";
import SearchBar from "../SearchBar";
import Product from "../elements/ProductElement";
import { useState, useCallback } from "react";

const ProductList = () => {
  const { userState } = useUserContext();
  const [searchString, setSearchString] = useState<string>("");

  const sortedProducts: ProductType[] =
    userState.products.length > 0
      ? productsSorter(userState).filter((el) =>
          el.title?.toUpperCase().includes(searchString.toUpperCase())
        )
      : [];

  const handleChangeSearch = useCallback(
    (e: any) => {
      setSearchString(e.target.value);
    },
    [searchString]
  );

  return (
    <>
      <div id="separator"></div>
      <SearchBar value={searchString} onChange={handleChangeSearch} />
      {sortedProducts.length === 0 ? (
        <InfoBox type="info" message="Brak produktów" />
      ) : (
        sortedProducts.map((el: ProductType) => (
          <Product
            key={el.id}
            id={el.id}
            title={el.title}
            unit={el.unit}
            createdAt={el.createdAt}
            updatedAt={el?.updatedAt || undefined}
          />
        ))
      )}
    </>
  );
};

export default ProductList;
