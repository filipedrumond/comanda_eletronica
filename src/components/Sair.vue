<template>
    <div class="sair">
        <!-- {{this.$session.getAll()}} -->
    </div>
</template>

<script>
export default {
    name: "Sair",
    data() {
        return {}
    },
    created: function() {
        this.endSession();
    },
    computed: {},
    methods: {}
};
</script>

<style lang='scss'>
</style>
