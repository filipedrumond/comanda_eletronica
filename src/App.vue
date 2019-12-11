<template>
    <div id="app" class="">
        <Default>
            <template v-slot:content>
                <router-view />
            </template>
        </Default>
    </div>
</template>

<script>
import Default from "./components/layouts/Default";
export default {
    name: "App",
    data() {
        return {};
    },
    created: function() {
        if (!this.$session.exists()) {
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
    components: { Default }
};
</script>

<style lang="scss"></style>