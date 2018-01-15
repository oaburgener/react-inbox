import React from 'react'


const ComposeForm = ({clicked, gatherSubject, gatherBody, subject, bodyContent, request }) => {

  return (
    clicked ?

    (<div className='compose_form'>
    <form className="form-horizontal well">
      <div className="form-group">
        <div className="col-sm-8 col-sm-offset-2">
          <h4>Compose Message</h4>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="subject" className="col-sm-2 control-label">Subject</label>
        <div className="col-sm-8" onChange = {(event) => {gatherSubject(event)}}>
          <input type="text" className="form-control" id="subject" placeholder="Enter a subject" name="subject"/>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="body" className="col-sm-2 control-label">Body</label>
        <div className="col-sm-8" onChange = {(event) => {gatherBody(event)}}>
          <textarea name="body" id="body" className="form-control"></textarea>
        </div>
      </div>
      <div className="form-group">
        <div className="col-sm-8 col-sm-offset-2" onClick = {() => {
          const body = {
            "subject": subject,
            "body": bodyContent
          }
          request(body, 'POST')

        }}>
          <input type="submit" value="Send" className="btn btn-primary"/>
        </div>
      </div>
    </form>
  </div>):

  (<div></div>)

  )
}

export default ComposeForm
