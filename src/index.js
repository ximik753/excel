import './scss/index.scss'
import { Router } from '@core/routes/Router'
import { DashboardPage } from '@/pages/DashboardPage'
import { ExcelPage } from '@/pages/ExcelPage'

// eslint-disable-next-line no-new
new Router('#app', {
    dashboard: DashboardPage,
    excel: ExcelPage
})
