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
        <div
            class="row m-0 d-flex align-items-center item"
            v-for="item in cardapio"
            v-bind:key="item.id"
        >
            <div class="col-1">
                <label class="container">
                    <input type="checkbox" />
                    <span class="checkmark"></span>
                </label>
            </div>
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
                <span>{{ item.valor | toReal }}</span>
            </div>
            <div class="col-2">
                {{ item.status }}
                <i class="fa fa-times" aria-hidden="true"></i>
                <i class="fa fa-check" aria-hidden="true"></i>
                <i class="fa fa-ban" aria-hidden="true"></i>
            </div>
        </div>
        <button class="btn btn-fixed-bottom">
            Fechar pedido
        </button>
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
    methods: {},
    updated() {
        $(".item").click(function(params) {
            let $input = $(this).find('input[type="checkbox"]');
            $input.prop("checked", !$input.prop("checked"));
        });
    }
};
</script>

<style lang='scss'>
@import "../../sass/variables.scss";
.header {
    padding-top: 0.7rem;
    padding-left: 0.7rem;
    padding-right: 0.7rem;
    background-color: $primary;
    color: #ffffff;
    h5 {
        font-size: 1rem;
    }
}
.btn-fixed-bottom {
    background-color: rgb(216, 67, 67);
    color: white;
    position: absolute;
    bottom: 1.2rem;
    left: 1.2rem;
    &:active,
    &:focus {
        color: white;
    }
}
.search {
    padding-bottom: 0.7rem;
    padding-left: 0.7rem;
    padding-right: 0.7rem;
    background-color: rgb(216, 67, 67);
}
</style>
