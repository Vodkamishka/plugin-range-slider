class View {
    wrapper: HTMLElement | null
    settings: any
    constructor(value: HTMLElement, settings: any) {
        this.wrapper = value 
        this.settings = settings
        this.create()   
    }
    create = () => {
        const {value1, value2, min, max, step} = this.settings
        let panel = `<div class="slider__panel" ><label class="slider__label">min<input class="slider__min" type="number" value=${min}></label><label class="slider__label">max<input class="slider__max" type="number" value=${max}></label><label class="slider__label">value1<input class="slider__value1" type="number" value=${value1}></label><label class="slider__label">value2<input class="slider__value2" type="number" value=${value2}></label><label class="slider__label">disable values<input class="slider__valuesRunners" type="checkbox" value=""></label><label class="slider__label">change view<input class="slider__rotate" type="checkbox" value=""></label><label class="slider__label">step<input class="slider__step" type="number" value=${step}></label></div>`
        let range = `<div class="slider__range" ><input class="slider_first" type="range" value=${value1} step=${step} min=${min} max=${max}><input class="slider_second" type="range" value=${value2} step=${step} min=${min} max=${max}><div class="slider__between" ></div><div class="slider__begin" ></div><div class="slider__end" ></div><div class="slider__num_first" ></div><div class="slider__num_second" ></div></div>` 
        if (this.wrapper !== null) $(this.wrapper).html(range + panel)}
    viewBetween = (left: number,  betwWidth: number, el: HTMLElement) => {
        el.style.marginLeft = left + 'px'
        el.style.width = betwWidth + 'px'
    }
    viewStep = (slider1: HTMLInputElement, slider2: HTMLInputElement, step: HTMLInputElement) => {
        slider1.step = step.value || this.settings.step
        slider2.step = step.value || this.settings.step
    }  
    viewScale = (minVal: string, maxVal: string, el: HTMLElement, el2: HTMLElement, slider1: HTMLInputElement, slider2: HTMLInputElement) => {
        $(el).html(minVal)
        slider1.min = minVal
        slider2.min = minVal
        $(el2).html(maxVal)
        slider1.max = maxVal
        slider2.max = maxVal
    }
    viewNum = (el: HTMLElement, num: number, left: number) => {
        el.innerHTML = num.toString()
        el.style.marginLeft = left.toString() + 'px'
    }
    viewValue = (el: HTMLInputElement , num: number) => el.value = num.toString()
    viewHideNum = (el: HTMLElement) => el.classList.toggle('slider_white')
    viewRotate = (f: any) => {
        const {range, num1, num2, slider1, slider2} = f()
        range.classList.toggle('slider_vertical')
        num1.classList.toggle('slider__rotateReverse')
        num2.classList.toggle('slider__rotateReverse')
        slider1.classList.toggle('slider_short')
        slider2.classList.toggle('slider_short')
    }
}
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
class Controller {
    view: any
    model: any
    constructor (view:any, model: any) {
        this.view = view
        this.model = model
        this.init()
}
    init = () => {
        let functions = [this.controllerScale, this.controllerNum, this.addEvent, this.controllerBetween, this.controllerSetValue, 
            this.controllerSetScale, this.controllerHideNum, this.controllerRotate]
        functions.forEach(el => el())
    }
    calls = () => {
        this.controllerBetween()
        this.controllerNum()
    }
    f = () => {
        let functions = [this.controllerBetween, this.controllerNum, this.controllerValue, this.controllerScale, this.controllerStep]
        functions.forEach(el => el())  
    }
    
    controllerBetween = () => this.model.modelBetween (this.view.viewBetween)
    controllerStep = () => this.model.modelStep (this.view.viewStep)
    controllerCreate = () => this.model.modelCreate (this.view.viewCreate)
    controllerScale = () => this.model.modelScale (this.view.viewScale)
    controllerNum = () => this.model.modelNum (this.view.viewNum)
    controllerValue = () => this.model.modelValue(this.view.viewValue)
    controllerHideNum = () => this.model.modelHideNum(this.view.viewHideNum)
    controllerRotate = () => this.model.modelRotate(this.view.viewRotate, this.controllerBetween)
    controllerSetValue = () => this.model.modelSetValue(this.view.viewValue, this.calls)
    controllerSetScale = () => this.model.modelSetScale(this.f)
    addEvent = () => this.model.modelAddEvent(this.f)
}

(function ($: any) {
    $.fn.slider = function (options: any) {
       let settings = $.extend({
           value1: 5000,
           value2: 15000,
           min: 0,
           max: 25000,
           step: 50,
       }, options)
       
       this.each((index: number, value: HTMLElement) => {    
           const view = new View(value, settings)
           const model = new Model(value)
           new Controller(view, model)
       })
    }
   
   $('.slider').slider()

}(jQuery))


var module!: NodeModule

if (module !== undefined) module.exports = {
    View, 
    Model, 
    Controller
}



