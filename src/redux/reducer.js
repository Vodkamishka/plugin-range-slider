"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var calcLeftRight = function (state, value, min, max) { return (value - min) * state.widthScale / (max - min) - state.ballWidth / 2; };
var widthStep = function (state) { return state.step * state.widthScale / (state.max - state.min); };
var calcValue = function (state, leftOrRight) { return Math.round((leftOrRight + state.ballWidth / 2) * (state.max - state.min) / state.widthScale + +state.min); };
var reducer = function (action, state) {
    switch (action.type) {
        case 'LOAD_FIRST_DATA':
            return __assign(__assign(__assign({}, state), action.amount), { left: action.amount.oneRunner ? -action.amount.ballWidth / 2 : calcLeftRight(action.amount, action.amount.value1, action.amount.min, action.amount.max), right: calcLeftRight(action.amount, action.amount.value2, action.amount.min, action.amount.max) });
        case 'CHANGE_BALL_VALUE_FIRST':
            if (action.amount <= 0 - state.ballWidth / 2) {
                action.amount = 0 - state.ballWidth / 2;
            }
            if (action.amount >= state.right - widthStep(state)) {
                action.amount = state.right - widthStep(state);
            }
            return __assign(__assign({}, state), { left: action.amount, value1: calcValue(state, action.amount) });
        case 'CHANGE_BALL_VALUE_SECOND':
            if (action.amount >= state.widthScale - state.ballWidth / 2) {
                action.amount = state.widthScale - state.ballWidth / 2;
            }
            if (action.amount <= state.left) {
                action.amount = state.left;
            }
            return __assign(__assign({}, state), { right: action.amount, value2: calcValue(state, action.amount) });
        case 'CHANGE_STATE':
            var _a = action.amount, min = _a.min, max = _a.max, step = _a.step, value1 = _a.value1, value2 = _a.value2, disableValues = _a.disableValues, vertical = _a.vertical, oneRunner = _a.oneRunner;
            value1 = value1 || state.value1;
            value2 = value2 || state.value2;
            if (min >= max - step)
                min = state.min;
            if (max <= +min + +step)
                max = state.max;
            if (value1 >= value2 - state.step || value1 < min)
                value1 = state.value1;
            if (value2 <= +value1 + +step || value2 > max)
                value2 = state.value2;
            if (min >= value1 && min < value2) {
                value1 = min;
            }
            else if (min > value2) {
                value1 = min;
                value2 = +min + +step;
            }
            return __assign(__assign({}, state), { min: min,
                max: max,
                value1: value1,
                value2: value2,
                disableValues: disableValues,
                vertical: vertical,
                oneRunner: oneRunner,
                step: step, left: oneRunner ? -state.ballWidth / 2 : calcLeftRight(state, value1, min, max), right: calcLeftRight(state, value2, min, max) });
        default:
            return state;
    }
};
/*const reducer = (action: {type: any; amount: any; }, state: any) => {
    switch (action.type){
        case 'LOAD_FIRST_DATA':
            return {
                ...state,
                ...action.amount
            }
        case 'CHANGE_BALL_VALUE_FIRST':
            if (action.amount <= 0 - state.ballWidth/2) {action.amount = 0 - state.ballWidth/2}
            if (action.amount >= state.right - widthStep(state)) {action.amount = state.right - widthStep(state)}
            return {
                ...state,
                left: action.amount,
                value1: calcValue(state, action.amount)
            }
        case 'CHANGE_BALL_VALUE_SECOND':
            if (action.amount >= state.widthScale - state.ballWidth/2) {action.amount = state.widthScale - state.ballWidth/2}
            if (action.amount <= state.left) {action.amount = state.left}
            return {
                ...state,
                right: action.amount,
                value2: calcValue(state, action.amount)
            }
        case 'CHANGE_MIN':
            if (action.amount >= state.max - state.step) action.amount = state.min
            return {
                ...state,
                min: action.amount,
                value1: (action.amount >= state.value1) ? action.amount : state.value1,
                value2: (action.amount >= state.value2) ? +action.amount + +state.step : state.value2,
            }
        case 'CHANGE_MAX':
            if (action.amount <= +state.min + +state.step) action.amount = state.max
            return {
                ...state,
                max: action.amount,
               
            }
        case 'CHANGE_VALUE_FIRST':
            if (action.amount >= state.value2 - state.step || action.amount < state.min) action.amount = state.value1
            return {
                ...state,
                value1: action.amount
            }
        case 'CHANGE_VALUE_SECOND':
            if (action.amount <= +state.value1 + +state.step || action.amount > state.max) action.amount = state.value2
            return {
                ...state,
                value2: action.amount
            }
        case 'DISABLE_RUNNERS_VALUES':
            return {
                ...state,
                disableValues: !state.disableValues
            }
        case 'TOGGLE_VERTICAL_POSITION':
            return {
                ...state,
                vertical: !state.vertical
            }
        case 'ENABLE_ONE_RUNNER':
            return {
                ...state,
                oneRunner: !state.oneRunner,
                left: - state.ballWidth/2,
                value1: 0
            }
        case 'CHANGE_STEP':
            return {
                ...state,
                step: action.amount
            }
        case 'CALCULATE_LEFT_FROM_VALUE':
            return {
                ...state,
                left: state.oneRunner ? -state.ballWidth/2 : calcLeftRight(state, state.value1),
                right: calcLeftRight(state, state.value2)
            }
        case 'MADE_LEFT_ZERO':
            return {
                ...state,
                left: - state.ballWidth/2,
                value1: 0
                }
            
        default:
            return state;
    }
}*/
exports["default"] = reducer;
