import React, { useState, useEffect } from 'react';
import Messages from "../messages/messages";
import Input from '../input/input';

const Chat = (props) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const room = props.drone.subscribe("observable-chat-app");
    room.on('data', (data, member) => {
      const newMessages = [...messages, { member, text: data.text, timestamp: data.timestamp }];
      setMessages(newMessages);
    });

  }, [messages, props.drone]);

  const onSendMessage = (message) => {
    props.drone.publish({
      room: "observable-chat-app",
      message: {
        text: message,
        timestamp: Date.now(),
      },
    });
  };


  return (
    <div className="chat">
      <div className="chat-header">
        <h1>Welcome to chat, {props.member.username}</h1>
      </div>
      <Messages
        messages={messages}
        currentMember={props.member}
      />
      <Input
        onSendMessage={onSendMessage}
      />
    </div>
  );
}

export default Chat;
