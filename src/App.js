import React, { Component } from 'react';
import './App.css';
import MessageList from './Components/MessageList';
import Toolbar from './Components/Toolbar';
import Navbar from './Components/Navbar'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      messages: this.props.messages
    }
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

  toggleClass = (message, objectKey) => {
    const index = this.state.messages.indexOf(message);
    let newMessages = this.state.messages.slice(0);
    newMessages[index][objectKey] = !newMessages[index][objectKey];
    this.setState({messages:newMessages})
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
      if(message.selected === true){
        message.labels.splice(message.labels.indexOf(labelName),1)
      }
    })
    this.setState({messages:newMessages})
  }

  render() {

    return (
      <div className="App">
        <Navbar />

        <div className='container'>
          <Toolbar messages={this.state.messages} selectAll = {this.selectAll}
            allSelectedCheck = {this.allSelectedCheck} someSelectedCheck = {this.someSelectedCheck}
          markUnread = {this.markUnread} markRead = {this.markRead} deleteMessage = {this.deleteMessage}
          addingLabels = {this.addingLabels} removeLabels = {this.removeLabels}/>
          <MessageList messages={this.state.messages} toggleClass={this.toggleClass}/>
        </div>

      </div>
    );
  }
}

export default App;
