import {EventEmitter} from "events";

import dispatcher from "../dispatcher/dispatcher";

class YahooWeatherStore extends EventEmitter {

    constructor() {
        super();
        this.defaultWeatherInfo={
            location: {
                city: "",
                country: ""
            },
            item: {
                condition: {
                    code: ""
                },
                forecast: [
                    {
                        city: "",
                        country: "",
                        low: "",
                        high: "",
                        text: ""
                    }
                ]
            },
            astronomy: {
                sunset: "",
                sunrise: ""
            },
            dt:Date.now()/1000
        };

        this.cityWeatherInfo = this.defaultWeatherInfo;
        
        this.cityWeatherWeekForecast = {};
        this.cityWeatherDayForecast = {};
    }

    getCityWeatherInfo() {
        return this.cityWeatherInfo;
    }

    getCityWeatherWeekForecast() {
        return this.cityWeatherWeekForecast;
    }

    getCityWeatherDayForecast() {
        return this.cityWeatherDayForecast;
    }

    handleActions(action) {
        switch (action.type) {
            case "WEATHER_ERROR": {
                this.cityWeatherInfo = this.defaultWeatherInfo;
                this.emit("change");
                break;
            }
            case "WEATHER_CITY_UPDATE":
            {
                this.cityWeatherInfo = action.cityWeatherInfo.query.results.channel;
                this.emit("change");
                break;
            }
            case "WEATHER_CITY_WEEK_FORECAST_UPDATE":
            {
                this.cityWeatherWeekForecast = action.cityWeatherWeekForecast.query.results.channel.item.forecast.length >0 ? action.cityWeatherWeekForecast.query.results.channel.item.forecast.slice(1,6): [];
                this.emit("change");
                break;
            }

            case "WEATHER_CITY_DAY_FORECAST_UPDATE":
            {
                this.cityWeatherDayForecast = action.cityWeatherDayForecast.list;
                this.emit("change");
                break;
            }
        }
    }

}

const yahooWeatherStore = new YahooWeatherStore;
dispatcher.register(yahooWeatherStore.handleActions.bind(yahooWeatherStore));

export default yahooWeatherStore;
