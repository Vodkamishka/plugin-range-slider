class View {
  $between: any;
  $range: any;
  $num1: any;
  $num2: any;
  $end: any;
  $begin: any;
  data: any;
  $ball1: any;
  $ball2: any;
  $scale: any;
  $sliderCoords: any;
  props: any;
  options: any;
  $wrapper: any;
  constructor($wrapper: any, options: any) {
    this.$wrapper = $wrapper;
    this.options = options;
    this.init();
  }
  init = () => {
    this.createSlider();
    this.findDom();
    this.loadOptionsToThisData();
  }
  getCoords = (elem: { getBoundingClientRect: () => any; }[]) => {
    const box = elem[0].getBoundingClientRect();
    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset,
    };
  }
  createSlider() {
    this.$range = this.$wrapper.find('.slider');
    const slider = $(`
      <div class="slider__scale">
        <div class="slider__between"></div>
        <div class="slider__begin"></div>
        <div class="slider__end"></div>
      </div>
      <div class="slider__ball_first">
        <div class="slider__num_first"></div>
      </div>
      <div class="slider__ball_second">
        <div class="slider__num_second"></div>
      </div>
    `);
    this.$range.append(slider);
  }
  mousedown = (dispatchBall, props) => {
    const { vertical, step, widthScale, max, min, ballWidth } = props;
    // tslint:disable-next-line:max-line-length
    const stepLength = vertical ? step * widthScale / ((max - min) * 3) : step * widthScale / (max - min);

    const mousemove = (e: any) => {
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
  clicker = (e: any, props: any, dispatch: any) => {
    const click = () => {
      const { vertical, widthScale, ballWidth } = props;
      // tslint:disable-next-line:max-line-length
      const left = vertical ? e.pageY - this.$sliderCoords.top - - ballWidth / 2 : e.pageX - this.$sliderCoords.left - ballWidth / 2;
      // tslint:disable-next-line:max-line-length
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
    if (this.$wrapper) {
      const domNames = ['scale', 'between', 'begin', 'end',  ['ball1', 'ball_first'], ['ball2', 'ball_second'],
      ['ball1', 'ball_first'], ['num1', 'num_first'], ['num2', 'num_second']];
      // tslint:disable-next-line:ter-arrow-parens
      domNames.forEach(el => {
        typeof el === 'string' ?  this[`$${el}`] = this.$wrapper.find(`.slider__${el}`) : this[`$${el[0]}`] = this.$wrapper.find(`.slider__${el[1]}`);
      });
    }
  }
  loadOptionsToThisData = () => {
    if (this.$wrapper) {
      this.data = this.options;
      this.data.widthScale = this.$scale.width();
      this.data.ballWidth = this.$ball1.width();
      this.$sliderCoords = this.getCoords(this.$scale);
    }
  }
  render = (data) => {
    const { value1, value2, min, max, disableValues, vertical, oneRunner, left, right } = data;
    const renderHtml = [['begin', min], ['end', max], ['num1', value1], ['num2', value2]];
    // tslint:disable-next-line:max-line-length
    const renderCss = [['between', vertical ? 'height' : 'width', right - left], ['between', vertical ? 'width' : 'height', '0.75rem'],
          // tslint:disable-next-line:max-line-length
          ['between', 'left', vertical ? '0' : +left + +this.$ball1.width() / 2], ['between', 'top', vertical ? +left + +this.$ball1.width() / 2 : '0'],
          ['ball1', 'left', vertical ? '0' : left], ['ball1', 'transform', vertical ? 'translateX(-30%) translateY(0%)' : 'translateX(0%) translateY(-50%)'],
          ['ball1', 'top', vertical ? left : '50%'], ['ball2', 'left', vertical ? '0' : right],
          ['ball2', 'transform', vertical ? 'translateX(-30%) translateY(0%)' : 'translateX(0%) translateY(-50%)'], ['ball2', 'top', vertical ? right : '50%']];
    renderHtml.forEach(el => this[`$${el[0]}`].html(el[1]));
    renderCss.forEach(el => this[`$${el[0]}`].css(el[1], el[2]));
    this.disableValuesOverBalls(disableValues);
    this.sliderVertical(vertical);
    this.enableOneBall(oneRunner);
  }

  sendDatafromViewToController = () => this.data;

  // tslint:disable-next-line:max-line-length
  addEventListeners = (dispatchBallValueFirst: any, dispatchBallValueSecond: any, getState: any) => {
    this.$ball1.mousedown(() => this.mousedown(dispatchBallValueFirst, getState()));
    this.$ball2.mousedown(() => this.mousedown(dispatchBallValueSecond, getState()));
    // tslint:disable-next-line:max-line-length
    this.$scale.on('click', (e: any) => this.clicker(e, getState(), { dispatchBallValueFirst, dispatchBallValueSecond }));
  }
  disableValuesOverBalls = (disableValues: boolean) => {
    disableValues ? this.$num1.addClass('slider__num_hide') : this.$num1.removeClass('slider__num_hide');
    disableValues ? this.$num2.addClass('slider__num_hide') : this.$num2.removeClass('slider__num_hide');
  }
  sliderVertical = (vertical) => {
    const verticalArray = ['scale', 'between', 'begin', 'end'];
    verticalArray.forEach(el => vertical ? this[`$${el}`].addClass(`slider__${el}_vertical`) : this[`$${el}`].removeClass(`slider__${el}_vertical`));
    vertical ? this.$range.addClass('slider_vertical') : this.$range.removeClass('slider_vertical');
    vertical ? this.$num1.addClass('slider__num_vertical') : this.$num1.removeClass('slider__num_vertical');
    vertical ? this.$num2.addClass('slider__num_vertical') : this.$num2.removeClass('slider__num_vertical');
  }
  // tslint:disable-next-line:max-line-length
  enableOneBall = (oneRunner: any) => oneRunner ? this.$ball1.addClass('slider__ball_hide') : this.$ball1.removeClass('slider__ball_hide');
}

export default View;
