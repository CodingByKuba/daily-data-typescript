import { NavLink } from "react-router-dom";
import { ProductType } from "../../data/types";
import dateParser from "../../utils/dateParser";
import { useFetchContext } from "../../context/FetchContext";
import config from "../../data/config";
import { useUserContext } from "../../context/UserContext";
import { useState } from "react";
import InfoBox from "../InfoBox";
import { ReducerActions } from "../../data/enums";
import DeleteButton from "../DeleteButton";

const NoteElement = (props: ProductType) => {
  const { fetchCallback } = useFetchContext();
  const { userState, userDispatch } = useUserContext();
  const [deleteError, setDeleteError] = useState<string>("");
  const [productCount, setProductCount] = useState<number>(0);

  const handleAdd = () => {
    if (
      confirm('Czy chcesz dodać produkt "' + props.title + '" do listy zakupów')
    ) {
      setDeleteError("");
      fetchCallback({
        url: config.AX_ROUTE_SHOPPINGLIST,
        method: "POST",
        payload: {
          username: userState.username,
          token: userState.token,
          id: props.id,
          count: productCount,
        },
        successCallback: (response: any) => {
          if (response.data.error) return setDeleteError(response.data.error);
          userDispatch({
            type: ReducerActions.SET_DATA,
            payload: { shoppingList: response.data.shoppingList },
          });
          setProductCount(0);
        },
        errorCallback: (error: any) => setDeleteError(error.message),
      });
    }
  };

  const handleDelete = () => {
    if (confirm('Czy chcesz usunąć produkt "' + props.title + '"?')) {
      setDeleteError("");
      fetchCallback({
        url: config.AX_ROUTE_PRODUCTS,
        method: "DELETE",
        payload: {
          username: userState.username,
          token: userState.token,
          id: props.id,
        },
        successCallback: (response: any) => {
          if (response.data.error) return setDeleteError(response.data.error);
          userDispatch({
            type: ReducerActions.SET_DATA,
            payload: { products: response.data.products },
          });
        },
        errorCallback: (error: any) => setDeleteError(error.message),
      });
    }
  };

  return (
    <article>
      <NavLink to={props.id}>{props.title}</NavLink>
      {deleteError && <InfoBox type="error" message={deleteError} />}
      <pre>Jednostka: {props.unit.toUpperCase()}</pre>
      <div>
        <button
          onClick={() =>
            setProductCount((prev) => (prev >= 1 ? prev - 1 : prev))
          }
        >
          &nbsp;-&nbsp;
        </button>
        <input
          className="input-short"
          type="number"
          step={1}
          min={0}
          value={productCount.toString()}
          onChange={(e) => setProductCount(parseFloat(e.target.value))}
        />
        <button onClick={() => setProductCount((prev) => prev + 1)}>
          &nbsp;+&nbsp;
        </button>
        &nbsp;<button onClick={handleAdd}>Dodaj</button>
      </div>
      <span>Utworzono: {dateParser(props.createdAt)}</span>
      {props.updatedAt && props.updatedAt !== props.createdAt && (
        <span>Edytowano: {dateParser(props.updatedAt)}</span>
      )}
      <DeleteButton handleClick={handleDelete} />
    </article>
  );
};

export default NoteElement;
