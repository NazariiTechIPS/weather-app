export interface IFormFields {
    city: string
}
export type IRefForm = ((cityName:string)=>void) |null;
