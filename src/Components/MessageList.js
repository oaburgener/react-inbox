import React from 'react';
import Message from './Message'
import Body from './Body'

const MessageList = ({messages, toggleClass, request, pathId}) => {
  return (
    <div>
      {messages.map(message => (<Message key={message.id} message={message} toggleClass = {toggleClass}
      request={request} pathId ={pathId}/>))}
    </div>
  )
}

export default MessageList
