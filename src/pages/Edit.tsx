import { useParams } from "react-router-dom";

const Edit = () => {
  const params = useParams();

  return (
    <div>
      {params.type
        ? "Edytuj " + params.type + (params.id ? "(" + params.id + ")" : "")
        : "Edytuj"}
    </div>
  );
};

export default Edit;
