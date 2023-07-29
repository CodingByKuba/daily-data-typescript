import { useEffect, useState } from "react";
import { useUserContext } from "../../context/UserContext";
import { ContactType, DebtType } from "../../data/types";
import InfoBox from "../InfoBox";
import Debt from "../elements/DebtElement";

const DebtList = () => {
  const { userState } = useUserContext();
  const [contactsWithDebt, setContactsWithDebt] = useState<number>(0);

  useEffect(() => {
    if (userState.contacts.length === 0) return;

    userState.contacts.map((el: ContactType) => {
      if (el.debt.length > 0)
        setContactsWithDebt((currentValue) => currentValue + 1);
    });
  }, []);

  if (contactsWithDebt === 0)
    return <InfoBox type="info" message="Brak zadłużeń" />;

  return (
    <>
      {userState.contacts.map(
        (elem: ContactType) =>
          elem.debt.length > 0 && (
            <section key={elem.id}>
              <h3>{elem.name}</h3>
              {elem.debt.length > 0 &&
                elem.debt.map((el: DebtType) => (
                  <Debt
                    key={el.id}
                    id={el.id}
                    my={el.my}
                    count={el.count}
                    comment={el.comment}
                    time={el.time}
                    createdAt={el.createdAt}
                    updatedAt={el.updatedAt || undefined}
                    username={elem.name}
                    contactId={elem.id}
                  />
                ))}
            </section>
          )
      )}
    </>
  );
};

export default DebtList;
