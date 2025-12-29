import type {IWeather} from "../types/IWeather.ts";
import type {TCoordinates} from "../types/TCoordinates.ts";
import {getCoordinates} from "./getCoordinates.ts";
import axiosWeather from "./axiosWeather.ts";

interface IAxiosParamsConfig {
    params: TCoordinates & { units: string, lang:string };
}

export async function getWeather(coordinates: TCoordinates): Promise<IWeather> {
    const config: IAxiosParamsConfig = {params: {...coordinates, units: "metric", lang:"uk"}};
    const response = await axiosWeather<IWeather>("/data/2.5/weather", config);

    return response.data;
}

export async function getWeatherByCity(city: string): Promise<IWeather> {
    const coordinates = await getCoordinates(city);
    return await getWeather(coordinates);
}