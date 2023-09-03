export type Config = {
  BASE_URL: "/daily-data-typescript";
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
  MEMORY_SLOTS: MemorySlotsType;
  WEATHER_LINK: string;
};

type MemorySlotsType = {
  login: string;
  password: string;
  passwordRemember: string;
  autoLogin: string;
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
  serverAlive: boolean;
  dataLoaded: boolean;
  navigationOpened: boolean;
  username: string;
  token: string;
  contacts: any[];
  notes: any[];
  events: any[];
  weatherCity: null | number;
  weatherStations: any[];
  products: any[];
  shoppingList: any[];
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

export type ContactType = {
  id: string;
  name: string;
  phone: number;
  email: string;
  debt: any[];
  comment: string;
  instagramLink: string;
  facebookLink: string;
  createdAt: Date;
  updatedAt?: Date | undefined;
};

export type EventType = {
  id: string;
  title: string;
  comment: string;
  time: Date;
  createdAt: Date;
  updatedAt?: Date | undefined;
  noDelete?: boolean;
};

export type DebtType = {
  id: string;
  my: boolean;
  count: number;
  comment: string;
  time: Date;
  createdAt: Date;
  updatedAt?: Date | undefined;
  username?: string;
  contactId?: string;
};
