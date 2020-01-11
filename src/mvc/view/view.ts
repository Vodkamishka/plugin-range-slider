class View {
    $slider: HTMLElement | null
    settings: any
    $between: HTMLElement | null | undefined
    $slider1: any
    $slider2: any
    $step: any
    $range: HTMLElement | null | undefined
    $num1: HTMLElement | null | undefined
    $num2: HTMLElement | null | undefined
    $end: HTMLElement | null | undefined
    $begin: HTMLElement | null | undefined
    $min!: any
    $max:any
    data: any
    $value1: any
    $value2: any
    constructor($slider: HTMLElement) {
        this.$slider = $slider
        this.init()   
    }
    init = () => {
        this.findDom()
        this.getData()
        this.sendDataToController()
        this.render(this.data)
    }
    findDom = () => {
        if (this.$slider) {
            this.$slider1 = this.$slider.find('.slider_first')
            this.$slider2 = this.$slider.find('.slider_second')
            this.$min = this.$slider.find('.slider__min')
            this.$max = this.$slider.find('.slider__max')
            this.$value1 = this.$slider.find('.slider__value_first')
            this.$value2 = this.$slider.find('.slider__value_second')
            this.$step = this.$slider.find('.slider__step')
            this.$range = this.$slider.find('.slider__range')
            this.$num1 = this.$slider.find('.slider__num_first')
            this.$num2 = this.$slider.find('.slider__num_second')
            this.$between = this.$slider.find('.slider__between')
            this.$begin = this.$slider.find('.slider__begin')
            this.$end = this.$slider.find('.slider__end')
        }
    }
    getData = () => {
        if (this.$slider !== null ) {
        let options = this.$slider.attr('data-options')
        this.data = JSON.parse(options)
        }
    }
    render = (data) => {
        console.log(data)
            const {value1, value2, min, max, step} = data
            this.$begin.html(min)
            this.$end.html(max)
            this.$min.val(min)
            this.$max.val(max)
            this.$slider1.val(value1)
            this.$slider2.val(value2)
            this.$value1.val(value1)
            this.$value2.val(value2)
            this.$step.val(step)
            this.$slider1.attr({
                'min': min,
                'max': max,
                'step': step,
            })
            this.$slider2.attr({
                'min': min,
                'max': max,
                'step': step,
            })    
    }
    addEventListenerMin = (f: any) => {
        this.$min.change(() => f(this.$min.val()))
    }
    addEventListenerMax = (f: any) => {
        this.$max.change(() => f(this.$max.val()))
    }
    addEventListenerValueFirst = (f: any) => {
        this.$value1.change(() => f(this.$value1.val()))
    }
    addEventListenerValueSecond = (f: any) => {
        this.$value2.change(() => f(this.$value2.val()))
    }
    sendDataToController = () => this.data
    
    viewBetween = (left: number,  betwWidth: number) => {
        if (this.$between !== null && this.$between !== undefined) {
            this.$between.css({'marginLeft': left + 16 + 'px', 'width': betwWidth + 'px'})
        }
        
    }
    viewStep = (slider1: HTMLInputElement, slider2: HTMLInputElement, step: HTMLInputElement) => {
        if (this.$slider1 !== null && this.$slider1 !== undefined && this.$slider2 !== null && this.$slider2 !== undefined && this.$step !== null && this.$step !== undefined) {
            slider1.step = this.$step.val() || this.settings.step
            slider2.step = this.$step.val() || this.settings.step
        }
    }  

    viewNum = (el: HTMLElement, num: number, left: number) => {
        el.innerHTML = num.toString()
        el.style.marginLeft = left.toString() + 'px'
    }

    viewValue = (el: HTMLInputElement , num: number) => el.value = num.toString()

    viewHideNum = () => {
        if (this.$num1 !== null && this.$num1 !== undefined && this.$num2 !== null && this.$num2 !== undefined) {
            this.$num1.toggleClass('slider_white')
            this.$num2.toggleClass('slider_white')
        }
    }

    viewRotate = () => {
        if (this.$range !== null && this.$range !== undefined && this.$num1 !== null && this.$num1 !== undefined && 
            this.$num2 !== null && this.$num2 !== undefined && this.$slider1 !== null && this.$slider1 !== undefined && 
            this.$slider2 !== null && this.$slider2 !== undefined) {
            this.$range.toggleClass('slider_vertical')
            this.$num1.toggleClass('slider__rotateReverse')
            this.$num2.toggleClass('slider__rotateReverse')
            this.$slider1.toggleClass('slider_short')
            this.$slider2.toggleClass('slider_short')
        }
    }
}

export default View;