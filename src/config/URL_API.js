const ENVIROMENT = import.meta.env.VITE_APP_ENVIROMENT

const URL_API_DEV = "http://localhost:3000"
const URL_API_PROD = "https://bots-technodevs.online/api"

export const URL_API = () => {
  if (ENVIROMENT === 'development') {
    return URL_API_DEV
  }
  return URL_API_PROD
}
