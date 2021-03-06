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
import LSPOrderIndex from './components/lsp-order-detail/LSPOrderIndexComponent.vue'
import LSPOrderSurvey from './components/lsp-order-detail/LSPOrderSurveyComponent'
import LSPOrderCabling from './components/lsp-order-detail/LSPOrderCablingComponent'
import LSPOrderSplicing from './components/lsp-order-detail/LSPOrderSplicingComponent'
import LSPOrderActivate from './components/lsp-order-detail/LSPOrderActivateComponent'
import LSPOrderRepair from './components/lsp-order-detail/LSPOrderRepairComponent.vue'
import NotificationList from './components/notification/NotificationComponent.vue'
import AdminNotificationList from './components/notification/AdminNotificationComponent.vue'

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
            path: '/order/:id/:orderType',
            name: 'order',
            component: Order,
            props: true
        },
        {
            path: '/lsp-order/:id/:orderType',
            name: 'lsp-order',
            component: LSPOrder,
            props: true
        },
        {
            path: '/home/',
            component: LSPOrderIndex,
            children: [
                {
                    path: 'profile',
                    component: Profile,
                },
                {
                    path: 'notification',
                    component: AdminNotificationList,
                },
                {
                    path: 'new',
                    component: Home,
                    name: 'home-new',
                },
                {
                    path: 'accept',
                    component: Accept,
                },
                {
                    path: 'history',
                    component: History,
                }
            ]
        },
        {
            path: '/on-call/new',
            component: OnCall,
            name: 'on-call-new'
        },
        {
            path: '/on-call/accept',
            component: OnCallAccept,
        },
        {
            path: '/on-call/history',
            component: OnCallHistory,
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
            path: '/team/edit/:id',
            component: TeamCreate,
            name: 'team-edit'
        },
        {
            path: '/lsp-team/',
            component: LSPOrderIndex,
            children: [
                {
                    path: 'login',
                    component: LSPTeamLogin
                },
                {
                    path: 'profile',
                    component: LSPTeamProfile
                },
                {
                    path: 'notification',
                    component: NotificationList,
                },
                {
                    path: 'first-time-password/:phone',
                    component: LSPTeamFirstTimePassword
                }
            ]
        },
        {
            path: '/lsp-home/',
            component: LSPOrderIndex,
            children: [
                {
                    path: 'remaining',
                    component: LSPTeamRemaining
                },
                {
                    path: 'history',
                    component: LSPTeamHistory
                },
                {
                    path: 'complete',
                    component: LSPTeamComplete
                }
            ]
        },
        {
            path: '/inventory',
            component: Inventroy,
            name: 'inventory'
        },
        {
            path: '/lsp-team-order/:id',
            component: LSPOrderIndex,
            children: [
                {
                    path: 'survey',
                    component: LSPTeamOrderSurvey,
                    name: 'LSPTeamOrderSurvey'
                },
                {
                    path: 'cabling',
                    component: LSPTeamOrderCabling,
                    name: 'LSPTeamOrderCabling'
                },
                {
                    path: 'splicing',
                    component: LSPTeamOrderSplicing,
                    name: 'LSPTeamOrderSplicing'
                },
                {
                    path: 'activate',
                    component: LSPTeamOrderActivate,
                    name: 'LSPTeamOrderActivate'
                },
                {
                    path: 'repair',
                    component: LSPTeamOrderRepair,
                    name: 'LSPTeamOrderRepair'
                }
            ]
        },
        {
            path: '/lsp-order/review/:id',
            component: LSPOrderIndex,
            children: [
                {
                    path: 'survey',
                    component: LSPOrderSurvey
                },
                {
                    path: 'cabling',
                    component: LSPOrderCabling
                },
                {
                    path: 'splicing',
                    component: LSPOrderSplicing
                },
                {
                    path: 'activate',
                    component: LSPOrderActivate
                }
            ]
        },
        {
            path: '/lsp-order/review/repair/:id',
            component: LSPOrderRepair,
            name: 'order-repair',
            props: true
        }
    ]
}