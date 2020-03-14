import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = { 
      data: {},
      city: '',
      tempC: '',
      tempF: '',
      errMsg: '' 
    };
  }
  getApi = async() => {
    try {
      this.setState({errMsg: ""}); 
      const city = this.state.city;
      const apiKey = '05a4c77487211944ceff0c266384ab5b';
      const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid='+apiKey, {mode: 'cors'});
      const tempData = await response.json();
      this.setState({data: tempData}); 
      this.convertToCelcius();  
      this.convertToFahrenheit();
    } catch(error) {
      this.setState({
        errMsg: "Enter a Valid City",
        tempC: '',
        tempF: ''
      }); 
      console.log(error)
      console.log(this.state.errMsg)
    }
    
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.getApi();
  }


  changeHandler = (e) => {
    this.setState({city: e.target.value})
  }


  convertToCelcius = () => {
    this.setState({tempC: Math.round((this.state.data.main.temp - 273.15)*100)/100+' °C' })
  }


  convertToFahrenheit = () => {
    this.setState({tempF: Math.round((this.state.data.main.temp*9/5-459.67)*100)/100+' °F'})
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
          {this.state.errMsg}
          <div className="Result">
            <RenderResult 
              city={this.state.data.name}
              tempC={this.state.tempC}
              tempF={this.state.tempF}/>
          </div>
        </header>
        
      </div>
    );
  } 
}


function RenderResult(props) {
  return(
    <div>
      <div>
        {props.city}
      </div>
      
      <div>
        {props.tempC}
      </div>
      <div>
        {props.tempF}
      </div>
    </div>
  )
}



export default App;
