import React from 'react'
import {
  Route,
  Link
} from 'react-router-dom';
import Body from './Body'
let style = 'none'

const Message = ({message, toggleClass, request, pathId}) => {

const readClass = message.read ? 'read' : 'unread';
const selectedClass = message.selected ? 'selected' : ''
const starredClass = message.starred ? '' : '-o'
const checkedClass = message.selected ? 'checked' : ''

pathId = () => {
  if(style === 'none'){
    style = 'block'
  }else{
    style = 'none'
  }
}



  return (
    <div>
    <div className= {`row message ${readClass} ${selectedClass}`} onClick={()=>
      {
        const body = {
          "messageIds": [message.id],
          "command": "read",
          "read": !message.read
        }
        pathId()
        request(body, 'PATCH')
        toggleClass(message, 'read')}}>
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2" onClick={(event)=>{
            event.stopPropagation()
            toggleClass(message, 'selected')}}>
            <input type="checkbox" checked={`${checkedClass}`}/>
          </div>
          <div className="col-xs-2" onClick={(event) =>{
            event.stopPropagation()
            const body = {
              "messageIds": [message.id],
              "command": "star",
              "star": !message.starred
            }
            request(body, 'PATCH')
            toggleClass(message, 'starred')}}>
            <i className={`star fa fa-star${starredClass}`}></i>
          </div>
        </div>
      </div>
      <div className="col-xs-11">
        {message.labels.map(ele => {
          return <span className="label label-warning">{ele}</span>
        })}

        <span className="label label-warning"></span>
        <Link to={`/messages/${message.id}`}>
          {message.subject}
        </Link>
      </div>
    </div>
    <Route path={`/messages/${message.id}`} render={() => (
      <div>
        <Body messageId={message.id}/>
      </div>
    )}/>
  </div>

  )
}

export default Message
