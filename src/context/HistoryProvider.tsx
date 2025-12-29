import {memo, useCallback, useEffect, useState} from "react";
import HistoryContext from "./HistoryContext.ts";
import type {ICity} from "../types/ICity.ts";

interface IHistoryProviderProps {
    children: React.ReactElement;
}

const historyLocalStorageKey = "history";

function historyInitialization(): ICity[] {
    const historyFromStorage = localStorage.getItem(historyLocalStorageKey);

    if (!historyFromStorage) {
        return [];
    }

    return JSON.parse(historyFromStorage);
}

function HistoryProvider({children}: IHistoryProviderProps) {
    const [history, setHistory] = useState<ICity[]>(historyInitialization);

    const addNewHistory = useCallback((cityName: string) => {
        const newHistoryElement: ICity = {
            id: crypto.randomUUID(),
            name: cityName,
        }
        setHistory(prev => [...prev, newHistoryElement])
    }, []);

    const deleteHistoryItem = useCallback((id: string) => {
        setHistory(prev => prev.filter(item => item.id !== id));
    }, []);

    useEffect(() => {
        localStorage.setItem(historyLocalStorageKey, JSON.stringify(history));
    }, [history]);

    return (
        <HistoryContext value={{history, setHistory, addNewHistory, deleteHistoryItem}}>
            {children}
        </HistoryContext>
    )
}

export default memo(HistoryProvider);