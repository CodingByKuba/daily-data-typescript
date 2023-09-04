import { useParams } from "react-router-dom";
import ProductList from "../components/lists/ProductList";
import ProductEditor from "../components/editors/ProductEditor";

const Products = () => {
  const params = useParams();

  return <>{params.id ? <ProductEditor id={params.id} /> : <ProductList />}</>;
};

export default Products;
