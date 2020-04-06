// import LspHomeComponent from './components/LspHomeComponent'
import NotFound from './components/NotFound'
import LSPLogin from './components/lsp-home/LSPLoginComponent.vue'
import LSPTeamLogin from './components/lsp-team/LSPTeamLoginComponent.vue'
import Profile from './components/lsp-home/ProfileComponent.vue'
import LSPTeamProfile from './components/lsp-team/LSPTeamProfileComponent.vue'
import LSPTeamFirstTimePassword from './components/lsp-team/LSPTeamFirstTimePasswordComponent.vue'
import LSPFirstTimePassword from './components/lsp-home/LSPFirstTimePasswordComponent.vue'
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
import LSPTeamOrderSurvey from './components/lsp-team-order-detail/LSPTeamOrderSurveyComponent'
import LSPTeamOrderCabling from './components/lsp-team-order-detail/LSPTeamOrderCablingComponent.vue'
import LSPTeamOrderSplicing from './components/lsp-team-order-detail/LSPTeamOrderSplicingComponent.vue'
import LSPTeamOrderActivate from './components/lsp-team-order-detail/LSPTeamOrderActivateComponent.vue'
import LSPTeamOrderRepair from './components/lsp-team-order-detail/LSPTeamOrderRepairComponent.vue'
import LSPOrderSurvey from './components/lsp-order-detail/LSPOrderSurveyComponent'
import LSPOrderCabling from './components/lsp-order-detail/LSPOrderCablingComponent'
import LSPOrderSplicing from './components/lsp-order-detail/LSPOrderSplicingComponent'
import LSPOrderActivate from './components/lsp-order-detail/LSPOrderActivateComponent'
import LSPOrderRepair from './components/lsp-order-detail/LSPOrderRepairComponent.vue'

export default {
    mode: 'history',
    routes: [
        {
            path: '*',
            component: NotFound
        },
        {
            path: '/',
            component: LSPLogin
        },
        {
            path: '/lsp/login',
            component: LSPLogin
        },
        {
            path: '/lsp/first-time-password',
            component: LSPFirstTimePassword
        },
        {
            path: '/order/:id',
            name: 'order',
            component: Order,
            props: true
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
            path: '/lsp-team-order/survey',
            component: LSPTeamOrderSurvey
        },
        {
            path: '/lsp-team-order/cabling',
            component: LSPTeamOrderCabling
        },
        {
            path: '/lsp-team-order/splicing',
            component: LSPTeamOrderSplicing
        },
        {
            path: '/lsp-team-order/activate',
            component: LSPTeamOrderActivate
        },
        {
            path: '/lsp-team-order/repair',
            component: LSPTeamOrderRepair
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