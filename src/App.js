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
      errMsg: '',
      cond: 'cloudy',
      src: '' 
    };
  }
  getApi = async() => {
    try {
      this.setState({errMsg: ''}); 
      const city = this.state.city;
      const apiKey = '05a4c77487211944ceff0c266384ab5b';
      const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid='+apiKey, {mode: 'cors'});
      const tempData = await response.json();
      if (tempData.cod === 200){
        this.setState({data: tempData});
        this.convertToCelcius();  
        this.convertToFahrenheit();
        this.getGifApi();
      } else if (tempData.cod === '400') {
        this.setState({
          errMsg: "Server is not responding"
        })
      } else if (tempData.cod === '404') {
        this.setState({
          errMsg: "Enter a Valid City"
        })
      }
    } 
    catch(error) {     
        console.log(error)
        console.log(this.state.errMsg)    
    }    
  }

  getGifApi = async() => {
    const apiKeyGif = 'U6J6myaHj9i1c2TPzRYhM2DTRpmIrftw';
    const condition = this.state.data.weather[0].main;
    fetch('https://api.giphy.com/v1/gifs/translate?api_key='+apiKeyGif+'&s='+condition, {mode: 'cors'})
    .then((response) => {
      return (response.json());
    })
    .then((response) => {
      this.setState({
        src: response.data.images.original.url
      })
    })
    .catch((error) => {
      console.log(error)
    })
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
        <RenderGif src={this.state.src}/>
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

function RenderGif(props) {
  return(
    <div>
      <img className='img' src={props.src} alt=''/>
    </div>
  )
}

export default App;
