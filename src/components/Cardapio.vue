<template>
    <div class="cardapio container-fluid">
        <div
            class="header d-flex w-100 justify-content-between align-items-baseline"
        >
            <h2>Cardapio Eletrônico</h2>
            <h5>Mesa - {{ idMesa }}</h5>
        </div>
        <div
            class="search d-flex w-100 justify-content-between align-items-baseline"
        >
            <input
                type="text"
                name=""
                id=""
                class="form-control"
                placeholder="Ex: Macarrão Bolonhesa"
            />
            <a>
                <i class="fa fa-address-book" aria-hidden="true"></i>
            </a>
        </div>
        <!-- <div class="row" v-for="item in cardapio" v-bind:key="item.id">
            {{ item }}<br />
            {{ mesa }}
            <div class="col-md-3 col-3">
                <img
                    :src="'data:image/png;base64,' + item.imgs[0]"
                    alt="Imagem do prato"
                />
            </div>
        </div> -->
        <div class="row" v-for="item in cardapio" v-bind:key="item.id">
            <div class="col-md-3 col-3">
                <img
                    :src="'/img/prato-' + item.id + '/' + item.imgs[0]"
                    class="img-fluid"
                    alt="Imagem do prato"
                />
            </div>
            <div class="col-md-3 col-3">
                <span>{{ item.nome }}</span>
            </div>
            <div class="col-md-3 col-3">
                <span>{{ item.valor }}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Cardapio",
    data() {
        return {
            cardapio: [{ imgs: ["img"] }],
            mesa: [{ id: 0, status: 2 }],
            idMesa: 1
        };
    },
    beforeCreate: function() {},
    created: function() {
        this.idMesa = this.$route.params.idMesa;
        let url = `${this.db_url}cardapio`;
        this.$http.get(url).then(
            response => {
                this.cardapio = response.body;
            },
            response => {
                this.SimpleAlerts.error({ title: "O BANCO MORREU" });
            }
        );
        url = `${this.db_url}mesas/${this.idMesa}`;
        this.$http.get(url).then(
            response => {
                this.mesa = response.body;
            },
            response => {
                this.SimpleAlerts.error({ title: "O BANCO MORREU" });
            }
        );
    },
    computed: {},
    watch: {},
    methods: {}
};
</script>

<style lang='scss'>
.header {
    padding-top: 0.7rem;
    padding-left: 0.7rem;
    padding-right: 0.7rem;
    background-color: rgb(216, 67, 67);
    color: #ffffff;
    h5 {
        font-size: 1rem;
    }
}
.search {
    padding-bottom: 0.7rem;
    padding-left: 0.7rem;
    padding-right: 0.7rem;
    background-color: rgb(216, 67, 67);
}
</style>
