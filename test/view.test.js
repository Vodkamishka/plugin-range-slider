import {view} from './script.test';

const { $begin, $end, $num1, $num2, $between, $ball1, $ball2, data, $sliderCoords, $scale, $range } = view;

beforeEach(() => {
 spyOn(view, 'createSlider');
 spyOn(view, 'findDom');
 spyOn(view, 'loadOptionsToThisData');
 spyOn(view, 'disableValuesOverBalls');
 spyOn(view, 'sliderVertical');
 spyOn(view, 'enableOneBall');
 spyOn($ball1, 'mousedown');
 spyOn($ball2, 'mousedown');
 spyOn($scale, 'on');
});

describe('Тестирование View', function () {

  it('Создается экземпляр класса View', () => {
    expect(view).toBeDefined(); 
  });

  it('В конструкторе класса переменным присваиваются передаваемые аргументы', () => {
    expect(view.$wrapper).toBe($wrapper);
    expect(view.options).toBe(options);
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

  it('Тестирование функции loadOptionsToThisData', () => {
    view.loadOptionsToThisData();
    expect(data).toBe(options);
    expect($sliderCoords).toEqual({top: 8, left: 8});
  })
 
  it('Тестирование функции render', () => {
    
    view.render(options);
    const { value1, value2, min, max, disableValues, vertical, oneRunner } = options;

    expect($begin.html()).toBe(min);
    expect($end.html()).toBe(max);
    expect($num1.html()).toBe(value1);
    expect($num2.html()).toBe(value2);
    expect($between.css('height')).toBe('12px');
    //expect($between.css('left')).toBe('auto');
    expect($between.css('top')).toBe('0px');
    //expect($ball1.css('left')).toBe('auto');
    expect($ball1.css('transform')).toBe('matrix(1, 0, 0, 1, 0, -9)');
    expect($ball1.css('top')).toBe('50%');
    //expect($ball2.css('left')).toBe('auto');
    expect($ball2.css('transform')).toBe('matrix(1, 0, 0, 1, 0, -9)');
    expect($ball2.css('top')).toBe('50%');
    
    expect(view.disableValuesOverBalls).toHaveBeenCalledWith(disableValues);
    expect(view.sliderVertical).toHaveBeenCalledWith(vertical);
    expect(view.enableOneBall).toHaveBeenCalledWith(oneRunner);
   
  })

  it('Тестирование функции addEventListeners', () => {
    view.addEventListeners()
    expect($ball1.mousedown).toHaveBeenCalled();
    expect($ball2.mousedown).toHaveBeenCalled();
    expect($scale.on).toHaveBeenCalled();
  })

})

