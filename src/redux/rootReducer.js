import { APPLY_STYLE, CHANGE_TITLE, CHANGE_TEXT, CHANGES_STYLES, TABLE_RESIZE, UPDATE_DATE } from '@/redux/types'

export function rootReducer (state, action) {
    let field
    let val
    switch (action.type) {
        case TABLE_RESIZE:
            field = action.data.type === 'col' ? 'colState' : 'rowState'
            return { ...state, [field]: value(state, action, field) }
        case CHANGE_TEXT:
            field = 'dataState'
            return { ...state, currentText: action.data.value, [field]: value(state, action, field) }
        case CHANGES_STYLES:
            return { ...state, currentStyles: action.data }
        case APPLY_STYLE:
            val = state.stylesState || {}
            action.data.ids.forEach(id => {
                val[id] = { ...val[id], ...action.data.value }
            })
            return { ...state, stylesState: val, currentStyles: { ...state.currentStyles, ...action.data.value } }
        case CHANGE_TITLE:
            return { ...state, title: action.data }
        case UPDATE_DATE:
            return { ...state, openedDate: new Date().toJSON() }
        default:
            return state
    }
}

function value (state, action, field) {
    const val = state[field] || {}
    val[action.data.id] = action.data.value

    return val
}
