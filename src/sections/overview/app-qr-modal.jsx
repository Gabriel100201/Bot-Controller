/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useState } from 'react';

import { Box, Modal, Button } from '@mui/material';

// eslint-disable-next-line react/prop-types
export const ModalQR = ({ isDisabled }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxHeight: '100vh',
  };

  const iframeStyle = {
    width: '100%',
    height: '100%',
    border: 'none',
    borderRadius: '10px'
  };

  const buttonStyle = {
    backgroundColor: '#45a049',
    color: '#eee',
    '&:hover': {
      backgroundColor: '#2c692f',
    },
  }

  const modalBody = (
    <Box
      sx={{
        width: 370,
        height: 370,
        boxShadow: 24,
        display: 'flex',
        borderRadius: 2,
        placeContent: 'center'
      }}
      style={modalStyle}
    >
      <iframe src='https://bots-technodevs.online/bot-td/qr' frameBorder="0"
        scrolling="no"
        style={iframeStyle} />
    </Box>
  );

  return (
    <div>
      <Button disabled={isDisabled} sx={buttonStyle} onClick={handleOpen}>Escanear QR</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        {modalBody}
      </Modal>
    </div>
  );
};
