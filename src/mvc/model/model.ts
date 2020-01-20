import createStore from '../../redux/createStore';
import reducer from '../../redux/reducer';
import {loadFirstData,
    changeBallValueFirst,
    changeBallValueSecond,
    changeState,
    } from '../../redux/actionCreators';

class Model {
    store: {getState: () => any; dispatch: (action: any) => void; subscribe: (callback: any) => any[]; };
    constructor() {
        this.store = createStore(reducer);
    }
   
    getDataFromController = (options: any) => this.store.dispatch(loadFirstData(options))
        
    subscribe = (f: any) => this.store.subscribe(() => f(this.store.getState()))


    dispatchBallValueFirst = (left) => this.store.dispatch(changeBallValueFirst(left))
    dispatchBallValueSecond = (right) => this.store.dispatch(changeBallValueSecond(right))
    dispatchState = (options) => this.store.dispatch(changeState(options))
}

export default Model;