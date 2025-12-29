import {createContext} from "react";
import type {IHistoryContext} from "../types/IHistoryContext.ts";

const HistoryContext = createContext<IHistoryContext|null>(null)
export default HistoryContext;