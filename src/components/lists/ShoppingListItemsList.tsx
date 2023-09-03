import { useUserContext } from "../../context/UserContext";
import { ShoppingListItemType } from "../../data/types";
import InfoBox from "../InfoBox";
import ShoppingListItemElement from "../elements/ShoppingListItemElement";

const ShoppingListItemsList = () => {
  const { userState } = useUserContext();

  return (
    <>
      {userState.shoppingList.length === 0 ? (
        <InfoBox type="info" message="Brak produktów" />
      ) : (
        userState.shoppingList.map((el: ShoppingListItemType) => (
          <ShoppingListItemElement
            key={el.id}
            id={el.id}
            productId={el.productId}
            count={el.count}
          />
        ))
      )}
    </>
  );
};

export default ShoppingListItemsList;
