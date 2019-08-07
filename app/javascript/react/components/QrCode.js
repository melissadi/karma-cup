import React from 'react'
import QRCode from 'qrcode.react'

const QrCode = (props) => {

  return(
    <QRCode
      value={props.userEmail}
      size={300}
      fgColor="#1B7B34"
    />

  )
}

export default QrCode;
