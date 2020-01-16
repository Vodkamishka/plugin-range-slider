import {
    LOAD_FIRST_DATA,
    CHANGE_BALL_VALUE_FIRST,
    CHANGE_BALL_VALUE_SECOND,
    CHANGE_MIN,
    CHANGE_MAX,
    CHANGE_VALUE_FIRST,
    CHANGE_VALUE_SECOND,
    DISABLE_RUNNERS_VALUES,
    TOGGLE_VERTICAL_POSITION,
    ENABLE_ONE_RUNNER,
    CHANGE_STEP,
    CALCULATE_LEFT_FROM_VALUE,
    MADE_LEFT_ZERO 
    
    
} from './actions';

const loadFirstData = (data:any) => ({type: LOAD_FIRST_DATA, amount: data})
const changeBallValueFirst = (left: string) => ({type: CHANGE_BALL_VALUE_FIRST, amount: left})
const changeBallValueSecond = (right: string) => ({type: CHANGE_BALL_VALUE_SECOND,amount: right})
const changeMin = (min: string) => ({type: CHANGE_MIN, amount: min})
const changeMax = (max: string) => ({type: CHANGE_MAX, amount: max})
const changeValueFirst = (value: string) => ({type: CHANGE_VALUE_FIRST, amount: value})
const changeValueSecond = (value: string) => ({type: CHANGE_VALUE_SECOND, amount: value})
const disableRunnersValues = () => ({type: DISABLE_RUNNERS_VALUES})
const toggleVerticalPosition = () => ({type: TOGGLE_VERTICAL_POSITION})
const enableOneRunner = () => ({type: ENABLE_ONE_RUNNER})
const changeStep = (step: string) => ({type: CHANGE_STEP, amount: step})
const calculateLeftFromValue = () => ({type: CALCULATE_LEFT_FROM_VALUE})
const madeLeftZero = () => ({type: MADE_LEFT_ZERO })



export {
    loadFirstData,
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
}