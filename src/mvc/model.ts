import {Options} from '../components/panel/panel';

const loadFirstData = (data: Options) => ({ type: 'LOAD_FIRST_DATA', amount: data });
const changeBallValueFirst = (left: number)=> ({ type: 'CHANGE_BALL_VALUE_FIRST', amount: left });
const changeBallValueSecond = (right: number) => ({
  type: 'CHANGE_BALL_VALUE_SECOND', amount: right });
const changeState = (props: Options) => ({ type: 'CHANGE_STATE', amount: props });
const calcLeftRight = ({ ballWidth }: Options, value: number, min: number, max: number,
                       widthScale: number) =>
                       (value - min) * widthScale / (max - min) - ballWidth / 2;
const widthStep = (state: Options) => {
  const { step, widthScale, max, min } = state;
  return step * widthScale / (max - min);
};
const calcValue = (state: Options, leftOrRight: number) => {
  const { ballWidth, max, min, widthScale } = state;
  return Math.round((leftOrRight + ballWidth / 2) * (max - min) / widthScale + min);
};

interface Store {
  getState: () => null | Options,
  dispatch: (action: {type: string, amount: number | Options}) => void,
  subscribe: (arrayCallbacks: [() => void, () => void]) => void
}

interface LoadFirstData {
  type: 'LOAD_FIRST_DATA',
  amount: Options
}

interface ChangeBallValueFirst {
  type: 'CHANGE_BALL_VALUE_FIRST',
  amount: number
}

interface ChangeBallValueSecond {
  type: 'CHANGE_BALL_VALUE_SECOND',
  amount: number
}

interface ChangeState {
  type: 'CHANGE_STATE',
  amount: Options
}

type Action = LoadFirstData | ChangeBallValueFirst | ChangeBallValueSecond | ChangeState;

class Model {
  store: Store;
  constructor() {
    this.store = this.createStore(this.reducer);
  }
  createStore = (reducer): Store => {
    let state;
    const callbacks = [];

    const getState = (): null | Options => state;

    const dispatch = (action: Action) => {
      state = reducer(action, state);
      callbacks.forEach(callback => callback());
    };

    const subscribe = (arrayCallbacks: [() => void, () => void]) =>
    arrayCallbacks.forEach((callback) => callbacks.push(callback));

    return { getState, dispatch, subscribe };
  }

  reducer = (action: Action, state: Options) => {
    switch (action.type){
      case 'LOAD_FIRST_DATA':
        return {
          ...state,
          ...action.amount,
          left: action.amount.oneRunner ? -action.amount.ballWidth / 2 :
          calcLeftRight(action.amount, action.amount.value1, action.amount.min,
                        action.amount.max, action.amount.widthScale),
          right: calcLeftRight(action.amount, action.amount.value2, action.amount.min,
                               action.amount.max, action.amount.widthScale),
        };
      case 'CHANGE_BALL_VALUE_FIRST':
        if (action.amount <= 0 - state.ballWidth / 2) {
          action.amount = 0 - state.ballWidth / 2;
        }
        if (action.amount >= state.right - widthStep(state)) {
          action.amount = state.right - widthStep(state);
        }
        return {
          ...state,
          left: action.amount,
          value1: calcValue(state, action.amount),
        };
      case 'CHANGE_BALL_VALUE_SECOND':
        if (action.amount >= state.widthScale - state.ballWidth / 2) {
          action.amount = state.widthScale - state.ballWidth / 2;
        }
        if (action.amount <= state.left) {
          action.amount = state.left;
        }
        return {
          ...state,
          right: action.amount,
          value2: calcValue(state, action.amount),
        };

      case 'CHANGE_STATE':
        let { value1, value2, step, min, max } = action.amount;
        const {  disableValues, vertical, oneRunner } = action.amount;

        step = step <= 0 ? state.step : step;
        step = step >= max ? state.step : step;

        value1 = value1 || state.value1;
        value2 = value2 || state.value2;

        let widthScale = state.widthScale;
        if (vertical !== state.vertical && vertical === true) widthScale = widthScale / 3;
        if (vertical !== state.vertical && vertical === false) widthScale = widthScale * 3;

        let left = state.left;
        let right = state.right;

        if (value1 >= value2 - step || value1 < min) value1 = state.value1;
        if (value2 <= value1 + step ||
        value2 > max) value2 = state.value2;

        if (min >= max + step) min = state.min;
        value1 = (min >= value1) ? min : value1;
        if (+min > value2) {
          value1 = min;
          value2 = min + step;
        }

        if (max <= min + step) max = state.max;
        value2 = (max <= value2) ? max : value2;
        if (max <= value1) {
          value2 = max;
          value1 = max - step;
        }

        if (min !== state.min || max !== state.max || vertical !== state.vertical ||
          value1 !== state.value1 || value2 !== state.value2) {
          left = calcLeftRight(state, value1, min, max, widthScale);
          right = calcLeftRight(state, value2, min, max, widthScale);
        }

        return {

          ...state,
          min,
          max,
          disableValues,
          vertical,
          oneRunner,
          step,
          value2,
          right,
          widthScale,
          value1: oneRunner ? min : value1,
          left: oneRunner ? -state.ballWidth / 2 : left,

        };
      default:
        return state;
    }
  }

  sendDataFromControllerToModel = (options: Options) => this.store.dispatch(loadFirstData(options));
  subscribe = (renderView, renderPanel) => this.store.subscribe([() =>
    renderView(this.store.getState()), () => renderPanel(this.store.getState())])
  dispatchBallValueFirst = (left: number)=> this.store.dispatch(changeBallValueFirst(left));
  dispatchBallValueSecond = (right: number) => this.store.dispatch(changeBallValueSecond(right));
  dispatchState = (options: Options) => this.store.dispatch(changeState(options));
  getState = () => this.store.getState();
}

export { Model, loadFirstData, changeBallValueFirst, changeBallValueSecond,
  changeState, calcLeftRight, widthStep, calcValue };
