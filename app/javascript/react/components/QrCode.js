import React from 'react'
import QRCode from 'qrcode.react'

const QrCode = (props) => {

  return(
    <div className="qrCode">
      <QRCode
        value={props.userEmail}
        size={300}
        fgColor="#000000"
      />
    </div>

  )
}

export default QrCode;
