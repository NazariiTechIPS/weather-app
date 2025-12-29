import type {ICoordinatesResponse} from "./ICoordinatesResponse.ts";

export type TCoordinates = Pick<ICoordinatesResponse, "lat" | "lon">