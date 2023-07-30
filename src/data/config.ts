import { Config } from "./types";

const config: Config = {
  BASE_URL: "/daily-data-typescript",
  AX_BASE_URL: "https://daily-data-server.onrender.com",
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
  NAVIGATION_LINKS: [
    { url: "/", name: "Główna" },
    { url: "/notes", name: "Notatki" },
    { url: "/contacts", name: "Kontakty" },
    { url: "/events", name: "Wydarzenia" },
    { url: "/debt", name: "Zadłużenia" },
    { url: "/add", name: "Dodaj" },
    { url: "/settings", name: "Ustawienia" },
  ],
  MEMORY_SLOTS: {
    login: "DD-App-memory-login",
    password: "DD-App-memory-password",
    passwordRemember: "DD-App-memory-password-remember",
    autoLogin: "DD-App-memory-auto-login",
  },
  WEATHER_LINK: "https://danepubliczne.imgw.pl/api/data/synop",
};

export default config;