import axios from "axios"
import { useMemo, useState, useEffect, useContext } from "react"

import { Switch } from "@mui/material"

import { URL_API } from "src/config/URL_API"
import { LoginContext } from "src/context/LoginContext"

import { ModalQR } from "./app-qr-modal"

// eslint-disable-next-line arrow-body-style, react/prop-types
export const SwitchMode = ({ sx }) => {
  const [isOnline, setOnline] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const { infoUser } = useContext(LoginContext)
  const [, setContainerId] = useState(null)

  const config = useMemo(() => ({
    headers: {
      'Authorization': `${infoUser.token}`
    }
  }), [infoUser.token]);

  useEffect(() => {
    axios.post(`${URL_API()}/containers/getInfo`, null, config)
      .then((res) => setOnline(res.data))
      .catch((err) => console.log(err))
  }, [config])


  const hanldeOnline = async () => {
    setLoading(true)
    const route = isOnline ? `${URL_API()}/containers/stop` : `${URL_API()}/containers/start`;

      axios.post(route, null, config)
        .then((res) => {
          setContainerId(res.data.containerId)
          setOnline(!isOnline)
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false))
  }

  return (
    <div style={{ ...sx }} className="bg-white rounded-lg flex flex-col p-8 items-center justify-start">
      <h3 className="font-semibold text-lg">Estado del bot</h3>
      <span className="text-sm text-gray-400">Tiempo total activo: 2 días</span>
      <div className="mt-5 flex justify-center flex-col items-center">
        <Switch checked={isOnline} disabled={isLoading} size="medium" onChange={hanldeOnline} />
        <span>{isOnline ? "Encendido" : "Apagado"}</span>
        <div className="mt-5">
          <ModalQR isDisabled={!isOnline} />
        </div>
      </div>
    </div>
  )
}