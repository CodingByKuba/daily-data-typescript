import { useEffect, useState } from "react";
import { useUserContext } from "../../context/UserContext";
import { ContactType, DebtType } from "../../data/types";
import InfoBox from "../InfoBox";
import Debt from "../elements/DebtElement";

const DebtList = () => {
  const { userState } = useUserContext();
  const [contactsWithDebt, setContactsWithDebt] = useState<ContactType[]>([]);

  useEffect(() => {
    if (userState.contacts.length === 0) return;

    userState.contacts.map((el: ContactType) => {
      if (el.debt.length > 0)
        setContactsWithDebt((current: ContactType[]) => [...current, el]);
    });
  }, []);

  if (contactsWithDebt.length === 0)
    return <InfoBox type="info" message="Brak zadłużeń" />;

  return (
    <>
      {contactsWithDebt.map((elem: ContactType) => (
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
              />
            ))}
        </section>
      ))}
    </>
  );
};

export default DebtList;
