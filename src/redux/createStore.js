"use strict";
exports.__esModule = true;
function createStore(reducer) {
    var state;
    var callbacks = [];
    var getState = function () { return state; };
    var dispatch = function (action) {
        state = reducer(action, state);
        callbacks.forEach(function (callback) { return callback(); });
    };
    var subscribe = function (callback) {
        callbacks.push(callback);
        return callbacks.filter(function (cb) { return cb !== callback; });
    };
    return { getState: getState, dispatch: dispatch, subscribe: subscribe };
}
exports["default"] = createStore;
