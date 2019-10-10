<template :class="'theme-test' + { tema }">
    <div class="bg-theme">
        <div class="row">
            <div class="col" v-for="item in testes" v-bind:key="item.id">
                <h3 :class="'text-' + item">{{ item }}</h3>
                <button :class="'btn btn-' + item">{{ item }}</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ThemeTest",
    data() {
        return {
            tema: "",
            testes: [
                "primary",
                "secondary",
                "danger",
                "warning",
                "info",
                "success"
            ]
        };
    },
    created: function() {
        this.tema = this.$session.get("dadosUsuario").tema || "";
    }
};
</script>

<style>
</style>