import type {IHistoryContext} from "../types/IHistoryContext.ts";
import {useContext} from "react";
import HistoryContext from "./HistoryContext.ts";

export default function useHistory():IHistoryContext{
    const contextValue = useContext(HistoryContext);

    if(!contextValue){
       throw new Error(`History context contain: ${contextValue}`);
    }

    return contextValue;
}