import dispatcher from "../dispatcher/dispatcher";
import $ from 'jquery';

export function loadWeekForecast() {

    this.loadWeekForecastReq = $.getJSON("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22nome%2C%20syd%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys", function (cityWeatherWeekForecast) {
        dispatcher.dispatch({type: "WEATHER_CITY_WEEK_FORECAST_UPDATE", cityWeatherWeekForecast});
    }.bind(this), function (err) {
        dispatcher.dispatch({
            type: "WEATHER_ERROR",
            message: "Failed to load week forecast"
        });
    }.bind(this));


}

export function searchCity() {
        if (this.searchCityReq) this.searchCityReq.abort();

        this.searchCityReq = $.getJSON("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22nome%2C%20syd%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys", function (cityWeatherInfo) {
            if (cityWeatherInfo.query.results.channel) {
                dispatcher.dispatch({type: "WEATHER_CITY_UPDATE", cityWeatherInfo});
            } else {
                dispatcher.dispatch({type: "WEATHER_ERROR", message: "Failed to find city"});
            }
        }.bind(this), function (err) {
            dispatcher.dispatch({
                type: "WEATHER_ERROR",
                message: "Failed to load weather info"
            });
        }.bind(this));

}
