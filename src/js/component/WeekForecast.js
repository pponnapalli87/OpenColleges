import React from "react";
import DailyWeather from './DailyWeather';
import YahooWeatherStore from "../store/YahooWeatherStore";
import * as WeatherAction from '../action/WeatherAction';

export default class WeekForecast extends React.Component {

    constructor(){
        super();
        this.getWeekForecast = this.getWeekForecast.bind(this);
        this.state={
            cityWeatherWeekForecast:YahooWeatherStore.getCityWeatherWeekForecast()
        };
    }

    getWeekForecast(){
        this.setState({cityWeatherWeekForecast:YahooWeatherStore.getCityWeatherWeekForecast()});
    }

    loadCityWeatherWeekForecast(){
        WeatherAction.loadWeekForecast();
    }

    componentDidMount(){
        this.loadCityWeatherWeekForecast();
        this.getWeekForecast();
    }

    componentWillMount() {
        YahooWeatherStore.on("change", this.getWeekForecast);
    }
    componentWillUnmount() {
        YahooWeatherStore.removeListener("change", this.getWeekForecast);
    }

    render() {
        
        if (!this.state.cityWeatherWeekForecast||!this.state.cityWeatherWeekForecast.length){
            return (
                <div></div>
            );
        }

        const weekForecast=this.state.cityWeatherWeekForecast.map((d,i)=> {
            return <DailyWeather day={d.date} date={d.day} tempC={d.code} weatherDescription={d.text} weatherTitle={d.text} high={d.high} low={d.low} key={i}  />
        });

        return (
            <div id="day-slider" class="flex-row justify-center align-center">
                {weekForecast}
            </div>
        );
    }
}