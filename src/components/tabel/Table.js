import { ExcelComponent } from '@core/ExcelComponent'
import { createTable } from '@/components/tabel/table.template'
import { resizeHandler } from '@/components/tabel/table.resize'
import { isCell, matrix, nextSelector, shouldResize } from '@/components/tabel/table.functions'
import { TableSelection } from '@/components/tabel/TableSelection'
import { $ } from '@core/dom'

export class Table extends ExcelComponent {
    static className = 'excel__table'

    constructor ($root, options) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown'],
            ...options
        })
    }

    prepare () {
        this.selection = new TableSelection()
    }

    init () {
        super.init()

        this.selectCell(this.$root.find('[data-id="0:0"]'))

        this.$on('formula:input', text => this.selection.current.text(text))
        this.$on('formula:done', () => this.selection.current.focus())
    }

    selectCell ($cell) {
        this.selection.select($cell)
        this.$emit('table:select', $cell.text())
    }

    toHTML () {
        return createTable(25)
    }

    onMousedown (event) {
        if (shouldResize(event)) {
            resizeHandler(this.$root, event)
        } else if (isCell(event)) {
            const $target = $(event.target)

            if (event.shiftKey) {
                const cells = matrix($target, this.selection.current)
                    .map(id => this.$root.find(`[data-id="${id}"]`))
                this.selection.selectGroup(cells)
            } else {
                this.selection.select($target)
            }
        }
    }

    onKeydown (event) {
        const keys = ['Enter', 'Tab', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']
        const { key } = event

        this.$emit('table:input', $(event.target).text())

        if (keys.includes(key) && !event.shiftKey) {
            event.preventDefault()
            const id = this.selection.current.id(true)
            const $next = this.$root.find(nextSelector(key, id))
            this.selectCell($next)
        }
    }
}
