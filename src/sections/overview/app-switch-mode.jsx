import axios from "axios"
import { useState, useContext } from "react"

import { Switch } from "@mui/material"

import useAuth from "src/hooks/useAuth"

import { LoginContext } from "src/context/LoginContext"

// eslint-disable-next-line arrow-body-style
export const SwitchMode = () => {
  const [isOnline, setOnline] = useState(true)
  const { validateToken } = useAuth()
  const { dockerId, infoLogged } = useContext(LoginContext)

  const config = {
    headers: {
      'Authorization': `${infoLogged}`
    },
  };

  const hanldeOnline = async () => {
    const route = isOnline ? "stop" : "start";
    if (await validateToken()) {
      setOnline(!isOnline)
      axios.post(`http://localhost:3000/containers/${dockerId}/${route}`, null, config)
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm flex flex-col p-8 items-center justify-start">
      <h3 className="font-semibold text-lg">Estado del bot</h3>
      <span className="text-sm text-gray-400">Tiempo total activo: 2 días</span>
      <div className="mt-5">
        <Switch checked={isOnline} size="medium" onChange={hanldeOnline} />
        <span>{isOnline ? "Encendido" : "Apagado"}</span>
      </div>
    </div>
  )
}