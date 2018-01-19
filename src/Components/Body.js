import React, { Component } from 'react';



class Body extends Component {

  async componentDidMount() {
    const response = await fetch(`http://localhost:8082/api/messages/${this.props.messageId}`)
    const json = await response.json()
    this.setState({body: json.body})
  }

  constructor(props){
    super(props)
    this.state = {
      body: ''
    }
  }
  render () {

    return (

      <div className="row message-body">
        <div className="col-xs-11 col-xs-offset-1">
          {this.state.body}
        </div>
      </div>
    )

  }
}

export default Body
