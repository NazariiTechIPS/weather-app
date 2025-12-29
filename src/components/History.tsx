import {memo, type ReactNode} from "react";
import Modal from "./Modal.tsx";
import useHistory from "../context/useHistory.ts";
import HistoryElement from "./HistoryElement.tsx";
import type {IRefForm} from "../types/IRefForm.ts";

interface IHistoryProps {
    hideHistory: () => void
    formRef: React.RefObject<IRefForm>
}

function History({hideHistory,formRef}: IHistoryProps) {
    const {history,deleteHistoryItem} = useHistory();

    let historyList:ReactNode|null = null;
    if(history.length){
        historyList = <ul className="flex flex-col gap-2.5">
            {history.map(item=><HistoryElement key={item.id} city={item} deleteHistoryItem={deleteHistoryItem} hideHistory={hideHistory} formRef={formRef}/>)}
        </ul>
    }

    return (
        <Modal onClick={hideHistory}>
            {history.length === 0 && <h2 className="text-center text-white/80">Записи відсутні</h2>}
            {historyList}
        </Modal>
    )
}

export default memo(History);