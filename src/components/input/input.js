import React, { useState } from 'react';

const Input = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const onChange = (e) => {
    setMessage(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (message.trim() !== '') {
      onSendMessage(message);
      setMessage('');
    } else {
      alert('Please enter a message.');
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        onChange={onChange}
        value={message}
        type="text"
        placeholder="Enter your message and press ENTER"
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default Input;
