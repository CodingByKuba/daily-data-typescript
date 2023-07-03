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
  LOCATION_NAMES: any;
  NAVIGATION_LINKS: NavigationLinkType[];
};

export type ReducerActionType = {
  type: number;
  payload?: any;
};

export type FetchContextType = {
  isPending: any;
  fetchCallback: (arg?: any) => void;
};

export type FetchProviderType = {
  children?: React.ReactNode;
};

export type FetchCallbackArguments = {
  url: string;
  method: string;
  timeout: number;
  payload: any;
  successCallback: (arg: any) => void;
  errorCallback: (arg: any) => void;
};

export type UserProviderType = {
  children?: React.ReactNode;
};

export type InfoBoxMode = "success" | "error" | "info";

export type InfoBoxType = {
  message?: string;
  type: InfoBoxMode;
  children?: React.ReactNode;
};

export type UserInitialStateType = {
  dataLoaded: boolean;
  navigationOpened: boolean;
  username: string;
  token: string;
  contacts: any[];
  notes: any[];
  events: any[];
  weatherCity: null | number;
};

export type UserEventType = {
  id: string;
  comment: string;
  time: Date;
  title: string;
  createdAt: Date;
  updatedAt: Date;
};

export type NavigationLinkType = {
  url: string;
  name: string;
};

export type NoteType = {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt?: Date | undefined;
};
