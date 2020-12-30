import { ExcelComponent } from '@core/ExcelComponent'
import * as actions from '@/redux/actions'
import { $ } from '@core/dom'
import { ActiveRoute } from '@core/routes/ActiveRoute'

export class Header extends ExcelComponent {
    static className = 'excel__header'

    constructor ($root, options) {
        super($root, {
            name: 'Header',
            listeners: ['input', 'click'],
            ...options
        })
    }

    toHTML () {
        const title = this.store.getState().title
        return `
            <input class="input" type="text" value="${title}"/>
            <div>
                <div class="button" data-button="remove">
                    <span class="material-icons" data-button="remove">delete</span>
                </div>
                <div class="button" data-button="exit">
                    <span class="material-icons" data-button="exit">exit_to_app</span>
                </div>
            </div>
        `
    }

    onInput (event) {
        const $target = $(event.target)
        this.$dispatch(actions.changeTitle($target.text()))
    }

    onClick (event) {
        const $target = $(event.target)
        if ($target.data.button === 'remove') {
            const decision = confirm('Вы действительно хотите удалить таблицу?')

            if (decision) {
                localStorage.removeItem(`excel:${ActiveRoute.param}`)
                ActiveRoute.navigate('')
            }
        } else if ($target.data.button === 'exit') {
            ActiveRoute.navigate('')
        }
    }
}
