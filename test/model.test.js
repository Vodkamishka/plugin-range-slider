import { loadFirstData, calcLeftRight, widthStep, calcValue, changeBallValueFirst,
    changeBallValueSecond,  changeState }  from '../src/slider/mvc/model.ts';

import { model } from './script.test';

const { createStore, reducer } =  model;
const store = createStore(reducer);

const shortState = {
  min: 0,
  max: 30000,
  disableValues: false,
  vertical: false,
  oneRunner: false,
  step: 50,
  valueFirst: 5000,
  valueSecond: 15000,
  widthScale: 600,
};
const state = {
  ...shortState,
  ballWidth: 30,
};

const initialState = {
  min: 0,
  max: 5000,
  disableValues: false,
  vertical: false,
  oneRunner: false,
  step: 100,
  valueFirst: 2000,
  valueSecond: 3000,
  widthScale: 200,
  ballWidth: 40,
};

describe('Тестирование вспомогательных функций', function () {

    it('Тестирование функции loadFirstData', () => {
        expect(loadFirstData({max: 7, min: 2})).toEqual({ type: 'LOAD_FIRST_DATA', amount: {max: 7, min: 2} })
    });

    it('Тестирование функции changeBallValueFirst', () => {
        expect(changeBallValueFirst('53')).toEqual({ type: 'CHANGE_BALL_VALUE_FIRST', amount: '53' })
    });

    it('Тестирование функции changeBallValueSecond', () => {
        expect(changeBallValueSecond('453')).toEqual({ type: 'CHANGE_BALL_VALUE_SECOND', amount: '453' })
    });

    it('Тестирование функции changeState', () => {
        expect(changeState({valueFirst: 34, valueSecond: 89})).toEqual({ type: 'CHANGE_STATE', amount: {valueFirst: 34, valueSecond: 89} })
    });

    it('Тестирование функции calcLeftRight', () => {
        expect(calcLeftRight({ballWidth: 16}, 5000, 0, 25000, 600)).toBe(112)
    });

    it('Тестирование функции widthStep', () => {
        expect(widthStep({step: 500, widthScale: 600, max: 60000, min: 20000})).toBe(7.5)
    });

    it('Тестирование функции calcValue', () => {
        expect(calcValue({ballWidth: 45, max: 125000, min: 2000, widthScale: 250}, 170)).toBe(96710)
    });

})

describe('Тестирование функции reducer', function () {

    it('Тестирование кейса LOAD_FIRST_DATA', () => {
        expect(reducer({type: 'LOAD_FIRST_DATA', amount: state}, {})).toEqual({...state, left: 85, right: 285})
    });

    it('Тестирование кейса CHANGE_BALL_VALUE_FIRST', () => {
        expect(reducer({type: 'CHANGE_BALL_VALUE_FIRST', amount: 43}, state)).toEqual({...state, left: 43, valueFirst: 2900})
    });

    it('Тестирование кейса CHANGE_BALL_VALUE_SECOND', () => {
        expect(reducer({type: 'CHANGE_BALL_VALUE_SECOND', amount: 80}, state)).toEqual({...state, right: 80, valueSecond: 4750})
    });

    it('Тестирование кейса CHANGE_STATE', () => {
        expect(reducer({type: 'CHANGE_STATE', amount: shortState}, {})).toEqual({...shortState, left: NaN, right: NaN, widthScale: NaN})
    });

})

describe('Тестирование функции createStore', function () {

    it('При срабатывании методов dispatch и getState возвращается объект с параметрами', () => {
        store.dispatch({type: 'LOAD_FIRST_DATA', amount: initialState})
        expect(store.getState()).toEqual({...initialState, left: 60, right: 100})
    });

})

describe('Тестирование Model', function () {

    it('Создается экземпляр класса Model', () => {
        expect(model).toBeDefined();
    });

})

beforeEach(() => {

    spyOn(model, 'sendDataFromControllerToModel');
    spyOn(model, 'subscribe');
    spyOn(model, 'dispatchBallValueFirst');
    spyOn(model, 'dispatchBallValueSecond');
    spyOn(model, 'dispatchState');
    spyOn(model, 'getState');
    
  });
    
describe('Тестирование функций Model', function () {

    it('Тестирование функции sendDataFromControllerToModel', () => {
        model.sendDataFromControllerToModel(state)
        expect(model.sendDataFromControllerToModel).toHaveBeenCalledWith(state)
    });

    it('Тестирование функции subscribe', () => {
        const f1 = () => 2, f2 = () => 3
        model.subscribe(f1, f2)
        expect(model.subscribe).toHaveBeenCalledWith(f1, f2)
    });

    it('Тестирование функции dispatchBallValueFirst', () => {
        model.dispatchBallValueFirst('40')
        expect(model.dispatchBallValueFirst).toHaveBeenCalledWith('40')
    });

    it('Тестирование функции dispatchBallValueSecond', () => {
        model.dispatchBallValueSecond('87')
        expect(model.dispatchBallValueSecond).toHaveBeenCalledWith('87')
    });

    it('Тестирование функции dispatchState', () => {
        model.dispatchState(shortState)
        expect(model.dispatchState).toHaveBeenCalledWith(shortState)
    });

    it('Тестирование функции getState', () => {
        model.getState()
        expect(model.getState).toHaveBeenCalledWith()
    });

});    

