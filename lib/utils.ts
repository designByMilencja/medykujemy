import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
type UrlQueryParams = {
  params: string;
  key: string;
  value: string | null;
};

export const formUrlQuery = ({
  params,
  key,
  value,
}: UrlQueryParams): string => {
  const searchParams = new URLSearchParams(params);
  if (value === null) {
    searchParams.delete(key);
  } else {
    searchParams.set(key, value);
  }
  return `${window.location.pathname}?${searchParams.toString()}`;
};

type RemoveUrlQueryParams = {
  params: string;
  keysToRemove: string[];
};

export const removeKeysFromQuery = ({
  params,
  keysToRemove,
}: RemoveUrlQueryParams): string => {
  const searchParams = new URLSearchParams(params);
  keysToRemove.forEach((key) => searchParams.delete(key));
  return `${window.location.pathname}?${searchParams.toString()}`;
};
