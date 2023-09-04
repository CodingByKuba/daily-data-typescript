import { BsSearch } from "react-icons/bs";
import { NavLink, useLocation } from "react-router-dom";

type SearchBarPropsType = {
  value: string;
  onChange: (e: any) => void;
};

const SearchBar = (props: SearchBarPropsType) => {
  const location = useLocation();

  return (
    <div id="search-bar">
      {location.pathname === "/products" && (
        <NavLink to="/add/product">
          <button>&nbsp;+&nbsp;</button>
        </NavLink>
      )}
      <input type="text" value={props.value} onChange={props.onChange} />
      <span>
        <BsSearch />
      </span>
    </div>
  );
};

export default SearchBar;
