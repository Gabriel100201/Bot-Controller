import { useState } from "react"

import { Switch } from "@mui/material"

// eslint-disable-next-line arrow-body-style
export const SwitchMode = () => {
  const [isOnline, setOnline] = useState(true)

  const hanldeOnline = () => {
    setOnline(!isOnline)
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