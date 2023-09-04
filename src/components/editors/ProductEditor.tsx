import { useEffect, useState } from "react";
import { ProductType, ProductUnitType } from "../../data/types";
import { useUserContext } from "../../context/UserContext";
import config from "../../data/config";
import { ReducerActions } from "../../data/enums";
import { useFetchContext } from "../../context/FetchContext";
import InfoBox from "../InfoBox";
import Loader from "../Loader";

const ProductEditor = (props: Pick<ProductType, "id">) => {
  const { userState, userDispatch } = useUserContext();
  const { isPending, fetchCallback } = useFetchContext();

  const [productFinded, setProductFinded] = useState<boolean>(false);
  const [productTitle, setProductTitle] = useState<string>("");
  const [productUnit, setProductUnit] = useState<string>("szt");

  const [fetchSuccess, setFetchSuccess] = useState<string>("");
  const [fetchError, setFetchError] = useState<string>("");

  let currentProduct = userState.products.find(
    (el: ProductType) => el.id === props.id
  );

  const handleSubmit = () => {
    setFetchSuccess("");
    setFetchError("");
    fetchCallback({
      url: config.AX_ROUTE_PRODUCTS,
      method: props.id !== "none" ? "PUT" : "POST",
      payload: {
        username: userState.username,
        token: userState.token,
        id: props?.id,
        title: productTitle,
        unit: productUnit,
      },
      successCallback: (response: any) => {
        if (response.data.error) return setFetchError(response.data.error);
        userDispatch({
          type: ReducerActions.SET_DATA,
          payload: { products: response.data.products },
        });
        setFetchSuccess(
          "Produkt został " + (props.id !== "none" ? "edytowany" : "dodany")
        );
        if (!productFinded && props.id === "none") {
          setProductTitle("");
          setProductUnit("szt");
        }
      },
      errorCallback: (error: any) => setFetchError(error.message),
    });
  };

  useEffect(() => {
    if (props.id !== "none") {
      let findProduct: ProductType = userState.products.find(
        (el: ProductType) => el.id === props.id
      );
      if (findProduct.id) {
        setProductTitle(findProduct.title);
        setProductUnit(findProduct.unit);
        setProductFinded(true);
      }
    }
  }, []);

  if (!productFinded && props.id !== "none")
    return <div>Nie znaleziono produktu</div>;

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        {fetchError && <InfoBox type="error" message={fetchError} />}
        {fetchSuccess && <InfoBox type="success" message={fetchSuccess} />}
        <p>Nazwa produktu:</p>
        <input
          type="text"
          value={productTitle}
          onChange={(e) => setProductTitle(e.target.value)}
        />
        <p>Jednostka:</p>
        <select
          defaultValue={currentProduct?.unit || productUnit}
          onChange={(e) => setProductUnit(e.target.value)}
        >
          {config.PRODUCT_UNITS.map((el: ProductUnitType) => (
            <option key={el} value={el}>
              {el}
            </option>
          ))}
        </select>
        {isPending ? (
          <Loader />
        ) : (
          <button type="submit">
            {props.id !== "none" ? "Edytuj" : "Dodaj"}
          </button>
        )}
      </form>
    </>
  );
};

export default ProductEditor;
