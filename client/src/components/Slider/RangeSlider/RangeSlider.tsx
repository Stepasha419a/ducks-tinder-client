import { DetailedHTMLProps, HTMLAttributes } from 'react'
import s from './RangeSlider.module.scss'

interface IRange{
    min: number 
    max: number
}

interface IRangeSlider{
    value: number | IRange | any
    setValue: (value: number | IRange) => void
    completeValue: () => void
    min: number
    max: number
    isMultiple?: boolean
    step?: number
}

const RangeSlider: React.FC<IRangeSlider> = ({value, setValue, completeValue, min, max, isMultiple = false, step = 1}) => {
    const style = isMultiple ? {
        '--min': min, 
        '--max': max, 
        '--value-a': value.min || 18, 
        '--value-b': value.max || 24, 
        '--suffix': "%"
    } : {
        '--min': min, 
        '--max': max, 
        '--value-a': value, 
        '--suffix': "%", 
    }

    const handleChange = (min: number, max: number) => {
        if(min + 2 < max) {
            setValue({min, max})
        }
    }

    return(
        <div>
            {isMultiple ? value.min && value.max &&
                <>
                    <div className={`${s.rangeSlider} ${s.flat}`} style={style as DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>}>
                        <input value={value.min} onChange={(e) => handleChange(+e.target.value, value.max)} onMouseUp={() => completeValue()} min={min} max={max} step={step} type="range" />
                        <input value={value.max} onChange={(e) => handleChange(value.min, +e.target.value)} onMouseUp={() => completeValue()} min={min} max={max} step={step} type="range" />
                        <div className={s.rangeSlider__progress}></div>
                    </div>
                </>
            :
                <div className={`${s.rangeSlider} ${s.flat}`} style={style as DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>}>
                    <input value={value as number} onChange={(e) => setValue(+e.target.value)} onMouseUp={() => completeValue()} min={min} max={max} step={step} type="range"/>
                    <div className={s.rangeSlider__progress}></div>
                </div>
            }
        </div>
    )
}

export default RangeSlider