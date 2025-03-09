import axios from "axios";

const baseURL: string = process.env.NEXT_PUBLIC_BASE_URL!;

/** API Instance */
const api = axios.create({ baseURL, withCredentials: false });

export { api };
