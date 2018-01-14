import React from 'react';
import Message from './Message'

const MessageList = ({messages, toggleClass, request}) => {
  return (
    <div>
      {messages.map(message => (<Message key={message.id} message={message} toggleClass = {toggleClass}
      request={request}/>))}
    </div>
  )
}

export default MessageList
