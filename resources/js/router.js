// import LspHomeComponent from './components/LspHomeComponent'
import NotFound from './components/NotFound'
import Order from './components/lsp-order/OrderComponent'
import LSPOrder from './components/lsp-team-order/LSPOrderComponent'
import Home from './components/lsp-home/HomeComponent'
import OnCall from './components/lsp-on-call/OnCallComponent'
import LSPHome from './components/lsp-team-home/LSPTeamHomeComponent'

export default {
    mode: 'history',
    routes: [
        {
            path: '*',
            component: NotFound
        },
        // {
        //     path: '/home',
        //     component: LspHomeComponent
        // },
        {
            path: '/order',
            component: Order
        },
        {
            path: '/lsp-order',
            component: LSPOrder
        },
        {
            path: '/home',
            component: Home
        },
        {
            path: '/on-call',
            component: OnCall
        },
        {
            path: '/lsp-home',
            component: LSPHome
        }
    ]
}