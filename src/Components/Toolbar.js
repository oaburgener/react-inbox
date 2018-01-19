import React from 'react'
import { Link } from 'react-router-dom'


const Toolbar = ({messages, selectAll, allSelectedCheck, someSelectedCheck, markUnread, markRead,
  deleteMessage, addingLabels, removeLabels, countUnread, disableToolbar, request, persistLabels, persistLabelsRemove,
  persistDeleted, showCompose, hideCompose, clicked, path}) => {

let buttonCheck = ''
if(allSelectedCheck()){
  buttonCheck = 'check-'
}else if(someSelectedCheck()){
  buttonCheck = 'minus-'
}else{
  buttonCheck = ''
}

countUnread = () => {
  const unreadArray = messages.filter(message => message.read === false)
  let unreadNumber = unreadArray.length
  return unreadNumber
}


disableToolbar = () => {
  let disabled = ""
  const disableArray = messages.filter(message => message.selected)
  if(disableArray.length === 0){
    disabled = "disabled"
  }else{
    disabled = ""
  }
  return disabled
}


persistLabels = (messages, event) => {
  const body = {
    "messageIds": [],
    "command": "addLabel",
    "label": ''
  }
const newMessages = messages.map(message => {
  if(message.selected === true){
    body.messageIds.push(message.id)
    body.label.push(event.target.value)
  }})
  request(body, 'PATCH')
  addingLabels(messages, event.target.value)
}


persistLabelsRemove = (messages, event) => {
  console.log('hello!');
  const body = {
    "messageIds": [],
    "command": "removeLabel",
    "label": ''
  }
const newMessages = messages.map(message => {
  console.log(message);
  if(message.selected === true){
    body.messageIds.push(message.id)
    body.label = event.target.value
  }return body})
  request(body, 'PATCH')
  removeLabels(messages, event.target.value)
}


persistDeleted = (messages) => {
  const body = {
    "messageIds": [],
    "command": "delete"
  }
  const newMessages = messages.map(message => {
    if(message.selected === true){
      body.messageIds.push(message.id)
    }
  })
  request(body, 'PATCH')
  deleteMessage(messages)
}


  return (
  <div className="row toolbar">
    <div className="col-md-12">
      <p className="pull-right">
        <span className="badge badge">{`${countUnread()}`}</span>
        unread messages
      </p>


      <Link to={`${path}`} className="btn btn-danger" onClick = {() => {showCompose()}}>
        <i className="fa fa-plus"></i>
      </Link>


      <button className="btn btn-default" onClick = {() => {selectAll(messages)}}>
        <i className={`fa fa-${buttonCheck}square-o`}></i>
      </button>

      <button className="btn btn-default" disabled={`${disableToolbar()}`} onClick = {() => {markRead(messages)}}>
        Mark As Read
      </button>

      <button className="btn btn-default" disabled={`${disableToolbar()}`} onClick = {() => {markUnread(messages)}}>
        Mark As Unread
      </button>

      <select className="form-control label-select" disabled={`${disableToolbar()}`} onChange = {(event) => {persistLabels(messages, event)}}>
        <option>Apply label</option>
        <option value="dev">dev</option>
        <option value="personal">personal</option>
        <option value="gschool">gschool</option>
      </select>

      <select className="form-control label-select" disabled={`${disableToolbar()}`} onChange = {(event) => {persistLabelsRemove(messages, event)}}>
        <option>Remove label</option>
        <option value="dev">dev</option>
        <option value="personal">personal</option>
        <option value="gschool">gschool</option>
      </select>

      <button className='btn btn-default' disabled={`${disableToolbar()}`} onClick = {() => {persistDeleted(messages)}}>
        <i className="fa fa-trash-o"></i>
      </button>
    </div>
  </div>
  )
}

export default Toolbar;
