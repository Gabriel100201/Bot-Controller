import axios from "axios";
// eslint-disable-next-line import/no-extraneous-dependencies
import { toast } from "sonner";
// eslint-disable-next-line import/no-extraneous-dependencies
import { ThreeDots } from "react-loader-spinner";
import { useMemo, useState, useEffect, useContext } from "react";

import { Card, Modal, Button, MenuItem, TextField } from "@mui/material";

import { URL_API } from "src/config/URL_API";
import { LoginContext } from "src/context/LoginContext";

// eslint-disable-next-line react/prop-types
export default function UserModal({ openModal, handleCloseModal, fetchUsersData }) {
  const { infoUser } = useContext(LoginContext)
  const [rols,] = useState(["user", "admin"])
  const [bots, setBots] = useState()
  const [loading, setLoading] = useState()

  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    company: "",
    rol: "user",
    imageId: ""
  });

  useEffect(() => {
    axios.post(`${URL_API()}/images`, null, {
      headers: {
        Authorization: `${infoUser.token}`
      }
    })
      .then((res) => {
        const botsData = (res.data)
        setBots(botsData)
      })
      .catch((err) => console.log(err))
  }, [infoUser])

  const cardStyles = {
    width: '100%',
    maxWidth: '600px',
    padding: '60px 80px',
    height: '90%',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: '20px'
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id ? e.target.id : e.target.name]: e.target.value
    });
  };

  const config = useMemo(() => ({
    headers: {
      'Authorization': `${infoUser.token}`
    }
  }), [infoUser.token]);

  const handleSubmit = () => {
    setLoading(true)
    axios.post(`${URL_API()}/createUser`, formData, config)
      .then(() => {
        handleCloseModal()
        fetchUsersData()
        toast.success("Usuario creado con éxito")
      })
      .catch(error => {
        toast.error(error.response.data.error)
      })
      .finally(() => setLoading(false))

  };

  return (
    <Modal
      open={openModal}
      onClose={handleCloseModal}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Card sx={cardStyles}>
        <span className='w-full text-center text-2xl font-semibold mb-2'>Información del nuevo usuario</span>
        <TextField disabled={loading} id="userName" label="Nombre" variant="filled" onChange={handleChange} />
        <TextField disabled={loading} id="password" label="Contraseña" type="password" variant="filled" onChange={handleChange} />
        <TextField disabled={loading} id="company" label="Empresa" variant="filled" onChange={handleChange} />
        {rols &&
          <TextField disabled={loading} select name="rol" value={formData.rol} id="rol" label="Rol" variant="filled" onChange={handleChange}>
            {rols.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        }
        {bots &&
          <TextField disabled={loading}
            id="imageId"
            select
            name="imageId"
            label="Bot"
            value={formData.imageId}
            helperText="Por favor selecciona su bot"
            variant="filled"
            onChange={handleChange}
          >
            {bots.map((option, index) => (
              <MenuItem key={index} value={option.id} >
                {option.name}
              </MenuItem>
            ))}
          </TextField>
        }

        <Button disabled={loading} className='h-12' variant="contained" onClick={handleSubmit}>
          Crear Usuario
          {loading &&
            <div className='absolute right-7'>
              <ThreeDots
                visible
                height="30"
                width="30"
                color="#2D0D4C"
                ariaLabel="line-wave-loading"
                wrapperStyle={{}}
                wrapperClass=""
                firstLineColor=""
                middleLineColor=""
                lastLineColor=""
              />
            </div>
          }
        </Button>
      </Card>
    </Modal >
  );
}