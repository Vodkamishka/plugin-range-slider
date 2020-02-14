const loadFirstData = (data:any) => ({ type: 'LOAD_FIRST_DATA', amount: data });
const changeBallValueFirst = (left: string) => ({ type: 'CHANGE_BALL_VALUE_FIRST', amount: left });
// tslint:disable-next-line:max-line-length
const changeBallValueSecond = (right: string) => ({ type: 'CHANGE_BALL_VALUE_SECOND', amount: right });
const changeState = (props: any) => ({ type: 'CHANGE_STATE', amount: props });
// tslint:disable-next-line:max-line-length
const calcLeftRight = ({ ballWidth }, value: number, min: number, max: number, widthScale: number) => (value - min) * widthScale / (max - min) - ballWidth / 2;
const widthStep = (state) => {
  const { step, widthScale, max, min } = state;
  return step * widthScale / (max - min);
};
const calcValue = (state, leftOrRight) => {
  const { ballWidth, max, min, widthScale } = state;
  return Math.round((+leftOrRight + +ballWidth / 2) * (max - min) / widthScale + +min);
};

class Model {
  store: any;
  constructor() {
    this.store = this.createStore(this.reducer);
  }
  createStore = (reducer: any) => {
    let state: any;
    const callbacks: any[] = [];

    const getState = () => state;

    const dispatch = (action: any) => {
      state = reducer(action, state);
      callbacks.forEach(callback => callback());
    };

    // tslint:disable-next-line:max-line-length
    const subscribe = (arrayCallbacks: any) => arrayCallbacks.forEach((callback: any) => callbacks.push(callback));

    return { getState, dispatch, subscribe };
  }

  reducer = (action: {type: string; amount: any; }, state: any) => {
    switch (action.type){
      case 'LOAD_FIRST_DATA':
        return {
          ...state,
          ...action.amount,
          // tslint:disable-next-line:max-line-length
          left: action.amount.oneRunner ? -action.amount.ballWidth / 2 : calcLeftRight(action.amount, action.amount.value1, action.amount.min, action.amount.max, action.amount.widthScale),
          // tslint:disable-next-line:max-line-length
          right: calcLeftRight(action.amount, action.amount.value2, action.amount.min, action.amount.max, action.amount.widthScale),
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
        // tslint:disable-next-line:block-spacing
        if (action.amount <= state.left) {action.amount = state.left; }
        return {
          ...state,
          right: action.amount,
          value2: calcValue(state, action.amount),
        };

      case 'CHANGE_STATE':
        // tslint:disable-next-line:prefer-const
        let { value1, value2, min, max, step, disableValues, vertical, oneRunner } = action.amount;

        step = Number(step) <= 0 ? state.step : step;
        step = Number(step) >= Number(max) ? state.step : step;

        value1 = value1 || state.value1;
        value2 = value2 || state.value2;

        let widthScale = state.widthScale;
        if (vertical !== state.vertical && vertical === true) widthScale = widthScale / 3;
        if (vertical !== state.vertical && vertical === false) widthScale = widthScale * 3;

        let left = state.left;
        let right = state.right;

        if (Number(value1) >= value2 - step || Number(value1) < Number(min)) value1 = state.value1;
        // tslint:disable-next-line:max-line-length
        if (Number(value2) <= Number(value1) + Number(step) || Number(value2) > Number(max)) value2 = state.value2;

        if (Number(min) >= Number(max) + Number(step)) min = state.min;
        value1 = (Number(min) >= Number(value1)) ? min : value1;
        if (Number(min) > Number(value2)) {
          value1 = min;
          value2 = Number(min) + Number(step);
        }

        if (Number(max) <= Number(min) + Number(step)) max = state.max;
        value2 = (Number(max) <= Number(value2)) ? max : value2;
        if (Number(max) <= Number(value1)) {
          value2 = max;
          value1 = max - step;
        }

        // tslint:disable-next-line:max-line-length
        if (min !== state.min || max !== state.max || vertical !== state.vertical || value1 !== state.value1 ||
                value2 !== state.value2) {
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
          value1: oneRunner ? min : value1,
          // tslint:disable-next-line:object-shorthand-properties-first
          value2,
          left: oneRunner ? -state.ballWidth / 2 : left,
          // tslint:disable-next-line:object-shorthand-properties-first
          right,
          // tslint:disable-next-line:object-shorthand-properties-first
          widthScale,

        };
      default:
        return state;
    }
  }

  sendDataFromControllerToModel = (options: any) => this.store.dispatch(loadFirstData(options));
  // tslint:disable-next-line:max-line-length
  subscribe = (renderView: any, renderPanel: any) => this.store.subscribe([() => renderView(this.store.getState()), () => renderPanel(this.store.getState())]);
  dispatchBallValueFirst = (left: string) => this.store.dispatch(changeBallValueFirst(left));
  dispatchBallValueSecond = (right: string) => this.store.dispatch(changeBallValueSecond(right));
  dispatchState = (options: any) => this.store.dispatch(changeState(options));
  getState = () => this.store.getState();
}

export default Model;
// tslint:disable-next-line:max-line-length
export { loadFirstData, changeBallValueFirst, changeBallValueSecond, changeState, calcLeftRight, widthStep, calcValue };
