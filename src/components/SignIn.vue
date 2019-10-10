<template>
    <div class="signin container">
        <div class="debugg" v-if="validation">
            EMAIL {{ emailIsValid }} <br />
            SENHA {{ senhaIsValid }} <br />
            TEMA {{ temaSelect }}
        </div>
        <div class="form-group">
            <label class="" for="email">Email</label>
            <input
                class="form-control"
                id="email"
                type="email"
                v-model="emailInput"
                @blur="validarEmail()"
            />
        </div>
        <!-- <div class="form-group">
            <label class="" for="email">Confirmação de Email</label>
            <input
                class="form-control"
                id="email"
                type="email"
                v-model="emailConfirm"
            />
        </div> -->
        <div class="form-group">
            <label class="" for="senha">Senha</label>
            <input
                class="form-control"
                id="senha"
                type="text"
                v-model="senhaInput"

            />
        </div>
        <!-- <div class="form-group">
            <label class="" for="senha">Confirmação de Senha</label>
            <input
                class="form-control"
                id="senha"
                type="text"
                v-model="senhaConfirm"
            />
        </div> -->
        <div class="form-group">
            <label class="" for="senha">Nome</label>
            <input
                class="form-control"
                id="senha"
                type="text"
                v-model="nomeInput"
            />
        </div>
        <div class="form-group">
            <select name="" id="" v-model="temaSelect">
                <option
                    :value="tema"
                    class="col"
                    v-for="tema in temas"
                    v-bind:key="tema.id"
                >
                    {{ tema }}
                </option>
            </select>
        </div>
        <button class="btn btn-success btn-cadastrar" @click="cadastrar()">Cadastrar</button>
    </div>
</template>

<script>
export default {
    name: "SignIn",
    data() {
        return {
            validation: true,
            emailInput: "",
            emailConfirm: "",
            senhaInput: "",
            senhaConfirm: "true",
            temas: [],
            nomeInput: "",
            temaSelect: ""
        };
    },
    created: function() {
        let url = `${this.db_url}temas`;
        this.$http.get(url).then(
            response => {
                this.temas = response.body;
            },
            response => {
                this.SimpleAlerts.error({ title: "O BANCO MORREU" });
            }
        );
    },
    computed: {
        emailIsValid: function() {
            if (this.emailInput == this.emailConfirm && this.emailInput) {
                return true;
            }
            return false;
        },
        senhaIsValid: function() {
            if (this.senhaInput == this.senhaConfirm && this.senhaInput) {
                return true;
            }
            return false;
        }
    },
    methods: {
        validarEmail:function(params) {
            let url = `${this.db_url}usuarios?email=${this.emailInput}`;
            this.$http.get(url).then(
                response => {
                    if (response.body.length > 0) {
                        this.SimpleAlerts.error({
                            title: "Email em uso.",
                            text: "Tente um email diferente este já está em uso."
                        });
                        $(".btn-cadastrar").attr("disabled", true);
                        return;
                    }
                    $(".btn-cadastrar").attr("disabled", false);
                },
                response => {
                    this.SimpleAlerts.error({ title: "O BANCO MORREU" });
                }
            );
            console.log("HERE");
        },
        cadastrar: function() {
            let url = `${this.db_url}usuarios`;
            let data = {
                nome: this.nomeInput,
                email: this.emailInput,
                senha: this.senhaInput,
                tema: this.temaSelect
            };
            this.$http.post(url, data).then(
                response => {
                    this.SimpleAlerts.success({ title: "Cadastrado" });
                },
                response => {
                    this.SimpleAlerts.error({ title: "O BANCO MORREU" });
                }
            );
        }
    }
};
</script>

<style lang='scss'>
</style>
