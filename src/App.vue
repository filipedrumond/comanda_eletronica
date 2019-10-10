<template>
    <div id="app" class="">
        <Nav />
        <router-view />
    </div>
</template>

<script>
import Nav from "./components/Nav.vue";
export default {
    name: "App",
    data() {
        return {
            // tema: ""
        };
    },
    created: function() {
        if (this.$session.exists()) {
            // this.tema = this.$session.get("dadosUsuario").tema || "default";
        }
    },
    components: { Nav }
};
</script>

<style lang="scss">
@import "../sass/variables.scss";
a {
    text-decoration: none;
}
* {
    margin: 0;
    padding: 0;
    font-family: "Roboto", sans-serif;
}
.container-fluid {
    padding: 0;
}
</style>
