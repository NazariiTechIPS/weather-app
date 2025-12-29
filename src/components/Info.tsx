import {memo, useState} from "react";
import type {IWeather} from "../types/IWeather.ts";
import Button from "./Button.tsx";

interface IInfoProps {
    cityWeather: IWeather
}

function Info({cityWeather}: IInfoProps) {
    const [isOpen, setIsOpen] = useState(false)

    const minTemp = Math.floor(cityWeather.main.temp_min);
    const maxTemp = Math.ceil(cityWeather.main.temp_max);
    const windSpeed = (cityWeather.wind.speed * 3.6).toFixed(1);

    return (
        <div className="flex flex-col gap-5">
            <div>Температура: {Math.round(cityWeather.main.temp)}°C</div>
            <div className="flex justify-center gap-8">
                <div className="flex flex-col items-center text-center">Мінімальна температура: <p>{minTemp}°C</p>
                </div>
                <div className="flex flex-col items-center text-center">Максимальна температура: <p>{maxTemp}°C</p>
                </div>
            </div>
            <div>Опис погоди: {cityWeather.weather[0].description}</div>
            <div>Швидкість вітру: {windSpeed}км/год</div>
            <Button onClick={()=>setIsOpen(!isOpen)}>{isOpen? "Закрити" : "Відкрити"}</Button>
            {isOpen && <div>
                <div>Координати: {cityWeather.coord.lat}N {cityWeather.coord.lon}E</div>
            </div>}
        </div>
    )
}

export default memo(Info);