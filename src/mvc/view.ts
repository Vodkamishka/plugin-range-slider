import {Data} from '../components/panel/panel';

interface SliderCoords {
  left: number;
  top: number;
}

class View {
  $between: JQuery<HTMLElement>;
  $range: JQuery<HTMLElement>;
  $num1: JQuery<HTMLElement>;
  $num2: JQuery<HTMLElement>;
  $end: JQuery<HTMLElement>;
  $begin: JQuery<HTMLElement>;
  data: Data;
  $ball1: JQuery<HTMLElement>;
  $ball2: JQuery<HTMLElement>;
  $scale: JQuery<HTMLElement>;
  sliderCoords: SliderCoords;
  options: Data;
  $wrapper: JQuery<HTMLElement>;
  constructor($wrapper: JQuery<HTMLElement>, options: Data) {
    this.$wrapper = $wrapper;
    this.options = options;
    this.init();
  }
  init = () => {
    this.createSlider();
    this.findDom();
    this.loadOptionsToThisData();
  }
  getCoords = (elem: JQuery<HTMLElement>) => {
    const box = elem[0].getBoundingClientRect();
    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset,
    };
  }
  createSlider() {
    this.$range = this.$wrapper.find('.js-slider');
    const slider = $(`
      <div class="slider__scale js-slider__scale">
        <div class="slider__between js-slider__between"></div>
        <div class="slider__begin js-slider__begin"></div>
        <div class="slider__end js-slider__end"></div>
      </div>
      <div class="slider__ball_first js-slider__ball_first">
        <div class="slider__num_first js-slider__num_first"></div>
      </div>
      <div class="slider__ball_second js-slider__ball_second">
        <div class="slider__num_second js-slider__num_second"></div>
      </div>
    `);
    this.$range.append(slider);
  }
  mousedown = (dispatchBall, props) => {
    const { vertical, step, widthScale, max, min, ballWidth } = props;
    const stepLength = step * widthScale / (max - min);
    const mousemove = (e) => {
      let left = vertical ? e.pageY - this.sliderCoords.top : e.pageX - this.sliderCoords.left;
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
      const { vertical, step, widthScale, max, min, ballWidth } = props;
      const stepLength = step * widthScale / (max - min);
      let left = vertical ? e.pageY - this.sliderCoords.top :
      e.pageX - this.sliderCoords.left;
      left = stepLength * Math.round(left / stepLength) - ballWidth / 2;
      left < widthScale / 2 ? dispatch.dispatchBallValueFirst(left) :
      dispatch.dispatchBallValueSecond(left);
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
      domNames.forEach((el: string | string[]) => {
        typeof el === 'string' ?  this[`$${el}`] = this.$wrapper.find(`.js-slider__${el}`) : this[`$${el[0]}`] = this.$wrapper.find(`.js-slider__${el[1]}`);
      });
    }
  }
  loadOptionsToThisData = () => {
    if (this.$wrapper) {
      this.data = this.options;
      this.data.widthScale = this.$scale.width();
      this.data.ballWidth = this.$ball1.width();
      this.sliderCoords = this.getCoords(this.$scale);
    }
  }
  render = (data) => {
    const { value1, value2, min, max, disableValues, vertical, oneRunner, left, right } = data;
    const renderHtml = [['begin', min], ['end', max], ['num1', value1], ['num2', value2]];
    const renderCss = [['between', vertical ? 'height' : 'width', right - left],
    ['between', vertical ? 'width' : 'height', '0.75rem'],
    ['between', 'left', vertical ? '0' : +left + +this.$ball1.width() / 2],
    ['between', 'top', vertical ? +left + +this.$ball1.width() / 2 : '0'],
    ['ball1', 'left', vertical ? '0' : left],
      ['ball1', 'transform', vertical ? 'translateX(-30%) translateY(0%)' :
    'translateX(0%) translateY(-50%)'], ['ball1', 'top', vertical ? left : '50%'],
    ['ball2', 'left', vertical ? '0' : right],
      ['ball2', 'transform', vertical ? 'translateX(-30%) translateY(0%)' :
    'translateX(0%) translateY(-50%)'], ['ball2', 'top', vertical ? right : '50%']];
    renderHtml.forEach(el => this[`$${el[0]}`].html(el[1]));
    renderCss.forEach(el => this[`$${el[0]}`].css(el[1], el[2]));
    this.disableValuesOverBalls(disableValues);
    this.sliderVertical(vertical);
    this.enableOneBall(oneRunner);
  }

  sendDatafromViewToController = () => this.data;

  addEventListeners = (dispatchBallValueFirst, dispatchBallValueSecond,
                       getState) => {
    this.$ball1.mousedown(() => this.mousedown(dispatchBallValueFirst, getState()));
    this.$ball2.mousedown(() => this.mousedown(dispatchBallValueSecond, getState()));
    this.$scale.on('click', (e) => this.clicker(e, getState(), { dispatchBallValueFirst,
      dispatchBallValueSecond }));
  }
  disableValuesOverBalls = (disableValues: boolean) => {
    disableValues ? this.$num1.addClass('slider__num_hide') : this.$num1.removeClass('slider__num_hide');
    disableValues ? this.$num2.addClass('slider__num_hide') : this.$num2.removeClass('slider__num_hide');
  }
  sliderVertical = (vertical: boolean) => {
    const verticalArray = ['scale', 'between', 'begin', 'end'];
    verticalArray.forEach(el => vertical ? this[`$${el}`].addClass(`slider__${el}_vertical`) : this[`$${el}`].removeClass(`slider__${el}_vertical`));
    vertical ? this.$range.addClass('slider_vertical') : this.$range.removeClass('slider_vertical');
    vertical ? this.$num1.addClass('slider__num_vertical') : this.$num1.removeClass('slider__num_vertical');
    vertical ? this.$num2.addClass('slider__num_vertical') : this.$num2.removeClass('slider__num_vertical');
  }
  enableOneBall = (oneRunner: boolean) => oneRunner ? this.$ball1.addClass('slider__ball_hide') :
  this.$ball1.removeClass('slider__ball_hide')
}

export default View;
