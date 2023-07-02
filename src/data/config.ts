import { Config } from "./types";

const config: Config = {
  AX_BASE_URL: "https://perfect-cow-singlet.cyclic.app",
  AX_CHECK_ALIVE: "/check-alive",
  AX_ROUTE_USERS: "/users",
  AX_ROUTE_EVENTS: "/events",
  AX_ROUTE_CONTACTS: "/contacts",
  AX_ROUTE_DEBT: "/debt",
  AX_ROUTE_LOGIN: "/login",
  AX_ROUTE_LOGOUT: "/logout",
  AX_ROUTE_NOTES: "/notes",
  LOCATION_NAMES: {
    "/": "Strona główna",
    "/notes": "Notatki",
    "/contacts": "Kontakty",
    "/events": "Wydarzenia",
    "/debt": "Zadłużenia",
    "/settings": "Ustawienia",
    "/add": "Dodaj",
    "/add/note": "Dodaj notatkę",
    "/add/contact": "Dodaj kontakt",
    "/add/event": "Dodaj wydarzenie",
    "/add/debt": "Dodaj zadłużenie",
  },
};

export default config;
