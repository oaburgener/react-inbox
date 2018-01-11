import React from 'react'

const Message = ({message, toggleClass}) => {

const readClass = message.read ? 'read' : 'unread';
const selectedClass = message.selected ? 'selected' : ''
const starredClass = message.starred ? '' : '-o'
const checkedClass = message.selected ? 'checked' : ''


  return (

    <div className= {`row message ${readClass} ${selectedClass}`} onClick={()=>
      {toggleClass(message, 'read')}}>
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2" onClick={(event)=>{
            event.stopPropagation()
            toggleClass(message, 'selected')}}>
            <input type="checkbox" checked={`${checkedClass}`}/>
          </div>
          <div className="col-xs-2" onClick={(event) =>{
            event.stopPropagation()
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
        <a>
          {message.subject}
        </a>
      </div>
    </div>
  )
}

export default Message
