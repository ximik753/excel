import { APPLY_STYLE, CHANGE_TITLE, CHANGE_TEXT, CHANGES_STYLES, TABLE_RESIZE } from '@/redux/types'

export function tableResize (data) {
    return { type: TABLE_RESIZE, data }
}

export function changeText (data) {
    return { type: CHANGE_TEXT, data }
}

export function changeStyles (data) {
    return { type: CHANGES_STYLES, data }
}

export function applyStyle (data) {
    return { type: APPLY_STYLE, data }
}

export function changeTitle (data) {
    return { type: CHANGE_TITLE, data }
}
