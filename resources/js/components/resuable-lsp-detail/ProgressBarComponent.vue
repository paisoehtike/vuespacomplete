<template>
    <div class="progress-bar">
        <ul class="progressbar">
            <router-link :to="type == 'admin' ? '/lsp-order/survey': '/lsp-team-order/survey' " 
                         tag="li" :class="stepNo >= 1 ? 'selected': ''">
                <p>Survey</p>
            </router-link>
            <router-link :to="type == 'admin' ? '/lsp-order/cabling': '/lsp-team-order/cabling' "
                         tag="li" :class="stepNo >= 2 ? 'selected': '' ">
                <p>Cabling</p>
            </router-link>
            <router-link :to="type == 'admin' ? '/lsp-order/splicing': '/lsp-team-order/splicing' " 
                         tag="li" :class="stepNo >= 3 ? 'selected': '' ">
                <p>Splicing</p>
            </router-link>
            <router-link :to="type == 'admin' ? '/lsp-order/activate': '/lsp-team-order/activate' "
                         tag="li" :class="stepNo >= 4 ? 'selected': '' ">
                <p>Activate</p>
            </router-link>
        </ul>
    </div>
</template>

<script>
export default {
    props: [
        'stepNo', 'type',
    ]
}
</script>