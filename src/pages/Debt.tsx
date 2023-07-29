import { useParams } from "react-router-dom";
import DebtList from "../components/lists/DebtList";
import DebtEditor from "../components/editors/DebtEditor";

const Debt = () => {
  const params = useParams();

  return (
    <>
      {params.id && params.user ? (
        <DebtEditor id={params.id} user={params.user} />
      ) : (
        <DebtList />
      )}
    </>
  );
};

export default Debt;
