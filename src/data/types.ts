export type Config = {
  AX_BASE_URL: string;
  AX_CHECK_ALIVE: "/check-alive";
  AX_ROUTE_USERS: "/users";
  AX_ROUTE_EVENTS: "/events";
  AX_ROUTE_CONTACTS: "/contacts";
  AX_ROUTE_DEBT: "/debt";
  AX_ROUTE_LOGIN: "/login";
  AX_ROUTE_LOGOUT: "/logout";
  AX_ROUTE_NOTES: "/notes";
};

export type InfoBoxType = {
  message?: string;
  type: "success" | "error" | "info";
  children?: React.ReactNode;
};
