<template>
    <div class="container">
        <div class="row d-flex justify-content-center">
            <div class="col-md-3 col-12">
                <div class="form-group">
                    <label class="" for="email">Email</label>
                    <input
                        class="form-control"
                        id="email"
                        type="text"
                        v-model="emailInput"
                    />
                </div>
                <div class="form-group">
                    <label class="" for="senha">Senha</label>
                    <input
                        class="form-control"
                        id="senha"
                        type="text"
                        v-model="senhaInput"
                    />
                </div>
                <button class="btn btn-block btn-success" @click="btnLogin()">
                    Entrar
                </button>
                <button
                    class="btn btn-block btn-success"
                    @click="$router.push({ path: '/signin' })"
                >
                    Me cadastrar
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Login",
    data() {
        return {
            emailInput: "",
            senhaInput: "",
            autoFill: true
        };
    },
    methods: {
        btnLogin: function() {
            let response = this.login(
                this.emailInput,
                this.senhaInput,
                function() {}
            );
        }
    },
    created() {
        if (this.autoFill) {
            this.emailInput = "filipe.dp@outlook.com";
            this.senhaInput = "1234";
        }
    }
};
</script>

<style lang='scss'>
</style>
