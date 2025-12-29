import {type ButtonHTMLAttributes, memo, type ReactNode} from "react";
import {twMerge} from "tailwind-merge";

type TButtonProps = {
    children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

function Button({children,...args}:TButtonProps){
    return (
        <button {...args} className={twMerge("block w-fit mx-auto px-2.5 py-1 text-base border border-gray-300 rounded outline-none cursor-pointer disabled:opacity-50 disabled:cursor-default",args.className)}>{children}</button>
    )
}

export default memo(Button);