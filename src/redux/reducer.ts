let initialState = {
    min: '',
    max: '',
    value1: '',
    value2: '',
    disableValues: undefined,
    vertical: undefined,
    oneRunner: undefined,
    step: '' 
}

const reducer = (action: {type: any; amount: any; }, state: any) => {

    switch (action.type){
        case 'LOAD_FIRST_DATA': 
            return {
                ...state,
                ...action.amount
            }
        case 'CHANGE_MIN': 
            return {
                ...state,
                min: action.amount
            }
        case 'CHANGE_MAX': 
            return {
                ...state,
                max: action.amount
            }
        case 'CHANGE_VALUE_FIRST': 
            return {
                ...state,
                value1: action.amount
            }
        case 'CHANGE_VALUE_SECOND': 
            return {
                ...state,
                value2: action.amount
            }
        case 'DISABLE_RUNNERS_VALUES': 
            return {
                ...state,
                disableValues: action.amount
            }
        case 'TOGGLE_VERTICAL_POSITION': 
            return {
                ...state,
                vertical: action.amount
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
        default: 
            return state;
    }
}

export default reducer;