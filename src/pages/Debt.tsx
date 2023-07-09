import { useParams } from "react-router-dom";
import DebtList from "../components/lists/DebtList";

const Debt = () => {
  const params = useParams();

  return (
    <>
      {params.id && params.user ? (
        "Zadłużenie (" + params.user + ") " + params.id
      ) : (
        <DebtList />
      )}
    </>
  );
};

export default Debt;
