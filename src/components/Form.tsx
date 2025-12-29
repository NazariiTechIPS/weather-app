import {memo, useState} from "react";
import {useForm} from "react-hook-form";
import {twMerge} from "tailwind-merge";
import type {IWeather} from "../types/IWeather.ts";
import {getWeatherByCity} from "../utilities/getWeatherByCity.ts";
import Button from "./Button.tsx";
import Loader from "./Loader.tsx";
import useHistory from "../context/useHistory.ts";
import type {IFormFields, IRefForm} from "../types/IRefForm.ts";

interface IFormProps {
    isWeatherOfCity: boolean
    className?: string
    setCityWeather: React.Dispatch<React.SetStateAction<IWeather | null>>
    formRef: React.RefObject<IRefForm>
}

function Form({isWeatherOfCity, setCityWeather, className, formRef}: IFormProps) {
    const {addNewHistory} = useHistory();
    const [isSubmitting, setIsSubmitting] = useState(false)
    const {register, formState: {errors}, handleSubmit, setError, setValue} = useForm<IFormFields>();

    function onSubmit(data: IFormFields): void {
        (async function () {
            if (isWeatherOfCity) {
                setCityWeather(null);
            }

            try {
                setIsSubmitting(true);
                const result = await getWeatherByCity(data.city);
                addNewHistory(data.city);
                setCityWeather(result);
            } catch (e) {
                if (e instanceof Error && e.message === "Network Error") {
                    setError("city", {
                        type: "Network error",
                        message: "Проблема з підключенням до мережі. Перевіртре своє зʼєднання"
                    });
                } else {
                    setError("city", {type: "Invalid city", message: "Місто не знайдено"});
                }
            } finally {
                setIsSubmitting(false);
            }
        })()
    }

    formRef.current = (cityName: string): void => {
        setValue("city", cityName);
        handleSubmit(onSubmit)();
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={twMerge("flex flex-col gap-4 mb-5", className)}
              autoComplete="off">
            <input type="text" {...register("city", {
                required: "Потрібно заповнити поле",
                pattern: {
                    value: /^[A-Za-zА-Яа-яІіЇїЄєҐґ]+(?:[ -][A-Za-zА-Яа-яІіЇїЄєҐґ]+)*$/,
                    message: "Поле може містити тільки англ/укр літери та один пробіл/тере між словами"
                }
            })} placeholder="Введіть місто"
                   className="px-2.5 py-1 border border-gray-300 rounded outline-none text-center"/>
            {errors.city && <p className="text-sm text-center font-bold text-red-400">{errors.city.message}</p>}
            <Button type="submit" disabled={isSubmitting} className={isSubmitting ? "mb-3" : ""}>Надіслати</Button>
            {isSubmitting && <Loader/>}
        </form>
    )
}

export default memo(Form);