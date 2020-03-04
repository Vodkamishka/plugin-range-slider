import { IOptions } from '../../components/panel/panel';

const loadFirstData = (data: IOptions) => ({ type: 'LOAD_FIRST_DATA', amount: data });
const changeBallValueFirst = (left: number) => ({ type: 'CHANGE_BALL_VALUE_FIRST', amount: left });
const changeBallValueSecond = (right: number) => ({
  type: 'CHANGE_BALL_VALUE_SECOND', amount: right });
const changeState = (props: IOptions) => ({ type: 'CHANGE_STATE', amount: props });
const calcLeftRight = ({ ballWidth }: IOptions, value: number, min: number, max: number,
                       widthScale: number) =>
                       (value - min) * widthScale / (max - min) - ballWidth / 2;
const widthStep = (state: IOptions) => {
  const { step, widthScale, max, min } = state;
  return step * widthScale / (max - min);
};
const calcValue = (state: IOptions, leftOrRight: number) => {
  const { ballWidth, max, min, widthScale } = state;
  return Math.round((leftOrRight + ballWidth / 2) * (max - min) / widthScale + min);
};

interface IStore {
  getState: () => null | IOptions;
  dispatch: (action: {type: string, amount: number | IOptions}) => void;
  subscribe: (arrayCallbacks: [() => void, () => void]) => void;
}

interface ILoadFirstData {
  type: 'LOAD_FIRST_DATA';
  amount: IOptions;
}

interface IChangeBallValueFirst {
  type: 'CHANGE_BALL_VALUE_FIRST';
  amount: number;
}

interface IChangeBallValueSecond {
  type: 'CHANGE_BALL_VALUE_SECOND';
  amount: number;
}

interface IChangeState {
  type: 'CHANGE_STATE';
  amount: IOptions;
}

type Action = ILoadFirstData | IChangeBallValueFirst | IChangeBallValueSecond | IChangeState;

class Model {
  store: IStore;
  constructor() {
    this.store = this.createStore(this.reducer);
  }
  createStore = (reducer): IStore => {
    let state;
    const callbacks = [];

    const getState = (): null | IOptions => state;

    const dispatch = (action: Action) => {
      state = reducer(action, state);
      callbacks.forEach(callback => callback());
    };

    const subscribe = (arrayCallbacks: [() => void, () => void]) =>
    arrayCallbacks.forEach((callback: () => void) => callbacks.push(callback));

    return { getState, dispatch, subscribe };
  }

  reducer = (action: Action, state: IOptions) => {
    switch (action.type){
      case 'LOAD_FIRST_DATA':
        return {
          ...state,
          ...action.amount,
          left: action.amount.oneRunner ? -action.amount.ballWidth / 2 :
          calcLeftRight(action.amount, action.amount.valueFirst, action.amount.min,
                        action.amount.max, action.amount.widthScale),
          right: calcLeftRight(action.amount, action.amount.valueSecond, action.amount.min,
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
          valueFirst: calcValue(state, action.amount),
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
          valueSecond: calcValue(state, action.amount),
        };

      case 'CHANGE_STATE':
        let { valueFirst, valueSecond, step, min, max } = action.amount;
        const {  disableValues, vertical, oneRunner } = action.amount;

        step = step <= 0 ? state.step : step;
        step = step >= max ? state.step : step;

        valueFirst = valueFirst || state.valueFirst;
        valueSecond = valueSecond || state.valueSecond;

        let widthScale = state.widthScale;
        if (vertical !== state.vertical && vertical === true) widthScale = widthScale / 3;
        if (vertical !== state.vertical && vertical === false) widthScale = widthScale * 3;

        let left = state.left;
        let right = state.right;

        if (valueFirst >= valueSecond - step || valueFirst < min) valueFirst = state.valueFirst;
        if (valueSecond <= valueFirst + step ||
        valueSecond > max) valueSecond = state.valueSecond;

        if (min >= max + step) min = state.min;
        valueFirst = (min >= valueFirst) ? min : valueFirst;
        if (+min > valueSecond) {
          valueFirst = min;
          valueSecond = min + step;
        }

        if (max <= min + step) max = state.max;
        valueSecond = (max <= valueSecond) ? max : valueSecond;
        if (max <= valueFirst) {
          valueSecond = max;
          valueFirst = max - step;
        }

        if (min !== state.min || max !== state.max || vertical !== state.vertical ||
          valueFirst !== state.valueFirst || valueSecond !== state.valueSecond) {
          left = calcLeftRight(state, valueFirst, min, max, widthScale);
          right = calcLeftRight(state, valueSecond, min, max, widthScale);
        }

        return {

          ...state,
          min,
          max,
          disableValues,
          vertical,
          oneRunner,
          step,
          valueSecond,
          right,
          widthScale,
          valueFirst: oneRunner ? min : valueFirst,
          left: oneRunner ? -state.ballWidth / 2 : left,

        };
      default:
        return state;
    }
  }

  sendDataFromControllerToModel = (options: IOptions) =>
  this.store.dispatch(loadFirstData(options))
  subscribe = (renderView, renderPanel) => this.store.subscribe([() =>
    renderView(this.store.getState()), () => renderPanel(this.store.getState())])
  dispatchBallValueFirst = (left: number) => this.store.dispatch(changeBallValueFirst(left));
  dispatchBallValueSecond = (right: number) => this.store.dispatch(changeBallValueSecond(right));
  dispatchState = (options: IOptions) => this.store.dispatch(changeState(options));
  getState = () => this.store.getState();
}

export { Model, loadFirstData, changeBallValueFirst, changeBallValueSecond,
  changeState, calcLeftRight, widthStep, calcValue };
