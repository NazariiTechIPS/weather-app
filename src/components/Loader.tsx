import {memo} from "react";
import {ThreeDots} from "react-loader-spinner";

function Loader(){
    return (
        <ThreeDots wrapperClass="block mx-auto" color="#fff" height="15px"></ThreeDots>
    )
}

export default memo(Loader);