import LspHomeComponent from './components/LspHomeComponent'
import NotFound from './components/NotFound'
import Order from './components/lsp-order/OrderComponent'
import LSPOrder from './components/lsp-team-order/LSPOrderComponent'

export default {
    mode: 'history',
    routes: [
        {
            path: '*',
            component: NotFound
        },
        {
            path: '/home',
            component: LspHomeComponent
        },
        {
            path: '/order',
            component: Order
        },
        {
            path: '/lsp-order',
            component: LSPOrder
        }
    ]
}