import type {ICity} from "./ICity.ts";

export interface IHistoryContext {
    history: ICity[]
    setHistory: React.Dispatch<React.SetStateAction<ICity[]>>
    addNewHistory: (city: string) => void
    deleteHistoryItem: (id: string) => void
}