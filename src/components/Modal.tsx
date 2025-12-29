import {memo} from "react";
import Button from "./Button.tsx";

interface IModalProps {
    children: React.ReactNode;
    onClick: () => void
}

function Modal({children, onClick}: IModalProps) {
    return (
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center p-5 bg-black/80">
            <div className="flex flex-col w-full max-w-2xl max-h-[300px] p-2.5 bg-gray-500 rounded">
                <Button className="mr-0 mb-5 px-2 text-xl leading-none" onClick={onClick}>x</Button>
                <div className="overflow-auto py-1">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default memo(Modal);