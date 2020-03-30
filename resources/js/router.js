// import LspHomeComponent from './components/LspHomeComponent'
import NotFound from './components/NotFound'
import LSPTeamLogin from './components/lsp-team/LSPTeamLoginComponent.vue'
import Profile from './components/lsp-home/ProfileComponent.vue'
import LSPTeamProfile from './components/lsp-team/LSPTeamProfileComponent.vue'
import LSPTeamFirstTimePassword from './components/lsp-team/LSPTeamFirstTimePasswordComponent.vue'
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
import TeamDetail from './components/lsp-home-team/TeamDetailComponent'
import TeamCreate from './components/lsp-home-team/CreateTeamComponent'
import Inventroy from './components/lsp-home-inventory/InventoryComponent'
import LSPOrderSurvey from './components/lsp-team-order-detail/LSPOrderSurveyComponent'
import LSPOrderCabling from './components/lsp-team-order-detail/LSPOrderCablingComponent.vue'
import LSPOrderSplicing from './components/lsp-team-order-detail/LSPOrderSplicingComponent.vue'
import LSPOrderActivate from './components/lsp-team-order-detail/LSPOrderActivateComponent.vue'
import LSPOrderRepair from './components/lsp-team-order-detail/LSPOrderRepairComponent.vue'

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
            path: '/home/profile',
            component: Profile,
        },
        {
            path: '/home/new',
            component: Home,
            name: 'home-new'
        },
        {
            path: '/home/accept',
            component: Accept,
            // name: 'home-accept'
        },
        {
            path: '/home/history',
            component: History,
            // name: 'home-history'
        },
        {
            path: '/on-call/new',
            component: OnCall,
            name: 'on-call-new'
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
            component: TeamIndex,
            name: 'team'
        },
        {
            path: '/team/detail/:id',
            component: TeamDetail,
            name: 'team-detail'
        },
        {
            path: '/team/create',
            component: TeamCreate,
            name: 'team-create'
        },
        {
            path: '/lsp-team/login',
            component: LSPTeamLogin
        },
        {
            path: '/lsp-team/profile',
            component: LSPTeamProfile
        },
        {
            path: '/lsp-team/first-time-password',
            component: LSPTeamFirstTimePassword
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
            component: Inventroy,
            name: 'inventory'
        },
        {
            path: '/lsp-order/survey',
            component: LSPOrderSurvey
        },
        {
            path: '/lsp-order/cabling',
            component: LSPOrderCabling
        },
        {
            path: '/lsp-order/splicing',
            component: LSPOrderSplicing
        },
        {
            path: '/lsp-order/activate',
            component: LSPOrderActivate
        },
        {
            path: '/lsp-order/repair',
            component: LSPOrderRepair
        },
    ]
}