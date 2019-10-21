<template>
    <div class="cad_menu container">
        <h2>{{ restaurante }}</h2>
        <div class="row mb-3">
            <div class="col-2">
                <span>Nome do Prato:</span>
                <input
                    v-model="inputNomePrato"
                    type="text"
                    class="form-control"
                />
            </div>
            <div class="col-2">
                <span>Valor do Prato:</span>
                <input
                    v-model="inputValorPrato"
                    type="text"
                    class="form-control"
                />
            </div>
            <div class="col-2">
                <span>Ingredientes do Prato:</span>
                <input
                    v-model="inputIngredientesPrato"
                    type="text"
                    class="form-control"
                />
            </div>
            <div class="col-2 bg-danger">
                <span>Foto do Prato:</span>
                <input type="file" class="form-control" />
            </div>
            <div class="col-2">
                <div class="d-flex">
                    <button class="btn btn-success" @click="pratoPut(1)">
                        S
                    </button>
                    <button class="btn btn-danger">E</button>
                </div>
                <div class="d-flex">
                    <button class="btn btn-info">I</button>
                    <button class="btn btn-warning">W</button>
                </div>
            </div>
        </div>
        <div class="row" v-for="item in cardapio" v-bind:key="item.id">
            <div class="col-2">
                {{ item.nome }}
            </div>
            <div class="col-2">
                {{ item.valor }}
            </div>
            <div class="col-2">
                <span
                    v-for="ingrediente in item.ingredientes"
                    v-bind:key="ingrediente.id"
                >
                    {{ ingrediente }},
                </span>
            </div>
            <div class="col-3">
                <img
                    :src="'data:image/png;base64,' + item.imgs[0]"
                    alt="Imagem do prato"
                />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "CadMenu",
    data() {
        return {
            inputNomePrato: "",
            inputValorPrato: "",
            inputIngredientesPrato: [],
            cardapio: [{ imgs: ["img"] }],
            restaurante: "EZKitchen",
            dataRequest: {}
        };
    },
    beforeCreate: function() {},
    created: function() {
        this.retauranteGet(1);
    },
    computed: {},
    methods: {
        pratoPut: function(id) {
            let url = `${this.db_url}restaurantes/${id}`;
            let data = this.dataRequest;
            console.log(data);
            data.cardapio.push({
                nome: this.inputNomePrato,
                valor: parseFloat(this.inputValorPrato),
                ingredientes: this.inputIngredientesPrato.split(","),
                imgs: ["", ""],
                id: this.cardapio.length + 1
            });
            this.$http.put(url, data).then(
                response => {
                    this.SimpleAlerts.success({ title: "PRATO ADICIONADO" });
                    this.retauranteGet(1);
                },
                response => {
                    console.log(response);
                    this.SimpleAlerts.error({ title: "O BANCO MORREU" });
                }
            );
        },
        retauranteGet: function(id) {
            let url = `${this.db_url}restaurantes/${id}`;
            this.$http.get(url).then(
                response => {
                    console.log(response.body);
                    this.cardapio = response.body.cardapio;
                    this.restaurante = response.body.restaurante;
                    this.dataRequest = response.body;
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
