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
    $vertical: any
    $ball1: any
    $ball2: any
    $scale: HTMLElement
    $sliderCoords: any
    $oneRunner: any
    props: any
    constructor($slider: HTMLElement) {
        this.$slider = $slider
        this.init()    
    }
    init = () => {
        this.findDom()
        this.getDataFromAttr()
    }
    getCoords = (elem) => {
        let box = elem[0].getBoundingClientRect();
        return {
            top: box.top + pageYOffset,
            left: box.left + pageXOffset
        };
    } 
    mousedown = (dispatchBall, props) => {
        let {vertical, step, widthScale, max, min, ballWidth} = props
        let stepLength = vertical ? step * widthScale / ((max - min) * 3) : step * widthScale / (max - min)
        const mousemove = (e) => {
            let left = vertical ? e.pageY - this.$sliderCoords.top : e.pageX - this.$sliderCoords.left;
            left = stepLength * Math.round(left/stepLength) - ballWidth/2 
            dispatchBall(left)
        }
        let mouseup = () => {
            $(document).off('mousemove', mousemove)
            $(document).off('mouseup', mouseup)
        }
        $(document).on('mousemove', mousemove)
        $(document).on('mouseup', mouseup)              
    }
    findDom = () => {
        if (this.$slider) {
            let domNames = ['scale', 'min', 'max', 'step', 'range', 'between', 'begin', 'end', 'vertical', ['ball1', 'ball_first'], 
            ['ball2', 'ball_second'], ['ball1', 'ball_first'], ['value1', 'value_first'], ['value2', 'value_second'], 
            ['num1', 'num_first'],['num2', 'num_second'],  ['disableValues', 'values-runners'],['oneRunner', 'one-runner']]
            domNames.forEach(el => {
              typeof el === 'string' ?  this[`$${el}`] = this.$slider.find(`.slider__${el}`) : this[`$${el[0]}`] = this.$slider.find(`.slider__${el[1]}`)
            })
        }
    }
    getDataFromAttr = () => {
        if (this.$slider !== null ) {
            this.data = JSON.parse(this.$slider.attr('data-options'))
            this.data.widthScale = this.$scale.width()
            this.data.ballWidth = this.$ball1.width()
            this.$sliderCoords = this.getCoords(this.$scale);
        }
    }
    render = (data) => {
        const {value1, value2, min, max, step, disableValues, vertical, oneRunner, left, right} = data
        let renderHtml = [['begin', min], ['end', max], ['num1', value1], ['num2', value2]] 
        let renderVal = [['min', min], ['max', max], ['value1', value1], ['value2', value2], ['step', step]]
        let renderCss = [['between', vertical ? 'height' : 'width', right - left], ['between', vertical ? 'width' : 'height', '0.75rem'],
        ['between', 'left', vertical ? '0' : +left + +this.$ball1.width()/2], ['between', 'top', vertical ? +left + +this.$ball1.width()/2 : '0'],
        ['ball1', 'left', vertical ? '50%' : left], ['ball1', 'transform', vertical ? 'translateX(-50%) translateY(0%)' : 'translateX(0%) translateY(-50%)'],
        ['ball1', 'top', vertical ? left: '50%'], ['ball2', 'left', vertical ? '50%' : right], 
        ['ball2', 'transform', vertical ? 'translateX(-50%) translateY(0%)' : 'translateX(0%) translateY(-50%)'],['ball2', 'top', vertical ? right: '50%']]
        renderHtml.forEach(el => this[`$${el[0]}`].html(el[1]))
        renderVal.forEach(el => this[`$${el[0]}`].val(el[1]))
        renderCss.forEach(el => this[`$${el[0]}`].css(el[1], el[2]))
        this.disableValuesOverBalls(disableValues) 
        this.sliderVertical(vertical)
        this.enableOneBall(oneRunner)  
    }

    sendDatafromViewToController = () => this.data

    addEventListeners = (changeState: any, dispatchBallValueFirst: any, dispatchBallValueSecond: any) => {
        let {min, max, step, disableValues, vertical, oneRunner, widthScale, ballWidth} = this.data
        let props = {min, max, step, disableValues, vertical, oneRunner, widthScale, ballWidth}

        let propsArray = ['min', 'max', 'value1', 'value2', 'step']
        let properties = ['disableValues', 'vertical', 'oneRunner']

        propsArray.forEach(el => {
            this[`$${el}`].change(()=> {
                props[el] = this[`$${el}`].val() 
                changeState(props) 
            })
        })
        properties.forEach(el => {
            this[`$${el}`].change(()=> {
                props[el] = !props[el]
                changeState(props) 
            })
        })
        this.$ball1.mousedown(() => this.mousedown(dispatchBallValueFirst, props))
        this.$ball2.mousedown(() => this.mousedown(dispatchBallValueSecond, props))
    }
    disableValuesOverBalls = (disableValues: boolean) => {
        disableValues ? this.$num1.addClass('slider__num_hide') : this.$num1.removeClass('slider__num_hide')
        disableValues ? this.$num2.addClass('slider__num_hide') : this.$num2.removeClass('slider__num_hide')
    }
    sliderVertical = (vertical) => {
        let verticalArray = ['range', 'scale', 'between', 'begin', 'end']
        verticalArray.forEach(el => vertical ? this[`$${el}`].addClass(`slider__${el}_vertical`) : this[`$${el}`].removeClass(`slider__${el}_vertical`))
        vertical ? this.$num1.addClass(`slider__num_vertical`) : this.$num1.removeClass(`slider__num_vertical`)
        vertical ? this.$num2.addClass(`slider__num_vertical`) : this.$num2.removeClass(`slider__num_vertical`)    
    }
    enableOneBall = (oneRunner) => {
        oneRunner ? this.$ball1.addClass('slider__ball_hide') : this.$ball1.removeClass('slider__ball_hide')
        oneRunner ? this.$value1.addClass('slider__value_white'): this.$value1.removeClass('slider__value_white')
    }    
}

export default View;