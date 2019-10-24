<template>
    <div id="app" class="">
        <Nav />
        {{ $session.get(this.IDSESSIONNAME) }}
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
        if (this.$session.get(this.USERNAME)) {
            return;
        }
        let nomeCookie = this.$cookies.get(this.USERNAME);
        if (nomeCookie) {
            this.$session.set(this.USERNAME, nomeCookie);
            return;
        }
        let $VUE = this;
        let $form = $("<form>");
        // let $label = $("<label class=''>").html("Nome");
        // $form.append($label);
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
.link-active {
    background-color: $white;
    color: $black;
}
</style>