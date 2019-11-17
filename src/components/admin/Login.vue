<template>
    <div class="container">
        <div class="row d-flex justify-content-center">
            <div class="col-md-3 col-12">
                <div class="form-group">
                    <label class="" for="usuario">Usuario</label>
                    <input
                        class="form-control"
                        id="usuario"
                        type="text"
                        v-model="usuarioInput"
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
    name: "AdminLogin",
    data() {
        return {
            usuarioInput: "",
            senhaInput: "",
            autoFill: true
        };
    },
    methods: {
        btnLogin: function() {
            let url = `${this.DB_ADMIN}usuarios?usuario=${this.usuarioInput}&senha=${this.senhaInput}`;
            this.$http.get(url).then(
                response => {
                    if (response.body.length !== 1) {
                        this.SimpleAlerts.error({
                            title: "Erro ao logar",
                            text: "Usuario ou senha inválidos"
                        });
                        return;
                    }
                    this.$session.set(this.ADMINDATA, response.body[0]);
                    this.$router.push({ path: "/admin/home" });
                },
                response => {
                    this.SimpleAlerts.error({
                        title: "O BANCO MORREU AO LOGAR"
                    });
                }
            );
        }
    },
    created() {
        if (this.autoFill) {
            this.usuarioInput = "filipedp";
            this.senhaInput = "123";
        }
    }
};
</script>

<style lang='scss'>
</style>
