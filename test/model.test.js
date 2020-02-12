import Model from '../src/mvc/model/model.js';
import {loadFirstData, calcLeftRight} from '../src/mvc/model/model.js';

console.log(calcLeftRight)

/*const loadFirstData = (data:any) => ({ type: 'LOAD_FIRST_DATA', amount: data });
const changeBallValueFirst = (left: string) => ({ type: 'CHANGE_BALL_VALUE_FIRST', amount: left });
const changeBallValueSecond = (right: string) => ({ type: 'CHANGE_BALL_VALUE_SECOND', amount: right });
const changeState = (props: any) => ({ type: 'CHANGE_STATE', amount: props });
const calcLeftRight = (state, value, min, max, widthScale) => (value - min) * widthScale / (max - min) - state.ballWidth / 2;
const widthStep = (state: { step: number; widthScale: number; max: number; min: number; }) => state.step * state.widthScale / (state.max - state.min);
const calcValue = (state, leftOrRight) => Math.round((+leftOrRight + +state.ballWidth / 2) * (state.max - state.min) / state.widthScale + +state.min);*/

let model = new Model ();


describe('Тестирование Модели и вспомогательных функций', function () {
    
    it('Тестирование функции calcLeftRight', () => {
        expect(calcLeftRight({ballWidth: 16}, 5000, 0, 25000, 600)).toBe(112)
    });
    it('Создается экземпляр класса Model', () => {
        expect(model).toBeDefined();
    });
})




