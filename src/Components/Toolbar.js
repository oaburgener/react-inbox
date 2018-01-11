import React from 'react'


const Toolbar = ({messages, selectAll, allSelectedCheck, someSelectedCheck, markUnread, markRead,
  deleteMessage, addingLabels, removeLabels, countUnread, disableToolbar}) => {

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


  return (
  <div className="row toolbar">
    <div className="col-md-12">
      <p className="pull-right">
        <span className="badge badge">{`${countUnread()}`}</span>
        unread messages
      </p>

      <button className="btn btn-default" onClick = {() => {selectAll(messages)}}>
        <i className={`fa fa-${buttonCheck}square-o`}></i>
      </button>

      <button className="btn btn-default" disabled={`${disableToolbar()}`} onClick = {() => {markRead(messages)}}>
        Mark As Read
      </button>

      <button className="btn btn-default" disabled={`${disableToolbar()}`} onClick = {() => {markUnread(messages)}}>
        Mark As Unread
      </button>

      <select className="form-control label-select" disabled={`${disableToolbar()}`} onChange = {(event) => {addingLabels(messages, event.target.value)}}>
        <option>Apply label</option>
        <option value="dev">dev</option>
        <option value="personal">personal</option>
        <option value="gschool">gschool</option>
      </select>

      <select className="form-control label-select" disabled={`${disableToolbar()}`} onChange = {(event) => {removeLabels(messages, event.target.value)}}>
        <option>Remove label</option>
        <option value="dev">dev</option>
        <option value="personal">personal</option>
        <option value="gschool">gschool</option>
      </select>

      <button className='btn btn-default' disabled={`${disableToolbar()}`} onClick = {() => {deleteMessage(messages)}}>
        <i className="fa fa-trash-o"></i>
      </button>
    </div>
  </div>
  )
}

export default Toolbar;
