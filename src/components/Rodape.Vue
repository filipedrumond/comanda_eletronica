<template>
    <div class="rodape container mt-3 text-right">
        EU SOU O RODAPE
    </div>
</template>

<script>
export default {
    name: "Rodape",
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
@import "../../sass/variables.scss";
.rodape {
    background-color: $primary;
    color: white;
    position: fixed;
    bottom: 0;
    height: 20px;
    z-index: 1;
}
</style>
