import { Url } from "next/dist/shared/lib/router/router";

export const getActiveClass = (pathname: string, path: Url): boolean => {
  return pathname === path;
};
