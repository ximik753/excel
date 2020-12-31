import { storage } from '@core/utils'

function toHTML (key) {
    const id = key.split(':')[1]
    const model = storage(key)

    return `
        <li class="db__record">
            <a href="#excel/${id}">${model.title}</a>
            <strong>
                ${new Date(model.openedDate).toLocaleDateString()}
                ${new Date(model.openedDate).toLocaleTimeString()}
            </strong>
        </li>
    `
}

export function getAllKeys () {
    const keys = []
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key.includes('excel')) {
            keys.push(key)
        }
    }

    return keys
}

export function createRecordsTable () {
    const keys = getAllKeys()

    if (!keys.length) {
        return 'Записей нет'
    }

    return `
        <div class="db__list-header">
            <span>Название</span>
            <span>Дата открытия</span>
        </div>
        <ul class="db__list">
            ${keys.map(toHTML).join('')}
        </ul>
    `
}
