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

export default View;