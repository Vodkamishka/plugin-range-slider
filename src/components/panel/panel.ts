interface IOptions {
  valueFirst?: number;
  valueSecond?: number;
  min?: number;
  max?: number;
  step?: number;
  disableValues?: boolean;
  vertical?: boolean;
  oneRunner?: boolean;
  render?: (data) => void;
  addEventListeners?: (dispatchState) => void;
  widthScale?: number;
  ballWidth?: number;
  left?: number;
  right?: number;
}

class Panel {
  $wrapper: JQuerySupport;
  data: IOptions;
  $valueFirst: JQuery<HTMLElement>;
  slider: JQuery<HTMLElement>;
  constructor(element: JQuerySupport) {
    this.$wrapper = element;
    this.init();
  }
  init = () => {
    this.findDom();
    this.getDataFromAttr();
    this.slider = this.$wrapper.slider(this.data);
  }
  getDataFromAttr = () => {
    if (this.$wrapper) this.data = JSON.parse(this.$wrapper.attr('data-options'));
    this.data.render = this.render;
    this.data.addEventListeners = this.addEventListeners;
  }
  findDom = () => {
    if (this.$wrapper) {
      const panel = ['min', 'max', 'step', 'vertical', ['valueFirst', 'value_first'],
      ['valueSecond', 'value_second'], ['disableValues', 'values-runners'],
      ['oneRunner', 'one-runner']];
      panel.forEach((el: string) => {
        typeof el === 'string' ?  this[`$${el}`] = this.$wrapper.find(`.panel__${el}`) : this[`$${el[0]}`] = this.$wrapper.find(`.panel__${el[1]}`);
      });
    }
  }
  addEventListeners = (dispatchState: (props: IOptions) => void) => {
    const { min, max, step, disableValues, vertical, oneRunner, widthScale, ballWidth } = this.data;
    const props = { min, max, step, disableValues, vertical, oneRunner, widthScale, ballWidth };
    const propsArray = ['min', 'max', 'valueFirst', 'valueSecond', 'step'];
    const properties = ['disableValues', 'vertical', 'oneRunner'];
    propsArray.forEach((el: string) => {
      this[`$${el}`].change(() => {
        props[el] = this[`$${el}`].val();
        dispatchState(props);
      });
    });
    properties.forEach((el: string) => {
      this[`$${el}`].change(() => {
        props[el] = !props[el];
        dispatchState(props);
      });
    });
  }
  render = (data: IOptions) => {
    const { valueFirst, valueSecond, min, max, step, oneRunner } = data;
    const renderVal = [['min', min], ['max', max], ['valueFirst', valueFirst],
    ['valueSecond', valueSecond], ['step', step]];
    renderVal.forEach(el => this[`$${el[0]}`].val(el[1]));
    oneRunner ? this.$valueFirst.addClass('panel__value_white') : this.$valueFirst.removeClass('panel__value_white');
  }
}

export { Panel, IOptions };
