import { IOptions } from '../../components/panel/panel';

interface ISliderCoords {
  left: number;
  top: number;
}

class View {
  $between: JQuery<HTMLElement>;
  $range: JQuery<HTMLElement>;
  $numFirst: JQuery<HTMLElement>;
  $numSecond: JQuery<HTMLElement>;
  $end: JQuery<HTMLElement>;
  $begin: JQuery<HTMLElement>;
  data: IOptions;
  $ballFirst: JQuery<HTMLElement>;
  $ballSecond: JQuery<HTMLElement>;
  $scale: JQuery<HTMLElement>;
  sliderCoords: ISliderCoords;
  options: IOptions;
  $wrapper: JQuery<HTMLElement>;
  constructor($wrapper: JQuery<HTMLElement>, options: IOptions) {
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
  mousedown = (dispatchBall: (left: number) => void, props: IOptions) => {
    const { vertical, step, widthScale, max, min, ballWidth } = props;
    const stepLength = step * widthScale / (max - min);
    const mousemove = (e: { pageY: number; pageX: number; }) => {
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
  clicker = (e: { pageY: number; pageX: number; }, props: IOptions,
             dispatch: { dispatchBallValueFirst: (left: number) => void;
               dispatchBallValueSecond: (left: number) => void; }) => {
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
      const domNames = ['scale', 'between', 'begin', 'end',  ['ballFirst', 'ball_first'], ['ballSecond', 'ball_second'],
      ['numFirst', 'num_first'], ['numSecond', 'num_second']];
      domNames.forEach((el: string | string[]) => {
        typeof el === 'string' ?  this[`$${el}`] = this.$wrapper.find(`.js-slider__${el}`) : this[`$${el[0]}`] = this.$wrapper.find(`.js-slider__${el[1]}`);
      });
    }
  }
  loadOptionsToThisData = () => {
    if (this.$wrapper) {
      this.data = this.options;
      this.data.widthScale = this.$scale.width();
      this.data.ballWidth = this.$ballFirst.width();
      this.sliderCoords = this.getCoords(this.$scale);
    }
  }
  render = (data: IOptions) => {
    const { valueFirst, valueSecond, min, max, disableValues, vertical, oneRunner, left, right } =
    data;
    const renderHtml = [['begin', min], ['end', max], ['numFirst', valueFirst],
    ['numSecond', valueSecond]];
    const renderCss = [['between', vertical ? 'height' : 'width', right - left],
    ['between', vertical ? 'width' : 'height', '0.75rem'],
    ['between', 'left', vertical ? '0' : +left + +this.$ballFirst.width() / 2],
    ['between', 'top', vertical ? +left + +this.$ballFirst.width() / 2 : '0'],
    ['ballFirst', 'left', vertical ? '0' : left],
      ['ballFirst', 'transform', vertical ? 'translateX(-30%) translateY(0%)' :
    'translateX(0%) translateY(-50%)'], ['ballFirst', 'top', vertical ? left : '50%'],
    ['ballSecond', 'left', vertical ? '0' : right],
      ['ballSecond', 'transform', vertical ? 'translateX(-30%) translateY(0%)' :
    'translateX(0%) translateY(-50%)'], ['ballSecond', 'top', vertical ? right : '50%']];
    renderHtml.forEach(el => this[`$${el[0]}`].html(el[1]));
    renderCss.forEach(el => this[`$${el[0]}`].css(el[1], el[2]));
    this.disableValuesOverBalls(disableValues);
    this.sliderVertical(vertical);
    this.enableOneBall(oneRunner);
  }

  sendDatafromViewToController = () => this.data;

  addEventListeners = (dispatchBallValueFirst: (left: string | number) => void,
                       dispatchBallValueSecond: (left: string | number) => void,
                       getState: () => IOptions) => {
    this.$ballFirst.mousedown(() => this.mousedown(dispatchBallValueFirst, getState()));
    this.$ballSecond.mousedown(() => this.mousedown(dispatchBallValueSecond, getState()));
    this.$scale.on('click', (e: { pageY: number; pageX: number; }) =>
    this.clicker(e, getState(), { dispatchBallValueFirst,
      dispatchBallValueSecond }));
  }
  disableValuesOverBalls = (disableValues: boolean) => {
    disableValues ? this.$numFirst.addClass('slider__num_hide') : this.$numFirst.removeClass('slider__num_hide');
    disableValues ? this.$numSecond.addClass('slider__num_hide') : this.$numSecond.removeClass('slider__num_hide');
  }
  sliderVertical = (vertical: boolean) => {
    const verticalArray = ['scale', 'between', 'begin', 'end'];
    verticalArray.forEach(el => vertical ? this[`$${el}`].addClass(`slider__${el}_vertical`) : this[`$${el}`].removeClass(`slider__${el}_vertical`));
    vertical ? this.$range.addClass('slider_vertical') : this.$range.removeClass('slider_vertical');
    vertical ? this.$numFirst.addClass('slider__num_vertical') : this.$numFirst.removeClass('slider__num_vertical');
    vertical ? this.$numSecond.addClass('slider__num_vertical') : this.$numSecond.removeClass('slider__num_vertical');
  }
  enableOneBall = (oneRunner: boolean) => oneRunner ?
  this.$ballFirst.addClass('slider__ball_hide') :
  this.$ballFirst.removeClass('slider__ball_hide')
}

export { View };
