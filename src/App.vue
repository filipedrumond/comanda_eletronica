<template>
    <div id="app" class="">
        <Nav />
        <router-view />
        <Rodape />
    </div>
</template>

<script>
import Nav from "./components/Nav.vue";
import Rodape from "./components/Rodape.vue";
export default {
    name: "App",
    data() {
        return {
            // tema: ""
        };
    },
    created: function() {
        if(!this.$session.exists()){
            this.$session.start();
        }
        if (this.$session.has(this.USERNAME)) {
            return;
        }
        if (this.$cookies.isKey(this.USERNAME)) {
            this.$session.set(this.USERNAME, this.$cookies.get(this.USERNAME));
            return;
        }
        let $VUE = this;
        let $form = $("<form>");
        let $input = $("<input type='text' class='form-control'>");
        $form.append($("<div class='form-group'>").append($input));
        this.SimpleFormAlerts.success({
            form: $form,
            title: "Como deseja ser chamado?",
            submitText: "Confirmar",
            closeCallback: function() {},
            submitCallback: function() {
                let nome = $form.find("input[type='text']").val();
                $VUE.$session.set($VUE.USERNAME, nome);
                $VUE.$cookies.set($VUE.USERNAME, nome);
                $(".modal").modal("hide");
            }
        });
    },
    components: { Nav, Rodape }
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
.link-active {
    background-color: $white;
    color: $black;
}
#app {
    padding-top: 42px;
    padding-bottom: 20px;
}
</style>