import { api } from "../config";

const fetcher = {
  get: (url: string, params?: { [key: string]: string | number }) =>
    api.get(url, { params }).then((res) => res.data),
  post: <T, U>(url: string, { arg }: { arg: T }) =>
    api.post<U>(url, arg).then((res) => res.data),
};

export { fetcher };
