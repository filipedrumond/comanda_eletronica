<template>
    <div class="AdminHome container">
        HERE
        {{ $session.get("dadosAdmin") }}
    </div>
</template>

<script>
export default {
    name: "AdminHome",
    data() {
        return {
            validation: true
        };
    },
    created: function() {},
    computed: {},
    methods: {}
};
</script>

<style lang='scss'>
</style>
