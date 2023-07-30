import { NavLink } from "react-router-dom";
import config from "../data/config";
import { NavigationLinkType } from "../data/types";
import {
  BsFillHouseDoorFill,
  BsFillFileEarmarkFontFill,
  BsFillFileEarmarkPersonFill,
  BsFillCalendar2PlusFill,
  BsFillCreditCard2FrontFill,
  BsFillPatchPlusFill,
  BsAsterisk,
} from "react-icons/bs";

const icons = [
  <BsFillHouseDoorFill />,
  <BsFillFileEarmarkFontFill />,
  <BsFillFileEarmarkPersonFill />,
  <BsFillCalendar2PlusFill />,
  <BsFillCreditCard2FrontFill />,
  <BsFillPatchPlusFill />,
  <BsAsterisk />,
];

const FooterMenu = () => {
  return (
    <header id="footer-menu">
      {config.NAVIGATION_LINKS.map((el: NavigationLinkType, index: number) => (
        <NavLink key={index} to={el.url}>
          {icons[index] || ""}
        </NavLink>
      ))}
    </header>
  );
};

export default FooterMenu;
