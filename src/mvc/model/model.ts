import createStore from '../../redux/createStore';
import reducer from '../../redux/reducer';
import { loadFirstData,
    changeMin,
    changeMax,
    changeValueFirst,
    changeValueSecond,
    disableRunnersValues,
    toggleVerticalPosition,
    enableOneRunner,
    changeStep } from '../../redux/actionCreators';

class Model {
    wrapper: HTMLElement | null
    store: { getState: () => any; dispatch: (action: any) => void; subscribe: (callback: any) => any[]; };
    constructor(value: HTMLElement) {
        this.wrapper = value
        this.store = createStore(reducer);
    }
    modelAddEvent (functions: any) {
        const {slider1, slider2} = this.helper()
        slider1.addEventListener('input', functions)
        slider2.addEventListener('input', functions)
    }
    modelBetween = (viewBetween: any) => {
        const {left, betwLength} = this.helper()
        viewBetween(left, betwLength)
    }
    modelStep = (viewStep: any) => {
        const {slider1, slider2, step} = this.helper()
        viewStep (slider1, slider2, step)
    }
    modelNum (viewNum: any) {
        const {num1, num2, val1, val2, right, left} = this.helper()
        viewNum(num1, val1, left)
        viewNum(num2, val2, right)
    }
    modelValue (viewValue: any){
        const {value1, value2, val1, val2} = this.helper()
        viewValue (value1.get(0), val1)
        viewValue (value2.get(0), val2)
    }
    modelSetValue (viewValue: any, functions: any) {
        const {slider1, slider2, value1, value2} = this.helper()
        const func = () => {
            viewValue(slider1, Number(value1.val()))
            viewValue(slider2, Number(value2.val()))
            functions()
        }
        func()
        /*value1.get(0).addEventListener('change',func)
        value2.get(0).addEventListener('change',func)*/
    }
    modelHideNum (f: any) {
        const {valuesRunners} = this.helper()
        valuesRunners.addEventListener('change', () => f())
       
    }
    modelRotate (f: any, controllerBetween: any) {
        const {rotateSlider} = this.helper()
        if (rotateSlider !== null) rotateSlider.addEventListener('change', () => {
            f()
            controllerBetween()
        })
    }
    getDataFromController = (options: any) => {
        this.store.dispatch(loadFirstData(options))
        //console.log(store.getState())
    }
    subscribe = (f: any) => {
        this.store.subscribe(() => f(this.store.getState()))
    }
    dispatchMin = (min) => this.store.dispatch(changeMin(min))
    dispatchMax = (max) => this.store.dispatch(changeMax(max))
    dispatchValueFirst = (value) => this.store.dispatch(changeValueFirst(value))
    dispatchValueSecond = (value) => this.store.dispatch(changeValueSecond(value))
    
    
        
    helper = () => {
        let w!: JQuery<HTMLElement> | null
        if (this.wrapper !== null ) w = $(this.wrapper)
        let elementsDom: any = {}
        let arrayDom = ['slider__rotate', 'slider_first', 'slider_second', 'slider__num_first', 
        'slider__num_second', 'slider__valuesRunners','slider__step']
        arrayDom.forEach(el => {
            if (w !== null) elementsDom[el] = w.find(`.${el}`).get(0)
        })
        const {slider__rotate, slider_first, slider_second, slider__num_first, slider__num_second, slider__valuesRunners, slider__step} = elementsDom
        let value1!: JQuery<HTMLElement>; let value2!: JQuery<HTMLElement>; let val1!: number; let val2!: number; let max!: JQuery<HTMLElement>; let min!: JQuery<HTMLElement>; let widthSlider!: number 
        if (w !== null ) {
            value1 = w.find('.slider__value_first')
            value2 = w.find('.slider__value_second')
            val1 = Number(w.find('.slider_first').val())
            val2 = Number(w.find('.slider_second').val())
            min = w.find('.slider__min')
            max = w.find('.slider__max')
            widthSlider = Number(w.find('.slider_first').width())
            if (val1 > val2 - 10) {
                w.find('.slider_first').val(String(val2 - 10)) 
            }
            if (val2 < val1 + 10) {
                w.find('.slider_second').val(String(val1 + 10)) 
            }
        }
        
        let widthScale = Math.abs(Number(max.val()) - Number(min.val()))
        let betwLength =  widthSlider * Math.abs(val1 - val2)/widthScale - 20 
        let left: number = (val1 - Number(min.val())) * widthSlider/widthScale 
        let leftNoChanged = left
        let right: number = (val2 - Number(min.val())) * widthSlider/widthScale 
        
        return {left, right, leftNoChanged, value1, value2, num1: slider__num_first, num2: slider__num_second, slider1: slider_first, slider2: slider_second, betwLength, 
             val1, val2, valuesRunners: slider__valuesRunners, rotateSlider: slider__rotate, step: slider__step, widthSlider}
    }  
}

export default Model;