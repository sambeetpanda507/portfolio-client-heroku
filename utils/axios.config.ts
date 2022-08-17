import axios from 'axios'

const _axios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_AXIOS_BASE_URL,
})

export const authAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_AUTH_URI,
})

export default _axios
