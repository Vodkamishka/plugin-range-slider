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
    $toggle: any
    props: any
    constructor($slider: HTMLElement) {
        this.$slider = $slider
        this.init()    
    }
     
    init = () => {
        this.findDom()
        this.getData()
        this.sendDataToController()
    }
    getCoords = (elem) => {
        var box = elem[0].getBoundingClientRect();
        return {
            top: box.top + pageYOffset,
            left: box.left + pageXOffset
        };
    } 
    mousedown = (event, func, ball, vertical) => {
        let ballCoords = this.getCoords(ball);
        let shift = vertical ? event.pageY - ballCoords.top : event.pageX - ballCoords.left
        const mousemove = (e) => {
            let left = vertical ? e.pageY - shift - this.$sliderCoords.top : e.pageX - shift - this.$sliderCoords.left;
            func(left)
        }
        let mouseup = () => {
            $(document).off('mousemove', mousemove)
            $(document).off('mouseup', mouseup)
        }
        $(document).on('mousemove', mousemove)
        $(document).on('mouseup', mouseup)
                    
    }
    /*mousedowns = (event, ball, props, property, f) => {
        let ballCoords = this.getCoords(ball);
        let shift = event.pageX - ballCoords.left;
            let mousemove = (e) => {
                let left = e.pageX - shift - this.$sliderCoords.left
                props[property] = left
                f(props)
            }
            let mouseup = () => {
                $(document).off('mousemove', mousemove)
                $(document).off('mouseup', mouseup)
            }
        $(document).on('mousemove', mousemove)
        $(document).on('mouseup', mouseup)
    }*/
    
    findDom = () => {
        if (this.$slider) {
            let domNames = [['$scale', 'scale'], ['$ball1', 'ball_first'], ['$ball2', 'ball_second'], ['$ball1', 'ball_first'], ['$min', 'min'],
                ['$max', 'max'], ['$value1', 'value_first'], ['$value2', 'value_second'], ['$step', 'step'], ['$range', 'range'], ['$num1', 'num_first'],
                ['$num2', 'num_second'], ['$between', 'between'], ['$begin', 'begin'], ['$end', 'end'], ['$disableValues', 'values-runners'],
                ['$rotate', 'rotate'], ['$toggle', 'one-toggle'],
            ]
            domNames.forEach(el => this[`${el[0]}`] = this.$slider.find(`.slider__${el[1]}`))
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
        let renderHtml = [['$begin', min], ['$end', max], ['$num1', value1], ['$num2', value2]] 
        let renderVal = [['$min', min], ['$max', max], ['$value1', value1], ['$value2', value2], ['$step', step]]
        let renderCss = [/*['$ball1', 'left', left], ['$ball2', 'left', right], */['$between', vertical ? 'height' : 'width', right - left]]
        renderHtml.forEach(el => this[`${el[0]}`].html(el[1]))
        renderVal.forEach(el => this[`${el[0]}`].val(el[1]))
        renderCss.forEach(el => this[`${el[0]}`].css(el[1], el[2]))
        //this.$between.css(vertical ? 'top' : 'left', left + this.$ball1.width()/2)
        this.disableValuesOverBalls(disableValues) 
        this.sliderVertical(vertical)
        this.eneblaOneRunners(oneRunner)

        this.balls(this.$ball1, this.$ball2, left, right, vertical, this.$between) 
    }

    sendDataToController = () => this.data

    addEventListenersBalls = (props) => {
        //this.$ball1.mousedown((event) => this.mousedown(event, props.dispatchBallValueFirst, this.$ball1))
        //this.$ball2.mousedown((event) => this.mousedown(event, props.dispatchBallValueSecond, this.$ball2))
    }

    addEventListeners = (f: any, dispatchBallValueFirst: any, dispatchBallValueSecond: any) => {
        let {min, max, step, disableValues, vertical, oneRunner, widthScale} = this.data
        let props = {left: '', right: '', widthScale, min, max, step, disableValues, vertical, oneRunner}
        
        this.$min.change(() => {
            props['min'] = this.$min.val()
            f(props)
        })
        this.$max.change(() => {
            props['max'] = this.$max.val()
            f(props)
        })
        this.$value1.change(() => {
            props['value1'] = this.$value1.val()
            f(props)
        })
        this.$value2.change(() => {
            props['value2'] = this.$value2.val()
            f(props)
        })
        this.$step.change(() => {
            props['step'] = this.$step.val()
            f(props)
        })

        this.$disableValues.change(() => {
            props['disableValues'] = !props.disableValues
            f(props)
        })

        this.$rotate.change(() => {
            props['vertical'] = !props.vertical
            props['widthScale'] = this.$scale.width()
            console.log(props)
            f(props)
        })
       
        this.$toggle.change(() => {
            props['oneRunner'] = !props.oneRunner
            f(props)
        }) 
       
        this.$ball1.mousedown((event) => this.mousedown(event, dispatchBallValueFirst, this.$ball1, props.vertical))
        this.$ball2.mousedown((event) => this.mousedown(event, dispatchBallValueSecond, this.$ball2, props.vertical))
        
        //this.$ball1.mousedown(() => this.mousedowns(event, this.$ball1, props, 'left', f))
        //this.$ball2.mousedown(() => this.mousedowns(event, this.$ball2, props, 'right', f))
 
    }

    disableValuesOverBalls = (disableValues: boolean) => {
        disableValues ? this.$num1.addClass('slider__num_hide') : this.$num1.removeClass('slider__num_hide')
        disableValues ? this.$num2.addClass('slider__num_hide') : this.$num2.removeClass('slider__num_hide')
    }
    sliderVertical = (vertical) => {
        vertical ? this.$range.addClass('slider__range_vertical') : this.$range.removeClass('slider__range_vertical')
        vertical ? this.$scale.addClass('slider__scale_vertical') : this.$scale.removeClass('slider__scale_vertical')
        vertical ? this.$between.addClass('slider__between_vertical') : this.$between.removeClass('slider__between_vertical')
        vertical ? this.$begin.addClass('slider__begin_vertical') : this.$begin.removeClass('slider__begin_vertical')
        vertical ? this.$end.addClass('slider__end_vertical') : this.$end.removeClass('slider__end_vertical')
        vertical ? this.$num1.addClass('slider__num_vertical') : this.$num1.removeClass('slider__num_vertical')
        vertical ? this.$num2.addClass('slider__num_vertical') : this.$num2.removeClass('slider__num_vertical')
    }
    eneblaOneRunners = (oneRunner) => {
        oneRunner ? this.$ball1.addClass('slider__ball_hide') : this.$ball1.removeClass('slider__ball_hide')
        oneRunner ? this.$value1.addClass('slider__value_white'): this.$value1.removeClass('slider__value_white')
    }

    balls = (ball1, ball2, left, right, vertical, between) => {
        ball1.css({'left': vertical ? '50%' : left, 'transform': vertical ? 'translateX(-50%) translateY(0%)' : 'translateX(0%) translateY(-50%)',
        'top': vertical ? left: '50%'
    })
        ball2.css({'left': vertical ? '50%' : right, 'transform': vertical ? 'translateX(-50%) translateY(0%)' : 'translateX(0%) translateY(-50%)',
        'top': vertical ? right: '50%'
    })
        between.css({'left': vertical ? '0' : +left + +this.$ball1.width()/2, 'top': vertical ? +left + +this.$ball1.width()/2 : '0'
    })
        between.css(vertical ? 'width' : 'height', '0.75rem')
    }
}

export default View;