import axios, { AxiosInstance } from "axios"

const clienteHttp: AxiosInstance = axios.create({
  baseURL: "https://json-server-vercel-tasktracker.vercel.app/"
})

export default clienteHttp