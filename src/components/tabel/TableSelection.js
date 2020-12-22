export class TableSelection {
    static className = 'selected'

    constructor () {
        this.group = []
        this.current = null
    }

    select ($el) {
        this.clear()
        $el.addClass(TableSelection.className).focus()
        this.group.push($el)
        this.current = $el
    }

    clear () {
        this.group.forEach($el => $el.removeClass(TableSelection.className))
        this.group = []
    }

    selectGroup ($group = []) {
        this.clear()
        this.group = $group
        $group.forEach($el => $el.addClass(TableSelection.className))
    }
}