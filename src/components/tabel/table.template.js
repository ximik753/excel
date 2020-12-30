import { toInlineStyles } from '@core/utils'
import { defaultStyles } from '@/constans'
import { parse } from '@core/parse'

const CODES = {
    A: 65,
    Z: 90
}

const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 20

function getWidth (state, index) {
    return `${state[index] || DEFAULT_WIDTH}px`
}

function getHeight (state, index) {
    return `${state[index] || DEFAULT_HEIGHT}px`
}

function createCol (content, index, width) {
    return `
        <div class="column" data-type="resizable" data-col=${index} style="width: ${width}">
            ${content}
            <div class="col-resize" data-resize="col"></div>
        </div>
    `
}

function createCell (row, state) {
    return (_, col) => {
        const width = getWidth(state.colState, col)
        const id = `${row}:${col}`
        const data = state.dataState[id] || ''
        const styles = toInlineStyles({ ...defaultStyles, ...state.stylesState[id] })

        return `
            <div 
                class="cell" 
                data-col=${col} 
                data-id="${id}" 
                data-type="cell"
                data-value="${data || ''}"
                contenteditable
                style="${styles}; width: ${width}"
            >${parse(data)}</div>
        `
    }
}

function createRow (index, content, state) {
    const resize = index ? ' <div class="row-resize" data-resize="row"></div>' : ''
    const height = getHeight(state, index)

    return `
        <div class="row" data-type="resizable" data-row="${index}" style="height: ${height}">
            <div class="row-info">
                ${index || ''}
                ${resize}
            </div>
            <div class="row-data">${content}</div>
        </div>
    `
}

function toChar (_, index) {
    return String.fromCharCode(CODES.A + index)
}

export function createTable (rowsCount = 25, state = {}) {
    const colsCount = CODES.Z - CODES.A + 1
    const rows = []

    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map((col, index) => {
            const width = getWidth(state.colState, index)
            return createCol(col, index, width)
        })
        .join('')

    rows.push(createRow(null, cols, {}))

    for (let row = 0; row < rowsCount; row++) {
        const cells = new Array(colsCount)
            .fill('')
            .map(createCell(row, state))
            .join('')

        rows.push(createRow(row + 1, cells, state.rowState))
    }

    return rows.join('')
}
