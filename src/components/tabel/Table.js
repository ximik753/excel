import { ExcelComponent } from '@core/ExcelComponent'
import { createTable } from '@/components/tabel/table.template'
import { resizeHandler } from '@/components/tabel/table.resize'
import { shouldResize } from '@/components/tabel/table.functions'

export class Table extends ExcelComponent {
    static className = 'excel__table'

    constructor ($root) {
        super($root, {
            listeners: ['mousedown']
        })
    }

    toHTML () {
        return createTable(125)
    }

    onMousedown (event) {
        if (shouldResize(event)) {
            resizeHandler(this.$root, event)
        }
    }
}
