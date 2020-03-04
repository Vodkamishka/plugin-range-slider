import { view } from './script.test';

const options = {
  valueFirst: '5000', 
  valueSecond: '15000', 
  min: '0', max: '25000', 
  step: '50', 
  disableValues: false, 
  vertical: false, 
  oneRunner: false, 
  render: Function, 
  addEventListeners: Function, 
  widthScale: 776, 
}

const { $begin, $end, $numFirst, $numSecond, $between, $ballFirst, $ballSecond, $scale } = view;

beforeEach(() => {
 spyOn(view, 'createSlider');
 spyOn(view, 'findDom');
 spyOn(view, 'loadOptionsToThisData');
 spyOn(view, 'disableValuesOverBalls');
 spyOn(view, 'sliderVertical');
 spyOn(view, 'enableOneBall');
 spyOn($ballFirst, 'mousedown');
 spyOn($ballSecond, 'mousedown');
 spyOn($scale, 'on');
});

describe('Тестирование View', function () {

  it('Создается экземпляр класса View', () => {
    expect(view).toBeDefined(); 
  });


  it('Функция init должна запустить три метода createSlider, findDom, loadOptionsToThisData', () => {
    view.init()
    expect(view.createSlider).toHaveBeenCalled();
    expect(view.findDom).toHaveBeenCalled();
    expect(view.loadOptionsToThisData).toHaveBeenCalled();
  });
})

describe('Тестирование методов View', function () {

  it('Тестирование функции getCoords', () => {
    expect(view.getCoords($scale)).toEqual({top: 8, left: 8});
  })

  it('Тестирование функции render', () => {
    
    view.render(options);
    const { valueFirst, valueSecond, min, max, disableValues, vertical, oneRunner } = options;

    expect($begin.html()).toBe(min);
    expect($end.html()).toBe(max);
    expect($numFirst.html()).toBe(valueFirst);
    expect($numSecond.html()).toBe(valueSecond);
    expect($between.css('height')).toBe('12px');
    expect($between.css('top')).toBe('0px');
    expect($ballFirst.css('transform')).toBe('matrix(1, 0, 0, 1, 0, -9)');
    expect($ballFirst.css('top')).toBe('50%');
    expect($ballSecond.css('transform')).toBe('matrix(1, 0, 0, 1, 0, -9)');
    expect($ballSecond.css('top')).toBe('50%');
    
    expect(view.disableValuesOverBalls).toHaveBeenCalledWith(disableValues);
    expect(view.sliderVertical).toHaveBeenCalledWith(vertical);
    expect(view.enableOneBall).toHaveBeenCalledWith(oneRunner);
   
  })

  it('Тестирование функции addEventListeners', () => {
    view.addEventListeners()
    expect($ballFirst.mousedown).toHaveBeenCalled();
    expect($ballSecond.mousedown).toHaveBeenCalled();
    expect($scale.on).toHaveBeenCalled();
  })

})

