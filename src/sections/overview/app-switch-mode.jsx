import { useState } from "react"

import { Switch } from "@mui/material"

import useAuth from "src/hooks/useAuth"

// eslint-disable-next-line arrow-body-style
export const SwitchMode = () => {
  const [isOnline, setOnline] = useState(true)
  const { validateToken } = useAuth()

  const hanldeOnline = async () => {
    if (await validateToken()) {
      setOnline(!isOnline)
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