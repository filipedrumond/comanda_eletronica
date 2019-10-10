<template>
    <div class="restaurante container">
        <h2>{{ restaurante }} ID: {{ idRestaurante }}</h2>
        <label class="switch">
            <input type="checkbox" />
            <span class="slider"></span>
        </label>

        <label class="switch">
            <input type="checkbox" checked />
            <span class="slider"></span> </label
        ><br /><br />

        <label class="switch">
            <input type="checkbox" />
            <span class="slider round"></span>
        </label>

        <label class="switch">
            <input type="checkbox" checked />
            <span class="slider round"></span>
        </label>
        <div class="row" v-for="item in cardapio" v-bind:key="item.id">
            <div class="col-md-2 col-3">
                {{ item.nome }}
            </div>
            <div class="col-md-2 col-3">
                {{ item.valor }}
            </div>
            <div class="col-md-2 col-3">
                <span
                    v-for="ingrediente in item.ingredientes"
                    v-bind:key="ingrediente.id"
                >
                    {{ ingrediente }},
                </span>
            </div>
            <div class="col-md-3 col-3">
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
    name: "Restaurante",
    data() {
        return {
            cardapio: [{ imgs: ["img"] }],
            restaurante: "EZKitchen",
            dataRequest: {},
            idRestaurante: 0
        };
    },
    beforeCreate: function() {},
    created: function() {
        this.idRestaurante = this.$route.params.idRestaurante;
        this.handlerReqRestaurante(this.idRestaurante);
    },
    computed: {},
    watch: {
        restaurante: function(val) {
            this.setTitle(val);
        }
    },
    methods: {
        handlerReqRestaurante: function(param) {
            isNaN(parseFloat(param))
                ? this.restauranteGetByNome(param)
                : this.retauranteGetById(param);
        },
        restauranteGetByNome: function(nome) {
            let url = `${this.db_url}restaurantes?nome=${nome}`;
            this.$http.get(url).then(
                response => {
                    if (response.body.length != 1) {
                        this.SimpleAlerts.error({
                            title: "ERRO AO BUSCAR RESTAURANTE",
                            closeCallback: () => {
                                this.$router.push({ path: "/" });
                            }
                        });
                        return;
                    }
                    console.log(response.body);
                    this.cardapio = response.body[0].cardapio;
                    this.restaurante = response.body[0].nome;
                    this.dataRequest = response.body[0];
                },
                response => {
                    this.SimpleAlerts.error({ title: "O BANCO MORREU" });
                }
            );
        },
        retauranteGetById: function(id) {
            let url = `${this.db_url}restaurantes/${id}`;
            this.$http.get(url).then(
                response => {
                    console.log(response.body);
                    this.cardapio = response.body.cardapio;
                    this.restaurante = response.body.nome;
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
