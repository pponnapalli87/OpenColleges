import React from "react";

export default class DailyWeather extends React.Component {

    render() {
        const d = this.props;
        let icon = "wi wi-yahoo-" + d.code;
        
        return (
            <div id="day-1" class="day-slider-card">
                <span class="day-name">{d.day}</span>
                <span class="day-name">{d.date}</span>
                <i className={"wi wi-yahoo-" + d.tempC}></i>
                <span class="day-temp">{Math.ceil((d.high-32)*0.5556)}</span>
                <span class="day-temp">{Math.ceil((d.low-32)*0.5556)}</span>
                <span class="day-weat" title={d.weatherDescription}>{d.weatherTitle}</span>
            </div>
        );

    }
}