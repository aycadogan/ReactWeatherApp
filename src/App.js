import React, {Component} from "react";
import axios from 'axios';
import WeatherDetails from './WeatherDetails'


class App extends Component{

  state = {
    temp: '',
    cityName: '',
    weather: '',
    high: '',
    low: '',
    icon: '',
    isRaining:'',
  }

  //this method will be called after a change in state or change in props
  componentDidUpdate(prevProps, prevState){
    console.log("The component was updated")
    if(this.state.weather !== prevState.weather){
      const isRaining = this.state.weather.includes("rain");
      if(isRaining){
        this.setState({
          isRaining: "Rain rain go away!"
        })
      }
    }
  }

  searchCity = (event) => {
    event.preventDefault();
    const city = document.querySelector('#city').value
    this.getCityWeather(city)
  }

  getCityWeather = (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_WEATHER_API}`;
    
    //native fetch
    //fetch(url).then(res => res.json()).then(result => console.log(result)).catch()

    //axios
    axios(url).then((response) => {
      this.setState({
        temp: response.data.main.temp,
        weather: response.data.weather[0].description,
        high: response.data.main.temp_max,
        low: response.data.main.temp_min,
        cityName: response.data.name,
        icon: response.data.weather[0].icon
      })
    })
  }

  render(){
    return (
      <div className="App">
        <h1>Weather App</h1>
        <div>
          <form onSubmit={this.searchCity}>
            <input type="text" name="city" id="city" placeholder="Enter a City Name"/>
          </form>
        </div>

        <h4>{this.state.isRaining}</h4>
        <hr />
        {this.state.cityName && <WeatherDetails 
          cityName={this.state.cityName}
          temp={this.state.temp}
          high={this.state.high}
          low={this.state.low}
          weather={this.state.icon}
          icon={this.state.icon}
        
        />}
      </div>
    );
  }
  
}

export default App;
