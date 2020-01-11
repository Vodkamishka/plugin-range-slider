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
var initialState = {
    min: '',
    max: '',
    value1: '',
    value2: '',
    disableValues: undefined,
    vertical: undefined,
    oneRunner: undefined,
    step: ''
};
var reducer = function (action, state) {
    switch (action.type) {
        case 'LOAD_FIRST_DATA':
            return __assign(__assign({}, state), action.amount);
        case 'CHANGE_MIN':
            return __assign(__assign({}, state), { min: action.amount });
        case 'CHANGE_MAX':
            return __assign(__assign({}, state), { max: action.amount });
        case 'CHANGE_VALUE_FIRST':
            return __assign(__assign({}, state), { value1: action.amount });
        case 'CHANGE_VALUE_SECOND':
            return __assign(__assign({}, state), { value2: action.amount });
        case 'DISABLE_RUNNERS_VALUES':
            return __assign(__assign({}, state), { disableValues: action.amount });
        case 'TOGGLE_VERTICAL_POSITION':
            return __assign(__assign({}, state), { vertical: action.amount });
        case 'ENABLE_ONE_RUNNER':
            return __assign(__assign({}, state), { oneRunner: action.amount });
        case 'CHANGE_STEP':
            return __assign(__assign({}, state), { step: action.amount });
        default:
            return state;
    }
};
exports["default"] = reducer;
