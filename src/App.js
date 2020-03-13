import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = { 
      data: {},
      city: '' 
    };
    
  }

    
  handleSubmit = (e) => {
    e.preventDefault();
    this.getApi();    
  }

  changeHandler = (e) => {
    this.setState({city: e.target.value})
  }

  getApi = async() => {
    const city = this.state.city;
    const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=05a4c77487211944ceff0c266384ab5b', {mode: 'cors'});
    const tempData = await response.json();
    this.setState({data: tempData})
    console.log(this.state.data)
    console.log(this.state.data.name)
    console.log(this.state.data.visibility)
    console.log(this.state.data.main.temp)    
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">       
          <form onSubmit={this.handleSubmit}>
            <input 
              type="text" 
              onChange={this.changeHandler}
            />
            <button type="submit">Search</button>
          </form>

        </header>
      </div>
    );
  } 
}

function RenderResult(props) {
  return(
    <div>
      {props.city}
      {props.tempC}
    </div>
  )
}

export default App;
