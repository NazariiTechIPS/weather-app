import {useCallback, useRef, useState} from "react";
import type {IWeather} from "./types/IWeather.ts";
import Form from "./components/Form.tsx";
import Info from "./components/Info.tsx";
import Button from "./components/Button.tsx";
import History from "./components/History.tsx";
import type {IRefForm} from "./types/IRefForm.ts";

function App() {
    const [cityWeather, setCityWeather] = useState<IWeather | null>(null);
    const [historyIsVisible, setHistoryIsVisible] = useState(false);
    const formRef = useRef<IRefForm>(null);

    const showHistory = useCallback(() => {
        setHistoryIsVisible(true);
    }, []);

    const hideHistory = useCallback(() => {
        setHistoryIsVisible(false);
    }, []);

    return (
        <>
            <div className="max-w-2xl mx-auto">
                <Button className="mr-0 mb-5" onClick={showHistory}>Історія пошуку</Button>
                <Form isWeatherOfCity={!!cityWeather} setCityWeather={setCityWeather} formRef={formRef}/>
                {cityWeather && <Info cityWeather={cityWeather} key={cityWeather.name}/>}
                {historyIsVisible && <History hideHistory={hideHistory} formRef={formRef}/>}
            </div>
        </>
    )
}

export default App