<template>
    <div class="lsp-profile-body">
        <!-- <h4>Team({{ response.data.teams_count }})</h4> -->
        <h4>Team</h4>
        <table>
            <tbody>
                <tr v-for="(value, key) in response.data.teams" :key="key">
                    <td class="leader-name">{{ value.leader_name }}</td>
                    <td class="man-power">{{ value.man_power }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    props: [
        'response'
    ]
}
</script>