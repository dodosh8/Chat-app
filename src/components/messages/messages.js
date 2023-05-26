import React from "react";

function Messages(props) {
  
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [props.messages]);

  const renderMessage = (message, index) => {
    const { member, text, timestamp } = message;

    const messageFromMe = (member || {}).id === (props.currentMember || {}).id;
    const className = messageFromMe ? "messages-message currentMember" : "messages-message";

    if (!member || !props.currentMember) {
      return null;
    }

    return (
      <li className={className} key={index}>
        <span className="avatar">{member.clientData.avatar}</span>
        <div className="message-content">
          <div className="username">
            {member.clientData.username}
          </div>
          <div className="text">{text}
            <span className="timestamp">{new Date(timestamp).toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' })}</span>
          </div>
        </div>
      </li>
    );
  }

  return (
    <ul className="messages-list">
      {props.messages.map((m, i) => renderMessage(m, i))}
    <div ref={messagesEndRef} />
    </ul>
  );
}

export default Messages;
