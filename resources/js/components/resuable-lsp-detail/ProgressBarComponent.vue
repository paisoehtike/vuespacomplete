<template>
    <div class="progress-bar">
        <ul class="progressbar">
            <router-link :to="type == 'admin' ? '/lsp-order/review/' + id + '/survey' : '/lsp-team-order/' +id+ '/survey' " 
                         tag="li" :class="stepNo >= 1 ? 'selected': ''">
                <p>Survey</p>
            </router-link>
            <router-link :to="type == 'admin' ? '/lsp-order/review/' + id + '/cabling' : '/lsp-team-order/' +id+ '/cabling' "
                         tag="li" :class="stepNo >= 2 ? 'selected': '' ">
                <p>Cabling</p>
            </router-link>
            <router-link :to="type == 'admin' ? '/lsp-order/review/' + id + '/splicing' : '/lsp-team-order/' +id+ '/splicing' " 
                         tag="li" :class="stepNo >= 3 ? 'selected': '' ">
                <p>Splicing</p>
            </router-link>
            <router-link :to="type == 'admin' ? '/lsp-order/review/' + id + '/activate' : '/lsp-team-order/' +id+ '/activate' "
                         tag="li" :class="stepNo >= 4 ? 'selected': '' ">
                <p>Activate</p>
            </router-link>
        </ul>
    </div>
</template>

<script>
export default {
    props: [
        'stepNo', 'type', 'id'
    ]
}
</script>