import axios, {AxiosInstance} from "axios";


export const notionApi: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
})