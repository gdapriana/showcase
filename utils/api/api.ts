import axios, {AxiosInstance} from "axios";


export const notionApi: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER,
})