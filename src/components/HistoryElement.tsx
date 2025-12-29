import {memo, useEffect, useRef, useState} from "react";
import type {ICity} from "../types/ICity.ts";
import Button from "./Button.tsx";
import {FaTrash} from "react-icons/fa";
import {secondsUndoDeletion} from "../global.ts";
import type {IRefForm} from "../types/IRefForm.ts";

interface IHistoryElementProps {
    city: ICity
    deleteHistoryItem: (id: string) => void
    hideHistory: () => void
    formRef: React.RefObject<IRefForm>
}

function HistoryElement({city, deleteHistoryItem, hideHistory, formRef}: IHistoryElementProps) {
    const [storyState, setStoryState] = useState({isForDeletion: false, deletionProgress: 100})
    const timersIds = useRef<{ mainTimer: number | null, timerForProgress: number | null }>({
        mainTimer: null,
        timerForProgress: null,
    });

    const markForDeletion = () => {
        setStoryState(prev => {
            return {...prev, isForDeletion: true}
        })

        let elapsed = secondsUndoDeletion;
        timersIds.current.timerForProgress = setInterval(() => {
            elapsed -= 1000;
            setStoryState(prev => {
                return {...prev, deletionProgress: (elapsed / secondsUndoDeletion) * 100}
            })
        }, 1000);
        timersIds.current.mainTimer = setTimeout(() => {
            if (timersIds.current.timerForProgress) {
                clearInterval(timersIds.current.timerForProgress);
            }
            deleteHistoryItem(city.id)
        }, secondsUndoDeletion);
    }

    const cancelDeletion = () => {
        if (timersIds.current.mainTimer && timersIds.current.timerForProgress) {
            clearTimeout(timersIds.current.mainTimer);
            clearInterval(timersIds.current.timerForProgress);
            timersIds.current = {mainTimer: null, timerForProgress: null};
        }

        setStoryState({isForDeletion: false, deletionProgress: 100})
    }

    useEffect(() => {
        return () => {
            if (timersIds.current.mainTimer && timersIds.current.timerForProgress) {
                clearTimeout(timersIds.current.mainTimer);
                clearInterval(timersIds.current.timerForProgress);
            }
        }
    }, []);

    return (
        <li className="relative pt-1">
            {storyState.isForDeletion && <div style={{width: `${storyState.deletionProgress}%`}}
                                              className="absolute top-0 left-0 h-[1px] bg-red-400 transition-[width] duration-300"></div>}
            <div className="flex justify-between gap-5">
                <p className={`overflow-hidden whitespace-nowrap text-ellipsis ${storyState.isForDeletion ? "opacity-50 cursor-default" : "cursor-pointer"}`}
                   title={city.name} onClick={() => {
                    if (formRef.current && !storyState.isForDeletion) {
                        formRef.current(city.name);
                        hideHistory();
                        deleteHistoryItem(city.id);
                    }
                }}>
                    {city.name}
                </p>
                {storyState.isForDeletion ?
                    <Button className="mx-0" onClick={cancelDeletion}>Відмінити видалення</Button> :
                    <Button className="mx-0" onClick={markForDeletion}><FaTrash/></Button>}
            </div>
        </li>
    )
}

export default memo(HistoryElement);