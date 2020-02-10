class View {
  $slider: any;
  settings: any;
  $between: any;
  $step: any;
  $range: any;
  $num1: any;
  $num2: any;
  $end: any;
  $begin: any;
  $min!: any;
  $max:any;
  data: any;
  $value1: any;
  $value2: any;
  $disableValues: any;
  $vertical: any;
  $ball1: any;
  $ball2: any;
  $scale: any;
  $sliderCoords: any;
  $oneRunner: any;
  props: any;
  constructor($slider: HTMLElement) {
    this.$slider = $slider;
    this.init();
  }
  init = () => {
    this.findDom();
    this.getDataFromAttr();
  }
  getCoords = (elem) => {
    const box = elem[0].getBoundingClientRect();
    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset,
    };
  }
  mousedown = (dispatchBall, props) => {
    const { vertical, step, widthScale, max, min, ballWidth } = props;
    const stepLength = vertical ? step * widthScale / ((max - min) * 3) : step * widthScale / (max - min);
    const mousemove = (e) => {
      let left = vertical ? e.pageY - this.$sliderCoords.top : e.pageX - this.$sliderCoords.left;
      left = stepLength * Math.round(left / stepLength) - ballWidth / 2;
      dispatchBall(left);
    };
    const mouseup = () => {
      $(document).off('mousemove', mousemove);
      $(document).off('mouseup', mouseup);
    };
    $(document).on('mousemove', mousemove);
    $(document).on('mouseup', mouseup);
  }
  clicker = (e, props, dispatch) => {
    const click = () => {
      const { vertical, widthScale, ballWidth } = props;
      const left = vertical ? e.pageY - this.$sliderCoords.top - - ballWidth / 2 : e.pageX - this.$sliderCoords.left - ballWidth / 2;
      left < widthScale / 2 ? dispatch.dispatchBallValueFirst(left) : dispatch.dispatchBallValueSecond(left);
    };
    const mouseup = () => {
      $(document).off('click', click);
      $(document).off('mouseup', mouseup);
    };
    $(document).on('click', click);
    $(document).on('mouseup', mouseup);
  }
  findDom = () => {
    if (this.$slider) {
      const domNames = ['scale', 'range', 'between', 'begin', 'end',  ['ball1', 'ball_first'], ['ball2', 'ball_second'],
      ['ball1', 'ball_first'], ['num1', 'num_first'], ['num2', 'num_second']];
        // tslint:disable-next-line:ter-arrow-parens
      const panel = ['min', 'max', 'step', 'vertical', ['value1', 'value_first'], ['value2', 'value_second'],
      ['disableValues', 'values-runners'], ['oneRunner', 'one-runner']];
      // tslint:disable-next-line:ter-arrow-parens
      domNames.forEach(el => {
        typeof el === 'string' ?  this[`$${el}`] = this.$slider.find(`.slider__${el}`) : this[`$${el[0]}`] = this.$slider.find(`.slider__${el[1]}`);
      });
      // tslint:disable-next-line:ter-arrow-parens
      panel.forEach(el => {
        typeof el === 'string' ?  this[`$${el}`] = this.$slider.next().find(`.panel__${el}`) : this[`$${el[0]}`] = this.$slider.next().find(`.panel__${el[1]}`);
      });
    }
  }
  getDataFromAttr = () => {
    if (this.$slider !== null) {
      this.data = JSON.parse(this.$slider.attr('data-options'));
      this.data.widthScale = this.$scale.width();
      this.data.ballWidth = this.$ball1.width();
      this.$sliderCoords = this.getCoords(this.$scale);
    }
  }
  render = (data) => {
    const { value1, value2, min, max, step, disableValues, vertical, oneRunner, left, right } = data;
    const renderHtml = [['begin', min], ['end', max], ['num1', value1], ['num2', value2]];
    const renderVal = [['min', min], ['max', max], ['value1', value1], ['value2', value2], ['step', step]];
    const renderCss = [['between', vertical ? 'height' : 'width', right - left], ['between', vertical ? 'width' : 'height', '0.75rem'],
          ['between', 'left', vertical ? '0' : +left + +this.$ball1.width() / 2], ['between', 'top', vertical ? +left + +this.$ball1.width() / 2 : '0'],
          ['ball1', 'left', vertical ? '0' : left], ['ball1', 'transform', vertical ? 'translateX(-30%) translateY(0%)' : 'translateX(0%) translateY(-50%)'],
          ['ball1', 'top', vertical ? left : '50%'], ['ball2', 'left', vertical ? '0' : right],
          ['ball2', 'transform', vertical ? 'translateX(-30%) translateY(0%)' : 'translateX(0%) translateY(-50%)'], ['ball2', 'top', vertical ? right : '50%']];
    renderHtml.forEach(el => this[`$${el[0]}`].html(el[1]));
    renderVal.forEach(el => this[`$${el[0]}`].val(el[1]));
    renderCss.forEach(el => this[`$${el[0]}`].css(el[1], el[2]));
    this.disableValuesOverBalls(disableValues);
    this.sliderVertical(vertical);
    this.enableOneBall(oneRunner);
  }

  sendDatafromViewToController = () => this.data;

  addEventListeners = (changeState: any, dispatchBallValueFirst: any, dispatchBallValueSecond: any) => {
    const { min, max, step, disableValues, vertical, oneRunner, widthScale, ballWidth } = this.data;
    const props = { min, max, step, disableValues, vertical, oneRunner, widthScale, ballWidth };
    const propsArray = ['min', 'max', 'value1', 'value2', 'step'];
    const properties = ['disableValues', 'vertical', 'oneRunner'];

      // tslint:disable-next-line:ter-arrow-parens
    propsArray.forEach(el => {
      this[`$${el}`].change(() => {
        props[el] = this[`$${el}`].val();
        changeState(props);
      });
    });
      // tslint:disable-next-line:ter-arrow-parens
    properties.forEach(el => {
      this[`$${el}`].change(() => {
        props[el] = !props[el];
        changeState(props);
      });
    });
    this.$ball1.mousedown(() => this.mousedown(dispatchBallValueFirst, props));
    this.$ball2.mousedown(() => this.mousedown(dispatchBallValueSecond, props));
    this.$scale.on('click', (e: any) => this.clicker(e, props, { dispatchBallValueFirst, dispatchBallValueSecond }));
  }
  disableValuesOverBalls = (disableValues: boolean) => {
    disableValues ? this.$num1.addClass('slider__num_hide') : this.$num1.removeClass('slider__num_hide');
    disableValues ? this.$num2.addClass('slider__num_hide') : this.$num2.removeClass('slider__num_hide');
  }
  sliderVertical = (vertical) => {
    const verticalArray = ['range', 'scale', 'between', 'begin', 'end'];
    verticalArray.forEach(el => vertical ? this[`$${el}`].addClass(`slider__${el}_vertical`) : this[`$${el}`].removeClass(`slider__${el}_vertical`));
    vertical ? this.$num1.addClass('slider__num_vertical') : this.$num1.removeClass('slider__num_vertical');
    vertical ? this.$num2.addClass('slider__num_vertical') : this.$num2.removeClass('slider__num_vertical');
  }
  enableOneBall = (oneRunner) => {
    oneRunner ? this.$ball1.addClass('slider__ball_hide') : this.$ball1.removeClass('slider__ball_hide');
    oneRunner ? this.$value1.addClass('slider__value_white') : this.$value1.removeClass('slider__value_white');
  }
}

export default View;
