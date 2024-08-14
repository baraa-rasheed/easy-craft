import apis from "../apis";
import helpers from "../helpers";
import components from "../components";
import { SIZES } from "../constants";

type SIZE = keyof typeof SIZES;

export interface IApi {
  id: string;
  responseKey?: string;
  key: keyof typeof apis;
  data: Record<string, any>;
  params: Record<string, any>;
  helperKey?: keyof typeof helpers;
  responseToProps: { [key: string]: string };
}

export interface IElement {
  id: string;
  api?: IApi;
  size: SIZE;
  props?: any;
  children?: Array<IElement>;
  element: keyof typeof components;
}

export interface IRoute {
  path: string;
  icon: string;
  type?: string;
  title: string;
  elements: Array<IElement>;
}
