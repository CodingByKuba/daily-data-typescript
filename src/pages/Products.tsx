import { useParams } from "react-router-dom";
import ProductList from "../components/lists/ProductList";

const Products = () => {
  const params = useParams();

  return params.id ? "Edytor produktu" : <ProductList />;
};

export default Products;
