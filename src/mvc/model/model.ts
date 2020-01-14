import createStore from '../../redux/createStore';
import reducer from '../../redux/reducer';
import { loadFirstData,
    changeBallValueFirst,
    changeBallValueSecond,
    changeMin,
    changeMax,
    changeValueFirst,
    changeValueSecond,
    disableRunnersValues,
    toggleVerticalPosition,
    enableOneRunner,
    changeStep,
    calculateLeftFromValue} from '../../redux/actionCreators';

class Model {
    wrapper: HTMLElement | null
    store: { getState: () => any; dispatch: (action: any) => void; subscribe: (callback: any) => any[]; };
    constructor(value: HTMLElement) {
        this.wrapper = value
        this.store = createStore(reducer);
    }
   
    getDataFromController = (options: any) => {
        this.store.dispatch(loadFirstData(options))
        this.store.dispatch(calculateLeftFromValue())
    }
    subscribe = (f: any) => this.store.subscribe(() => f(this.store.getState()))
    dispatchBallValueFirst = (left) => this.store.dispatch(changeBallValueFirst(left))
    dispatchBallValueSecond = (right) => this.store.dispatch(changeBallValueSecond(right))
    dispatchMin = (min) => this.store.dispatch(changeMin(min))
    dispatchMax = (max) => this.store.dispatch(changeMax(max))
    dispatchValueFirst = (value) => {
        this.store.dispatch(changeValueFirst(value))
        this.store.dispatch(calculateLeftFromValue())
    }
    dispatchValueSecond = (value) => {
        this.store.dispatch(changeValueSecond(value))
        this.store.dispatch(calculateLeftFromValue())
    }
    dispatchDisableValues = () => this.store.dispatch(disableRunnersValues())
    dispatchVerticalView = () => this.store.dispatch(toggleVerticalPosition())
}

export default Model;