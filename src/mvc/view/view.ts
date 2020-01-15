class View {
    $slider: HTMLElement | null
    settings: any
    $between: any
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
    $disableValues: any
    $rotate: any
    $ball1: any
    $ball2: any
    $scale: HTMLElement
    $sliderCoords: any
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
    getCoords = (elem) => {
        var box = elem[0].getBoundingClientRect();
        return {
            top: box.top + pageYOffset,
            left: box.left + pageXOffset
        };
    } 
    mousedown = (event, func, ball) => {
        
        let ballCoords = this.getCoords(ball);
        let shift = event.pageX - ballCoords.left;
        const mousemove = (e) => {
            let left = e.pageX - shift - this.$sliderCoords.left;
            func(left)
        }
        $(document).mousemove(mousemove)
        $(document).mouseup(() => $(document).off('mousemove'))      
    }
    findDom = () => {
        if (this.$slider) {
            this.$scale = this.$slider.find(`.slider__scale`)
            this.$ball1 = this.$slider.find(`.slider__ball_first`)
            this.$ball2 = this.$slider.find(`.slider__ball_second`)
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
            this.$disableValues = this.$slider.find('.slider__values-runners')
            this.$rotate = this.$slider.find('.slider__rotate')
        }
    }
    getData = () => {
        if (this.$slider !== null ) {
        let options = this.$slider.attr('data-options')
        this.data = JSON.parse(options)
        this.data.widthScale = this.$scale.width()
        this.data.ballWidth = this.$ball1.width()
        this.$sliderCoords = this.getCoords(this.$scale);
        }
    }
    render = (data) => {
        const {value1, value2, min, max, step, disableValues, vertical, oneRunner, left, right} = data
        this.$begin.html(min)
        this.$end.html(max)
        this.$min.val(min)
        this.$max.val(max)
        this.$num1.html(value1)
        this.$num2.html(value2)
        this.$value1.val(value1)
        this.$value2.val(value2)
        this.$step.val(step)
        this.disableValuesRunners(disableValues) 
        this.sliderVertical(vertical)
        this.$ball1.css('left', left)
        this.$ball2.css('left', right)
        this.$between.css({'left': left + this.$ball1.width()/2, 'width': right - left})
        
    }
    sendDataToController = () => this.data

    addEventListenerBalls = (func: any, func2: any) => {
        this.$ball1.mousedown((event) => this.mousedown(event, func, this.$ball1))
        this.$ball2.mousedown((event) => this.mousedown(event, func2, this.$ball2))
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
    addEventListenersDisableValues = (f: any) => {
        this.$disableValues.change(() => f())
    }
    addEventListenersVerticalView = (f: any) => {
        this.$rotate.change(() => f())
    }
    disableValuesRunners = (disableValues: boolean) => {
        disableValues ? this.$num1.addClass('slider__num_hide') : this.$num1.removeClass('slider__num_hide')
        disableValues ? this.$num2.addClass('slider__num_hide') : this.$num2.removeClass('slider__num_hide')
    }
    sliderVertical = (vertical) => {
        vertical ? this.$range.addClass('slider_vertical') : this.$range.removeClass('slider_vertical')
        vertical ? this.$num1.addClass('slider__rotate-reverse') : this.$num1.removeClass('slider__rotate-reverse')
        vertical ? this.$num2.addClass('slider__rotate-reverse') : this.$num2.removeClass('slider__rotate-reverse')
        //vertical ? this.$slider1.addClass('slider_short') : this.$slider1.removeClass('slider_short')
        //vertical ? this.$slider2.addClass('slider_short') : this.$slider2.removeClass('slider_short')
    }
   
}

export default View;