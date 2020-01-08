class View {
    $slider: HTMLElement | null
    settings: any
    $between: HTMLElement | null | undefined
    $slider1: HTMLElement | null | undefined
    $slider2: HTMLElement | null | undefined
    $step: HTMLElement | null | undefined
    $range: HTMLElement | null | undefined
    $num1: HTMLElement | null | undefined
    $num2: HTMLElement | null | undefined
    $end: HTMLElement | null | undefined
    $begin: HTMLElement | null | undefined
    $min: HTMLElement | null | undefined
    $max: HTMLElement | null | undefined
    constructor($slider: HTMLElement, settings: any) {
        this.$slider = $slider
        this.settings = settings
        this.init()   
    }
    init = () => {
        this.created()
        this.searchedDomElements()
        this.sendFirstOptionsToController()
        this.loadedFirstOptionsToInputs()
    }
    created = () => {
        const {value1, value2, min, max, step} = this.settings
        let panel = `<div class="slider__panel" ><label class="slider__label">min<input class="slider__min" type="number" value=${min}></label><label class="slider__label">max<input class="slider__max" type="number" value=${max}></label><label class="slider__label">value1<input class="slider__value1" type="number" value=${value1}></label><label class="slider__label">value2<input class="slider__value2" type="number" value=${value2}></label><label class="slider__label">disable values<input class="slider__valuesRunners" type="checkbox" value=""></label><label class="slider__label">change view<input class="slider__rotate" type="checkbox" value=""></label><label class="slider__label">step<input class="slider__step" type="number" value=${step}></label></div>`
        let range = `<div class="slider__range" ><input class="slider_first" type="range" value=${value1} step=${step} min=${min} max=${max}><input class="slider_second" type="range" value=${value2} step=${step} min=${min} max=${max}><div class="slider__between" ></div><div class="slider__begin" ></div><div class="slider__end" ></div><div class="slider__num_first" ></div><div class="slider__num_second" ></div></div>` 
        if (this.$slider !== null) $(this.$slider).html(range + panel)}

    searchedDomElements = () => {
        if (this.$slider !== null) {
            this.$between = this.$slider.find('.slider__between')
            this.$slider1 = this.$slider.find('.slider_first')
            this.$slider2 = this.$slider.find('.slider_second')
            this.$step = this.$slider.find('.slider__step')
            this.$range = this.$slider.find('.slider__range')
            this.$num1 = this.$slider.find('.slider__num_first')
            this.$num2 = this.$slider.find('.slider__num_second')
            this.$begin = this.$slider.find('.slider__begin')
            this.$end = this.$slider.find('.slider__end')
            this.$min = this.$slider.find('.slider__min')
            this.$max = this.$slider.find('.slider__max')
        }
    }
    loadedFirstOptionsToInputs = () => {
        if (this.$slider !== null ) {
            let options = this.$slider.attr('data-options')
            const {value1, value2, min, max, step} = JSON.parse(options)
            if (this.$begin !== null && this.$begin !== undefined && this.$end !== null && this.$end !== undefined
                && this.$min !== null && this.$min !== undefined && this.$max !== null && this.$max !== undefined) {
                
                this.$begin.html(min || this.$min.val())
                this.$end.html(max || this.$max.val())
            }
            
            
        }
    }
    sendFirstOptionsToController = () => {
        if (this.$slider !== null ) {return this.$slider.attr('data-options')}
    }
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

    viewScale = (minVal: string, maxVal: string) => {
        if (this.$slider1 !== null && this.$slider1 !== undefined && this.$slider2 !== null && this.$slider2 !== undefined &&
            this.$begin !== null && this.$begin !== undefined && this.$end !== null && this.$end !== undefined) {
            this.$begin.html(minVal)
            this.$slider1.data('min', minVal)
            this.$slider2.data('min', minVal)
            this.$end.html(maxVal)
            this.$slider1.data('max', maxVal)
            this.$slider2.data('max', maxVal)
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