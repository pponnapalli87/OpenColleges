import React from "react";
export default class TodayForecast extends React.Component {

    render() {
        const p = this.props;
        return (
                <div id="current" class="flex-col justify-around align-center">
                    <div class="location"><span class="city">{p.city}</span><span
                        class="country-code">{p.countryCode}</span></div>
                    <div><span class="city">{p.date}</span></div>
                     
                    <div id="today-temperature" class="flex-row justify-center align-center">
                        <i id="current-weather-icon" className={"wi wi-yahoo-" + p.code} />
                        <div class="flex-col justify-center align-center">
                            <span class="temp min ">{Math.ceil((p.minTempC-32)*0.5556)}</span><sub>min</sub>
                            <span class="temp ">{p.currentTempC}</span>
                            <span class="temp min ">{Math.ceil((p.maxTempC-32)*0.5556)}</span><sub>max</sub>
                        </div>
                    </div>
                    <div class="title"><span title={p.currentWeatherDescription}>{p.currentWeatherTitle}</span></div>
                </div>
        );
    }
}
