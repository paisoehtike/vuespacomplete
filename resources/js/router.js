// import LspHomeComponent from './components/LspHomeComponent'
import NotFound from './components/NotFound'
import Order from './components/lsp-order/OrderComponent'
import LSPOrder from './components/lsp-team-order/LSPOrderComponent'
import Home from './components/lsp-home/HomeComponent'
import Accept from './components/lsp-home/AcceptComponent'
import OnCall from './components/lsp-on-call/OnCallComponent'
import OnCallAccept from './components/lsp-on-call/OnCallAcceptComponent'
import OnCallHistory from './components/lsp-on-call/OnCallHistoryComponent'
import LSPTeamRemaining from './components/lsp-team/LSPTeamRemainingComponent'
import History from './components/lsp-home/HistoryComponent'
import LSPTeamHistory from './components/lsp-team/LSPTeamHistoryComponent'
import LSPTeamComplete from './components/lsp-team/LSPTeamCompleteComponent'
import TeamIndex from './components/lsp-home-team/TeamIndexComponent'
import TeamCreate from './components/lsp-home-team/CreateTeamComponent'
import Inventroy from './components/lsp-home-inventory/InventoryComponent'

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
            component: Home,
            name: 'home-new'
        },
        {
            path: '/home/accept',
            component: Accept,
            name: 'home-accept'
        },
        {
            path: '/home/history',
            component: History,
            name: 'home-history'
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
            path: '/team',
            component: TeamIndex
        },
        {
            path: '/team/create',
            component: TeamCreate
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
        {
            path: '/inventory',
            component: Inventroy
        },
    ]
}