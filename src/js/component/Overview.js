import React from "react";
import TodayForecast from "./TodayForecast";
import WeekForecast from "./WeekForecast";
import YahooWeatherStore from "../store/YahooWeatherStore";
import * as WeatherAction from '../action/WeatherAction';

export default class Overview extends React.Component {

    constructor(props) {
        super(props);
        this.getCityWeatherInfo = this.getCityWeatherInfo.bind(this);
        this.state = {
            cityWeatherInfo: YahooWeatherStore.getCityWeatherInfo()
        };
        this.loadCityWeatherInfo();

    }

    componentWillMount() {
        YahooWeatherStore.on("change", this.getCityWeatherInfo);
    }

    componentWillReceiveProps(newProps) {
        const {cityName} =newProps.routeParams;

        if (this.cityName == cityName) return;
        this.cityName = cityName;

    }

    componentWillUnmount() {
        YahooWeatherStore.removeListener("change", this.getCityWeatherInfo);
        this.setState({
            cityWeatherInfo: {}
        });
    }

    loadCityWeatherInfo() {
        WeatherAction.searchCity();
    }

    changeToF(){
        var cityWeatherInfo =  YahooWeatherStore.getCityWeatherInfo();
    }

    getCityWeatherInfo() {

        this.setState({
            cityWeatherInfo: YahooWeatherStore.getCityWeatherInfo()
        });
    }

    render() {
        const w = this.state.cityWeatherInfo.item.forecast[0];
        const w1 = this.state.cityWeatherInfo.location;

        return (
            <main class="container overview flex-col justify-around align-center">
                <section id="today-forecast" class="flex-row justify-center align-center">
                    <TodayForecast city={w1.city} countryCode={w1.country} minTempC={w.low}
                                   maxTempC={w.high}
                                   date={w.date}
                                   day={w.day}
                                   currentWeatherDescription={w.text}
                                   code={w.code}
                                   currentWeatherTitle={w.text} />
                </section>
                <section>
                    <WeekForecast cityID={w.id} cityName={w.name}/>
                </section>
            </main>
        );
    }
}
