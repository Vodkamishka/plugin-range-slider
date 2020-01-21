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
var calcLeftRight = function (state, value, min, max, widthScale) { return (value - min) * widthScale / (max - min) - state.ballWidth / 2; };
var widthStep = function (state) { return state.step * state.widthScale / (state.max - state.min); };
var calcValue = function (state, leftOrRight) { return Math.round((+leftOrRight + +state.ballWidth / 2) * (state.max - state.min) / state.widthScale + +state.min); };
var reducer = function (action, state) {
    switch (action.type) {
        case 'LOAD_FIRST_DATA':
            return __assign(__assign(__assign({}, state), action.amount), { left: action.amount.oneRunner ? -action.amount.ballWidth / 2 : calcLeftRight(action.amount, action.amount.value1, action.amount.min, action.amount.max, action.amount.widthScale), right: calcLeftRight(action.amount, action.amount.value2, action.amount.min, action.amount.max, action.amount.widthScale) });
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
            var _a = action.amount, value1 = _a.value1, value2 = _a.value2, min = _a.min, max = _a.max, step = _a.step, disableValues = _a.disableValues, vertical = _a.vertical, oneRunner = _a.oneRunner;
            step = +step <= 0 ? state.step : step;
            step = +step >= +max ? state.step : step;
            value1 = value1 || state.value1;
            value2 = value2 || state.value2;
            var widthScale = state.widthScale;
            if (vertical !== state.vertical && vertical === true)
                widthScale = widthScale / 3;
            if (vertical !== state.vertical && vertical === false)
                widthScale = widthScale * 3;
            var left = state.left;
            var right = state.right;
            if (+value1 >= value2 - step || +value1 < +min)
                value1 = state.value1;
            if (+value2 <= +value1 + +step || +value2 > +max)
                value2 = state.value2;
            if (+min >= +max + +step)
                min = state.min;
            value1 = (+min >= +value1) ? min : value1;
            if (+min > +value2) {
                value1 = min;
                value2 = +min + +step;
            }
            if (+max <= +min + +step)
                max = state.max;
            value2 = (+max <= +value2) ? max : value2;
            if (+max <= +value1) {
                value2 = max;
                value1 = max - step;
            }
            if (min !== state.min || max !== state.max || vertical !== state.vertical || value1 !== state.value1 ||
                value2 !== state.value2) {
                left = calcLeftRight(state, value1, min, max, widthScale);
                right = calcLeftRight(state, value2, min, max, widthScale);
            }
            return __assign(__assign({}, state), { min: min,
                max: max,
                disableValues: disableValues,
                vertical: vertical,
                oneRunner: oneRunner,
                step: step,
                value1: value1,
                value2: value2, left: oneRunner ? -state.ballWidth / 2 : left, right: right,
                widthScale: widthScale });
        default:
            return state;
    }
};
exports["default"] = reducer;
