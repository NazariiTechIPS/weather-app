import axiosWeather from "./axiosWeather.ts";
import type {ICoordinatesResponse} from "../types/ICoordinatesResponse.ts";
import type {TCoordinates} from "../types/TCoordinates.ts";

interface IAxiosParamsConfig {
    q: string
}

export async function getCoordinates(city: string): Promise<TCoordinates> {
    const config:{params:IAxiosParamsConfig} = {params: {q: city}};
    const response = await axiosWeather<ICoordinatesResponse[]>(`/geo/1.0/direct`, config);
    const data = response.data;

    if(data.length === 0){
        throw new Error("City not found");
    }

    return {lat: data[0].lat, lon: data[0].lon}
}