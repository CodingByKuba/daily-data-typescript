import { NavLink } from "react-router-dom";
import { ShoppingListItemType, ProductType } from "../../data/types";
import { useFetchContext } from "../../context/FetchContext";
import config from "../../data/config";
import { useUserContext } from "../../context/UserContext";
import { useState } from "react";
import InfoBox from "../InfoBox";
import { ReducerActions } from "../../data/enums";
import DeleteButton from "../DeleteButton";

const ShoppingListItemElement = (props: ShoppingListItemType) => {
  const { fetchCallback } = useFetchContext();
  const { userState, userDispatch } = useUserContext();
  const [deleteError, setDeleteError] = useState<string>("");

  let currentProduct = userState.products.find(
    (el: ProductType) => el.id === props.productId
  );

  const handleDelete = () => {
    if (confirm("Czy chcesz usunąć produkt z listy zakupów?")) {
      setDeleteError("");
      fetchCallback({
        url: config.AX_ROUTE_SHOPPINGLIST,
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
            payload: { shoppingList: response.data.shoppingList },
          });
        },
        errorCallback: (error: any) => setDeleteError(error.message),
      });
    }
  };

  return (
    <article>
      <NavLink to="/shopping-list">{currentProduct.title}</NavLink>
      {deleteError && <InfoBox type="error" message={deleteError} />}
      <pre>
        {props.count} {currentProduct.unit.toUpperCase()}
      </pre>
      <DeleteButton handleClick={handleDelete} />
    </article>
  );
};

export default ShoppingListItemElement;
