class Panel {
  $wrapper: any;
  data: any;
  slider: any;
  $value1: any;
  constructor(element: any) {
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
      const panel = ['min', 'max', 'step', 'vertical', ['value1', 'value_first'], ['value2', 'value_second'],
      ['disableValues', 'values-runners'], ['oneRunner', 'one-runner']];
      // tslint:disable-next-line:ter-arrow-parens
      panel.forEach((el => {
        typeof el === 'string' ?  this[`$${el}`] = this.$wrapper.find(`.panel__${el}`) : this[`$${el[0]}`] = this.$wrapper.find(`.panel__${el[1]}`);
      }));
    }
  }
  addEventListeners = (dispatchState: any) => {
    const { min, max, step, disableValues, vertical, oneRunner, widthScale, ballWidth } = this.data;
    const props = { min, max, step, disableValues, vertical, oneRunner, widthScale, ballWidth };
    const propsArray = ['min', 'max', 'value1', 'value2', 'step'];
    const properties = ['disableValues', 'vertical', 'oneRunner'];
      // tslint:disable-next-line:ter-arrow-parens
    propsArray.forEach(el => {
      this[`$${el}`].change(() => {
        props[el] = this[`$${el}`].val();
        dispatchState(props);
      });
    });
      // tslint:disable-next-line:ter-arrow-parens
    properties.forEach(el => {
      this[`$${el}`].change(() => {
        props[el] = !props[el];
        dispatchState(props);
      });
    });
  }
  render = (data: { value1: any; value2: any; min: any; max: any; step: any; oneRunner: any; }) => {
    const { value1, value2, min, max, step, oneRunner } = data;
    const renderVal = [['min', min], ['max', max], ['value1', value1], ['value2', value2], ['step', step]];
    renderVal.forEach(el => this[`$${el[0]}`].val(el[1]));
    oneRunner ? this.$value1.addClass('panel__value_white') : this.$value1.removeClass('panel__value_white');
  }
}

export default Panel;
