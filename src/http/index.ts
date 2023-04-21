import axios, { AxiosInstance } from "axios"

const clienteHttp: AxiosInstance = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL_AXIOS,
  headers: {
    "Content-type": "application/json",
    // Authorization: `Bearer ${process.env.VUE_APP_TOKEN_DBJSON_TRACKER}`,
  },
})

export default clienteHttp