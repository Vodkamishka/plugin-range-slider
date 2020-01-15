let initialState = {
    min: '',
    max: '',
    value1: '',
    value2: '',
    disableValues: undefined,
    vertical: undefined,
    oneRunner: undefined,
    step: '',
    left: '',
    right: '',
    widthScale: '',
    ballWidth: ''
}


const reducer = (action: {type: any; amount: any; }, state: any) => {
    switch (action.type){
        case 'LOAD_FIRST_DATA': 
            return {
                ...state,
                ...action.amount
            }
        case 'CHANGE_BALL_VALUE_FIRST':
            let left = action.amount;
            if (left <= 0 - state.ballWidth/2) {left = 0 - state.ballWidth/2}
            if (left >= state.right - state.step* state.widthScale/(state.max - state.min)) {left = state.right - state.step* state.widthScale/(state.max - state.min)}
            let value1 = Math.round((left + state.ballWidth/2) * (state.max - state.min) / state.widthScale + +state.min)
            return {
                ...state,
                left: left,
                value1: value1
            }
        case 'CHANGE_BALL_VALUE_SECOND':
            let right = action.amount;
            if (right >= state.widthScale - state.ballWidth/2) {right = state.widthScale - state.ballWidth/2} 
            if (right <= state.left + state.step* state.widthScale/(state.max - state.min)) {right = state.left + state.step* state.widthScale/(state.max - state.min)}
            let value2 = Math.round((right + state.ballWidth/2) * (state.max - state.min) / state.widthScale + +state.min)
            return {
                ...state,
                right: right,
                value2: value2
            }
        case 'CHANGE_MIN':
            if (action.amount >= state.max - state.step*state.widthScale/(state.max - state.min)) action.amount = state.min
            return {
                ...state,
                min: action.amount,
            }
        case 'CHANGE_MAX':
            if (action.amount <= +state.min + state.step*state.widthScale/(state.max - state.min)) action.amount = state.max
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
                oneRunner: action.amount
            }
        case 'CHANGE_STEP': 
            return {
                ...state,
                step: action.amount
            }
        case 'CALCULATE_LEFT_FROM_VALUE':
            let newLeft = (state.value1 - state.min)* state.widthScale/(state.max - state.min) - state.ballWidth/2;
            let newRight = (state.value2 - state.min)* state.widthScale/(state.max - state.min) - state.ballWidth/2;
            return {
                ...state,
                left: newLeft,
                right: newRight
            }
        default: 
            return state;
    }
}

export default reducer;