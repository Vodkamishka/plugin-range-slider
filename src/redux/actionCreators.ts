import {
    LOAD_FIRST_DATA,
    CHANGE_BALL_VALUE_FIRST,
    CHANGE_BALL_VALUE_SECOND,
    CHANGE_STATE,
    
} from './actions';

const loadFirstData = (data:any) => ({type: LOAD_FIRST_DATA, amount: data})
const changeBallValueFirst = (left: string) => ({type: CHANGE_BALL_VALUE_FIRST, amount: left})
const changeBallValueSecond = (right: string) => ({type: CHANGE_BALL_VALUE_SECOND,amount: right})
const changeState = (props: any) => ({type: CHANGE_STATE, amount: props})

export {
    loadFirstData,
    changeBallValueFirst,
    changeBallValueSecond,
    changeState,
}