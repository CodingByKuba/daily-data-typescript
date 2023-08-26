import { BsSearch } from "react-icons/bs";

type SearchBarPropsType = {
  value: string;
  onChange: (e: any) => void;
};

const SearchBar = (props: SearchBarPropsType) => {
  return (
    <div id="search-bar">
      <input type="text" value={props.value} onChange={props.onChange} />
      <span>
        <BsSearch />
      </span>
    </div>
  );
};

export default SearchBar;
