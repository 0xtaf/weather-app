import React, { Component } from 'react';
import { SemipolarLoading } from 'react-loadingg';
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
      cond: '',
      src: '',
      loading: false
    };
  }
  getApi = async() => {
    try {
      this.setState({
        errMsg: '',
        src: '',
        loading: true 
      }); 
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
        src: response.data.images.original.url,
        loading: false
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
    const showLoading = {
      display: 'block'
    }
    const dontShowLoading = {
      display: 'none'
    }
    return (
      <div className="App">
        <header className="App-header">     
          <form 
            onSubmit={this.handleSubmit}
            className='form'>
            <label className="inp">
              <input 
                type="text" 
                placeholder='city'
                onChange={this.changeHandler}
              />
            </label>
            <button className='fa fa-search' type="submit"></button>
          </form>
          {this.state.errMsg}
          <div className="Result">
            <RenderResult 
              city={this.state.data.name}
              tempC={this.state.tempC}
              tempF={this.state.tempF}/>
          </div>
        </header>
        <SemipolarLoading className='loading' style={(this.state.loading) ? showLoading : dontShowLoading}/>
        <RenderGif src={this.state.src} />
      </div>
    );
  } 
}


function RenderResult(props) {
  return(
    <div>
      <div className="Result-City">
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
