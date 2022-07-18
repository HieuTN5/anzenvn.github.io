import React, { useState, useEffect } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';
// import

const SignalRComponent = () => {
  const [connection, setConnection] = useState(null);
  useEffect(() => {
    const connect = new HubConnectionBuilder()
      .withUrl(ETHRATING_API)
      .withAutomaticReconnect()
      .build();

    setConnection(connect);
  }, []);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          connection.on('ReceiveMessage', (message) => {
            // notification.open({
            //   message: "New Notification",
            //   description: message,
            // });
            console.log('message: ', message);
          });
        })
        .catch((error) => console.log(error));
    }
  }, [connection]);

  return <div></div>;
};

export default SignalRComponent;
