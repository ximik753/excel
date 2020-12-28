import { ExcelComponent } from '@core/ExcelComponent'
import * as actions from '@/redux/actions'
import { $ } from '@core/dom'

export class Header extends ExcelComponent {
    static className = 'excel__header'

    constructor ($root, options) {
        super($root, {
            name: 'Header',
            listeners: ['input'],
            ...options
        })
    }

    toHTML () {
        const title = this.store.getState().title
        return `
            <input class="input" type="text" value="${title}"/>
            <div>
                <div class="button">
                    <span class="material-icons">delete</span>
                </div>
                <div class="button">
                    <span class="material-icons">exit_to_app</span>
                </div>
            </div>
        `
    }

    onInput (event) {
        const $target = $(event.target)
        this.$dispatch(actions.changeTitle($target.text()))
    }
}
