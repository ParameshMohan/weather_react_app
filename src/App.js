import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import 'weather-icons/css/weather-icons.css';
import Weather from './app_component/weather.component';
import Form from './app_component/form';

//api call api.openweathermap.org/data/2.5/weather?q=London,uk&appid={API key}
const API_key = "692f156a8e1ef36dd2e6b7068924268f"


class App  extends  React.Component{
  constructor() {
    super();
    this.state = {
      city:undefined,
      country:undefined,
      icons:undefined,
      main:undefined,
      celsius:undefined,
      temp_max:undefined,
      temp_min:undefined,
      description:"",
      error: false,

      form_city:"",
      form_country:""
    }
    
    this.weatherIcon={
      Thunderstorm:"wi-thunderstorm",
      Drizzle:"wi-sleet",
      Rain:"wi-storm-showers",
      Snow:"wi-snow",
      Atmosphere:"wi-fog",
      Clear:"wi-day-sunny",
      Clouds:"wi-day-fog"

    }
  }

  calCelsius(temp){
    let cell = Math.floor(temp - 273.15)
    return cell;
  }

  get_WeatherIcon(icons,rangeId){
    switch(true){
      case rangeId >= 200 && rangeId <= 232 :
        this.setState({icons:this.weatherIcon.Thunderstorm })
        break;

      case rangeId >= 300 && rangeId <= 321 :
          this.setState({icons:this.weatherIcon.Drizzle })
          break;
          
      case rangeId >= 300 && rangeId <= 321 :
            this.setState({icons:this.weatherIcon.Drizzle })
            break;
      case rangeId >= 600 && rangeId <= 622 :
        this.setState({icons:this.weatherIcon.Snow })
        break;

      case rangeId >= 701 && rangeId <= 781 :
          this.setState({icons:this.weatherIcon.Atmosphere })
          break;

      case rangeId === 800 :
            this.setState({icons:this.weatherIcon.Clear })
            break;

       case rangeId >= 801 && rangeId <= 804 :
              this.setState({icons:this.weatherIcon.Clouds })
              break;

              default:
                this.setState({icons:this.weatherIcon.Clouds })
    }
  }
getWeather = async(e) =>{
  e.preventDefault();
  console.log("e",e.target)
  const city =e.target.elements.city.value
  const country =e.target.elements.country.value

  console.log("city",city + "country",country )

  if(city && country ){
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_key}`)

    const response = await api_call.json(); // this is going to convert all the data in json
  console.log("response",response) 
  
  this.setState({
    city:`${response.name},${response.sys.country}`,
    celsius : this.calCelsius(response.main.temp),
    temp_min: this.calCelsius(response.main.temp_min) ,
    temp_max: this.calCelsius(response.main.temp_max) ,
    description:response.weather[0].description,
    
  })
  
  this.get_WeatherIcon(this.weatherIcon,response.weather[0].id)
  }else{
    this.setState({error: true})
  }
  
}
  render(){

   
    return(
      <div className="App">
        <Form
        loadWeather={this.getWeather}
        error={this.state.error}
        celsius={this.state.celsius}
        form_city={this.state.form_city}
        setCity = { (e) => {
          this.setState({form_city:e?.target?.value})}}
          
        form_country={this.state.form_country}
        setCountry ={(e) => this.setState({form_country:e.target.value})}
        />
      <Weather
      city={this.state.city}
      country={this.state.country}
    celsius={this.state.celsius}
      temp_min={this.state.temp_min}
      temp_max={this.state.temp_max}
      description={this.state.description}
      weatherIcon={this.state.icons}
      />
      </div>
    );
  }
}


export default App;
