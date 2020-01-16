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
    calculateLeftFromValue,
    madeLeftZero
    } from '../../redux/actionCreators';

class Model {
    store: { getState: () => any; dispatch: (action: any) => void; subscribe: (callback: any) => any[]; };
    constructor() {
        this.store = createStore(reducer);
    }
   
    getDataFromController = (options: any) => {
        this.store.dispatch(loadFirstData(options))
        this.store.dispatch(calculateLeftFromValue())
    }
    subscribe = (f: any) => this.store.subscribe(() => f(this.store.getState()))
    dispatchBallValueFirst = (left) => this.store.dispatch(changeBallValueFirst(left))
    dispatchBallValueSecond = (right) => this.store.dispatch(changeBallValueSecond(right))
    dispatchMin = (min) => {
        this.store.dispatch(changeMin(min))
        this.store.dispatch(calculateLeftFromValue())
    }
    dispatchMax = (max) => {
        this.store.dispatch(changeMax(max))
        this.store.dispatch(calculateLeftFromValue())
    }
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
    dispatchOneToggle = () => {
        this.store.dispatch(enableOneRunner())
        //this.store.dispatch(madeLeftZero())
    }
    dispatchStep = (step) => this.store.dispatch(changeStep(step))
}

export default Model;