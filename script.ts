class View {
    wrapper: HTMLElement | null
    settings: any
    constructor(value: HTMLElement, settings: any) {
        this.wrapper = value 
        this.settings = settings
        this.create()   
    }
    create = () => {
        const {value1, value2, min, max, step1, step2} = this.settings
        let panel = `<div class="panel" ><p class="p" >Панель конфигурации:</p><label class="label" >Мин. диапазона<input class="min" type="text" value=${min}></label><label class="label" >Макс. диапазона<input class="max" type="text" value=${max}></label><label class="labelVal1" >Значение 1<input class="value1" type="text" value=${value1}></label><label class="labelVal2" >Значение 2<input class="value2" type="text" value=${value2}></label><label class="labelFlag1" >Откл. бегунок 1<input class="flag1" type="checkbox" value=""></label><label class="labelFlag2" >Откл. бегунок 2<input class="flag2" type="checkbox" value=""></label><label class="labelNum1" >Откл. значение 1<input class="inpNum1" type="checkbox" value=""></label><label class="labelNum2" >Откл. значение 2<input class="inpNum2" type="checkbox" value=""></label><label class="labelRotate" >Вкл. вертикальный вид<input class="rotateSlider" type="checkbox" value=""></label><label class="label" >Размер шага 1<input class="step1" type="text" value=""></label><label class="label" >Размер шага 2<input class="step2" type="text" value=""></label></div>`
        let range = `<div class="range" ><input class="slider1" type="range" value=${value1} step=${step1} min=${min} max=${max}><input class="slider2" type="range" value=${value2} step=${step2} min=${min} max=${max}><div class="between" ></div><div class="begin" ></div><div class="end" ></div><div class="num1" ></div><div class="num2" ></div></div>` 
        if (this.wrapper !== null) $(this.wrapper).html(panel + range)}
    viewBetween = (left: number,  betwWidth: number, el: HTMLElement) => {
        el.style.marginLeft = left + 'px'
        el.style.width = betwWidth + 'px'
    }
    viewStep = (slider1: HTMLInputElement, slider2: HTMLInputElement, step1: HTMLInputElement, step2: HTMLInputElement) => {
        slider1.step = step1.value || this.settings.step1
        slider2.step = step2.value || this.settings.step2
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
    viewHideBall = (slider: HTMLInputElement, num: HTMLElement, val: HTMLInputElement, between: HTMLElement) => {
        slider.classList.toggle('hide')
        if (slider.parentNode !== null && slider.parentNode.querySelectorAll('.hide').length < 2 && between !== null) between.classList.toggle('hide')
        num.classList.toggle('white')
        val.classList.toggle('white')
    }
    viewHideNum = (el: HTMLElement) => el.classList.toggle('white')
    viewRotate = (el: HTMLElement, el2: HTMLElement, el3: HTMLElement) => {
        el.classList.toggle('rotate')
        el2.classList.toggle('rotateReverse')
        el3.classList.toggle('rotateReverse')
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
        const {slider1, slider2, step1, step2} = this.helper()
        viewStep (slider1, slider2, step1, step2)
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
    modelHideBall (f: any) {
        const {flag1, flag2, slider1, slider2, num1, num2, value1, value2, between} = this.helper()
        flag1.addEventListener('change', () => f(slider1, num1, value1.get(0), between))
        flag2.addEventListener('change', () => f(slider2, num2, value2.get(0), between))
    }
    modelHideNum (f: any) {
        const {inpNum1, inpNum2, num1, num2} = this.helper()
        inpNum1.addEventListener('change', () => f(num1))
        inpNum2.addEventListener('change', () => f(num2))
    }
    modelRotate (f: any) {
        const {range, rotateSlider, num1, num2} = this.helper()
        if (range !== null && rotateSlider !== null) rotateSlider.addEventListener('change', () => f(range, num1, num2))
    }
    helper () {
        let w!: JQuery<HTMLElement> | null
        if (this.wrapper !== null ) w = $(this.wrapper)
        let elementsDom: any = {}
        let arrayDom = ['range', 'rotateSlider', 'slider1', 'slider2', 'begin', 'end', 'between', 'num1', 'num2', 'flag1', 'flag2', 'inpNum1', 'inpNum2', 'step1', 'step2']
        arrayDom.forEach(el => {
            if (w !== null) elementsDom[el] = w.find(`.${el}`).get(0)
        })
        const {range, rotateSlider, slider1, slider2, begin, end, between, num1, num2, flag1, flag2, inpNum1, inpNum2,step1, step2} = elementsDom
        let value1!: JQuery<HTMLElement>; let value2!: JQuery<HTMLElement>; let val1!: number; let val2!: number; let max!: JQuery<HTMLElement>; let min!: JQuery<HTMLElement>;
        if (w !== null ) {
            value1 = w.find('.value1')
            value2 = w.find('.value2')
            val1 = Number(w.find('.slider1').val())
            val2 = Number(w.find('.slider2').val())
            min = w.find('.min')
            max = w.find('.max')
        }
        let widthScale = Math.abs(Number(max.val()) - Number(min.val()))
        let betwLength =  266 * Math.abs(val1 - val2)/widthScale 
        let left: number = (val1 - Number(min.val())) * 266/widthScale 
        let leftNoChanged = left
        let right: number = (val2 - Number(min.val())) * 266/widthScale 
        if (val2 > val1) {left = left}
        else {left = right}
        return {left, right, leftNoChanged, value1, value2, num1, num2, slider1, slider2, betwLength, between, min, max, begin, end, val1, val2, flag1, flag2, inpNum1, inpNum2, range, rotateSlider, step1, step2}
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
            this.controllerSetScale, this.controllerHideBall, this.controllerHideNum, this.controllerRotate]
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
    controllerHideBall = () => this.model.modelHideBall(this.view.viewHideBall)
    controllerHideNum = () => this.model.modelHideNum(this.view.viewHideNum)
    controllerRotate = () => this.model.modelRotate(this.view.viewRotate)
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
           step1: 8,
           step2: 8
       }, options)
       
       this.each((index: number, value: HTMLElement) => {    
           const view = new View(value, settings)
           const model = new Model(value)
           new Controller(view, model)
       })
    }
   
   $('.wrapper').slider()

}(jQuery))


var module!: NodeModule

if (module !== undefined) module.exports = {
    View, 
    Model, 
    Controller
}



