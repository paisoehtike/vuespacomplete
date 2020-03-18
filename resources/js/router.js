// import LspHomeComponent from './components/LspHomeComponent'
import NotFound from './components/NotFound'
import Order from './components/lsp-order/OrderComponent'
import LSPOrder from './components/lsp-team-order/LSPOrderComponent'
import Home from './components/lsp-home/HomeComponent'
import Accept from './components/lsp-home/AcceptComponent'
import OnCall from './components/lsp-on-call/OnCallComponent'
import OnCallAccept from './components/lsp-on-call/OnCallAcceptComponent'
import OnCallHistory from './components/lsp-on-call/OnCallHistoryComponent'
import LSPTeamRemaining from './components/lsp-team-home/LSPTeamRemainingComponent'
import History from './components/lsp-home/HistoryComponent'
import LSPTeamHistory from './components/lsp-team-home/LSPTeamHistoryComponent'
import LSPTeamComplete from './components/lsp-team-home/LSPTeamCompleteComponent'

export default {
    mode: 'history',
    routes: [
        {
            path: '*',
            component: NotFound
        },
        {
            path: '/order',
            component: Order
        },
        {
            path: '/lsp-order',
            component: LSPOrder
        },
        {
            path: '/home/new',
            component: Home
        },
        {
            path: '/home/accept',
            component: Accept
        },
        {
            path: '/home/history',
            component: History
        },
        {
            path: '/on-call/new',
            component: OnCall
        },
        {
            path: '/on-call/accept',
            component: OnCallAccept
        },
        {
            path: '/on-call/history',
            component: OnCallHistory
        },
        {
            path: '/lsp-home/remaining',
            component: LSPTeamRemaining
        },
        {
            path: '/lsp-home/history',
            component: LSPTeamHistory
        },
        {
            path: '/lsp-home/complete',
            component: LSPTeamComplete
        },
        
    ]
}