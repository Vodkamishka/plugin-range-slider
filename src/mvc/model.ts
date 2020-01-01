class Model {
    wrapper: HTMLElement | null
    constructor(value: HTMLElement) {
        this.wrapper = value
    }
    modelAddEvent (functions: any) {
        const {slider1, slider2} = this.helper()
        slider1.addEventListener('input', functions)
        slider2.addEventListener('input', functions)
    }
    modelBetween = (viewBetween: any) => {
        const {left, betwLength, between} = this.helper()
        viewBetween(left, betwLength, between)
    }
    modelStep = (viewStep: any) => {
        const {slider1, slider2, step} = this.helper()
        viewStep (slider1, slider2, step)
    }
    modelScale = (viewScale: any) => {
        let {slider1, slider2, min, max, begin, end} = this.helper()
        viewScale(min.val(), max.val(), begin, end, slider1, slider2)
    }
    modelNum (viewNum: any) {
        const {num1, num2, val1, val2, right, leftNoChanged} = this.helper()
        viewNum(num1, val1, leftNoChanged)
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
        value1.get(0).addEventListener('change',func)
        value2.get(0).addEventListener('change',func)
    }
    modelSetScale (functions: any) {
        this.helper().min.get(0).addEventListener("change", functions)
        this.helper().max.get(0).addEventListener("change", functions)
    }
    modelHideNum (f: any) {
        const {valuesRunners, num1, num2} = this.helper()
        valuesRunners.addEventListener('change', () => f(num1))
        valuesRunners.addEventListener('change', () => f(num2))
    }
    modelRotate (f: any, controllerBetween: any) {
        const {range, rotateSlider} = this.helper()
        if (range !== null && rotateSlider !== null) rotateSlider.addEventListener('change', () => {
            f(this.helper)
            controllerBetween()
        })
    }
    helper = () => {
        let w!: JQuery<HTMLElement> | null
        if (this.wrapper !== null ) w = $(this.wrapper)
        let elementsDom: any = {}
        let arrayDom = ['slider__range', 'slider__rotate', 'slider_first', 'slider_second', 'slider__begin', 'slider__end', 'slider__between', 'slider__num_first', 
        'slider__num_second', 'slider__valuesRunners','slider__step']
        arrayDom.forEach(el => {
            if (w !== null) elementsDom[el] = w.find(`.${el}`).get(0)
        })
        const {slider__range, slider__rotate, slider_first, slider_second, slider__begin, slider__end, slider__between, slider__num_first, slider__num_second, slider__valuesRunners, slider__step} = elementsDom
        let value1!: JQuery<HTMLElement>; let value2!: JQuery<HTMLElement>; let val1!: number; let val2!: number; let max!: JQuery<HTMLElement>; let min!: JQuery<HTMLElement>; let widthSlider!: number 
        if (w !== null ) {
            value1 = w.find('.slider__value1')
            value2 = w.find('.slider__value2')
            val1 = Number(w.find('.slider_first').val())
            val2 = Number(w.find('.slider_second').val())
            min = w.find('.slider__min')
            max = w.find('.slider__max')
            widthSlider = Number(w.find('.slider_first').width())
        }
        let widthScale = Math.abs(Number(max.val()) - Number(min.val()))
        let betwLength =  widthSlider * Math.abs(val1 - val2)/widthScale 
        let left: number = (val1 - Number(min.val())) * widthSlider/widthScale 
        let leftNoChanged = left
        let right: number = (val2 - Number(min.val())) * widthSlider/widthScale 
        if (val2 > val1) {left = left}
        else {left = right}
        return {left, right, leftNoChanged, value1, value2, num1: slider__num_first, num2: slider__num_second, slider1: slider_first, slider2: slider_second, betwLength, between: slider__between, min, max, 
            begin: slider__begin, end: slider__end, val1, val2, valuesRunners: slider__valuesRunners, range: slider__range, rotateSlider: slider__rotate, step: slider__step, widthSlider}
    }  
}

export default Model;