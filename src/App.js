import React, { useState } from 'react';
import Chat from './components/chat/chat';
import Login from './components/login/login';
import './App.css';

const App = () => {
  const [loggedin, setLoggedin] = useState(false);
  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState('👨');
  const [drone, setDrone] = useState(null);
  const [member, setMember] = useState('');

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const onChangeAvatar = (e) => {
    setAvatar(e.target.value);
  };

  const onLogin = () => {
    if (username) {
      const drone = new window.Scaledrone('MW8QOqnnolgZmmNk', {
        data: { username, avatar },
      });

      console.log(drone);
      drone.on('open', (error) => {
        if (error) {
          return console.error(error);
        }

        setDrone(drone);
        setMember({
          id: drone.clientId,
          username,
          avatar,
        });
        setLoggedin(true);
      });
    }
  };

  return (
    loggedin ? (
      <Chat drone={drone} member={member} />
    ) : (
      <Login
        username={username}
        avatar={avatar}
        changeUsername={onChangeUsername}
        changeAvatar={onChangeAvatar}
        onLogin={onLogin}
      />
    )
  );
};

export default App;
