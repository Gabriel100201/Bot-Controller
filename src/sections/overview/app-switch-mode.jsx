import axios from "axios"
import { useMemo, useState, useEffect, useContext } from "react"

import { Switch } from "@mui/material"

import { LoginContext } from "src/context/LoginContext"

// eslint-disable-next-line arrow-body-style
export const SwitchMode = () => {
  const [isOnline, setOnline] = useState(false)
  const { infoUser } = useContext(LoginContext)
  const [, setContainerId] = useState(null)

  const config = useMemo(() => ({
    headers: {
      'Authorization': `${infoUser.token}`
    }
  }), [infoUser.token]);

  useEffect(() => {
    axios.post("http://18.234.215.158:3000/containers/getInfo", null, config)
      .then((res) => setOnline(res.data))
      .catch((err) => console.loge(err))
  }, [config])


  const hanldeOnline = async () => {
    const route = isOnline ? `http://18.234.215.158:3000/containers/stop` : `http://18.234.215.158:3000/containers/start`;

      axios.post(route, null, config)
        .then((res) => {
          setContainerId(res.data.containerId)
          setOnline(!isOnline)
        })
        .catch((err) => console.log(err))

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