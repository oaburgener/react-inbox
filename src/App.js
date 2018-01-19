import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import './App.css';
import MessageList from './Components/MessageList';
import Toolbar from './Components/Toolbar';
import Navbar from './Components/Navbar'
import ComposeForm from './Components/ComposeForm'
import Body from './Components/Body'


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      messages: [],
      clicked: true,
      path: '',
      subject: '',
      bodyContent: ''
    }
  }
  async componentDidMount() {
   const response = await fetch('http://localhost:8082/api/messages')
   const json = await response.json()
   this.setState({messages: json._embedded.messages})
 }

 async request (body, method) {
    await fetch('http://localhost:8082/api/messages', {
     method: method,
     body: JSON.stringify(body),
     headers: {
       'Content-Type': 'application/json',
       'Accept': 'application/json',
     }
   })
 }

 toggleClass = (message, objectKey) => {
   const index = this.state.messages.indexOf(message);
   let newMessages = this.state.messages.slice(0);
   newMessages[index][objectKey] = !newMessages[index][objectKey];
   this.setState({messages:newMessages})
 }

  selectAll = (messages) => {
    let newMessages = this.state.messages.slice(0);
    const messageArray = messages.filter(message => message.selected)
    if(messageArray.length < newMessages.length){
      for(let i = 0; i < newMessages.length; i++){
        newMessages[i].selected = true
      }
    }else if (messageArray.length === newMessages.length){
      for(let i = 0; i < newMessages.length; i++){
        newMessages[i].selected = false
      }
    }
    this.setState({messages:newMessages})
  }

  allSelectedCheck = () => {
    const messageArray = this.state.messages.filter(message => message.selected)
    if(messageArray.length === this.state.messages.length){
      return true
    }
  }
  someSelectedCheck = () => {
    const messageArray = this.state.messages.filter(message => message.selected)
    if( messageArray.length < this.state.messages.length && messageArray.length > 0){
      return true
    }
  }


  markUnread = (messages) => {
    const messageArray = this.state.messages.map(message => {
      if(message.selected===true){
      message.read = false
    }
    return message
    })

    this.setState({messages:messageArray})
  }

  markRead = (messages) => {
    const messageArray = this.state.messages.map(message => {
      if(message.selected===true){
        message.read = true
    }
    return message
    })
    this.setState({messages:messageArray})
  }

  deleteMessage = (messages) => {
    const result = this.state.messages.filter(message => message.selected !== true)
      this.setState({messages:result})
  }

  addingLabels = (messages, labelName) => {
    let newMessages = this.state.messages.slice(0);
    newMessages.forEach(message => {
      if(message.selected === true && message.labels.includes(labelName)){
        return
      }else if (message.selected === true){
        message.labels = [...message.labels, labelName]
      }
    })
    this.setState({messages:newMessages})
  }

  removeLabels = (message, labelName) => {
    let newMessages = this.state.messages.slice(0);
    newMessages.forEach(message => {
      if(message.selected === true && message.labels.includes(labelName)){
        return
      }else if (message.selected === true){
        message.labels.splice(message.labels.indexOf(labelName),1)
        this.setState({messages:newMessages})
      }
    })
  }

  showCompose = () => {
    let composeClicked = this.state.clicked
    let path = this.state.path
    composeClicked = !composeClicked
    if(composeClicked === true){
      path = '/'
    }else{
      path = '/compose'
    }
    this.setState({clicked: composeClicked, path: path})
  }

  gatherSubject = (event) => {
    let subject = event.target.value
    this.setState({subject: subject})
    console.log(this.state);

  }

  gatherBody = (event) => {
    let bodyContent = event.target.value
    this.setState({bodyContent: bodyContent})
    console.log(this.state);
  }


  render() {

    return (
      <Router>
      <div className="App">
        <Navbar />

        <div className='container'>

          <Route exact path = "/compose" render={() => (
            <div>
              <ComposeForm clicked = {this.state.clicked} gatherSubject = {this.gatherSubject} gatherBody = {this.gatherBody}
                subject = {this.state.subject} bodyContent = {this.state.bodyContent} request = {this.request}/>
            </div>
          )}/>

          <Route path ="/" render={() => (
            <div>
              <Toolbar messages={this.state.messages} selectAll = {this.selectAll}
                allSelectedCheck = {this.allSelectedCheck} someSelectedCheck = {this.someSelectedCheck}
                markUnread = {this.markUnread} markRead = {this.markRead} deleteMessage = {this.deleteMessage}
                addingLabels = {this.addingLabels} removeLabels = {this.removeLabels} request = {this.request}
                persistLabels = {this.persistLabels} persistLabelsRemove = {this.persistLabelsRemove}
                persistDeleted ={this.persistDeleted} showCompose = {this.showCompose} hideCompose = {this.hideCompose}
                clicked = {this.state.clicked} path = {this.state.path}/>
              <MessageList messages={this.state.messages} toggleClass={this.toggleClass} request={this.request}/>
            </div>
          )}/>

        </div>

      </div>
    </Router>
    );
  }
}

export default App;
