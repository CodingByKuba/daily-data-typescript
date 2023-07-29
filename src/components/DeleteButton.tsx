import { AiOutlineDelete } from "react-icons/ai";

const DeleteButton = ({ handleClick }: any) => {
  return (
    <div className="delete">
      <button onClick={handleClick}>
        <AiOutlineDelete size={20} />
      </button>
    </div>
  );
};

export default DeleteButton;
