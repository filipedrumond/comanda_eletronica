<template>
    <div class="cardapio container-fluid">
        <div
            class="header d-flex w-100 justify-content-between align-items-baseline"
        >
            <h2>Cardapio Eletrônico</h2>
            <h5>
                Mesa - {{ idMesa }}
                <i
                    :class="mesa.status | handleStatusMesa"
                    aria-hidden="true"
                ></i>
            </h5>
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
            <a
                class="icon-categories"
                data-toggle="collapse"
                href="#collapseCategorias"
            >
                <i class="fa fa-list" aria-hidden="true"></i>
            </a>
        </div>
        <div class="collapse" id="collapseCategorias">
            <div class="radios-categorias row m-0">
                <div
                    v-for="categoria in categorias"
                    v-bind:key="categoria.id"
                    class="col-6"
                >
                    <input
                        type="radio"
                        name="radioCategoria"
                        :id="'radio-' + categoria.id"
                    />
                    <label :for="'radio-' + categoria.id">{{
                        categoria.categoria
                    }}</label>
                </div>
            </div>
        </div>
        <div
            class="row m-0 d-flex align-items-center item"
            v-for="item in cardapio"
            v-bind:key="item.id"
        >
            <div class="col-1">
                <label class="check-container">
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
            <div class="col-md-3 col-3 nome">
                <span>{{ item.nome }}</span>
            </div>
            <div class="col-md-3 col-3">
                <span>{{ item.valor | toReal }}</span>
            </div>
            <div class="col-2">
                <i
                    :class="item.status | handleStatusItem"
                    aria-hidden="true"
                ></i>
            </div>
            <div class="col-12 collapsex collapsex-item ">
                <span>{{ item.descricao }}</span>
                <div class="row">
                    <div
                        class="col-3 d-flex justify-content-start ingrediente"
                        v-for="ingrediente in item.ingredientes"
                        v-bind:key="ingrediente.id"
                    >
                        <label class="check-container">
                            <input type="checkbox" checked />
                            <span class="checkmark"> </span>
                            {{ ingrediente.ingrediente }}
                        </label>
                    </div>
                </div>
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
            cardapio: [{ imgs: ["img"], valor: 0.0, status: 1 }],
            mesa: [{ id: 0, status: 2 }],
            idMesa: 1,
            categorias: [{ id: 0, categoria: "Prato Principal" }]
        };
    },
    beforeCreate: function() {},
    filters: {},
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
        url = `${this.db_url}categorias/`;
        this.$http.get(url).then(
            response => {
                this.categorias = response.body;
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
        $(".item")
            .find(".nome")
            .click(function(params) {
                let $item = this.closest(".item");
                let $collapse = $($item).find(".collapse");
                $collapse.collapse("toggle");
                // let $input = $(this).find('input[type="checkbox"]');
                // $input.prop("checked", !$input.prop("checked"));
            });
    }
};
</script>

<style lang='scss'>
@import "../../sass/variables.scss";
.ingrediente {
    .check-container {
        padding-left: 20px;
    }
    .checkmark {
        height: 15px;
        width: 15px;
        &:after {
            left: 4px;
            top: 2px;
            width: 6px;
            height: 9px;
        }
    }
    label {
        font-size: 0.7rem;
    }
    margin-top: 0.1rem;
    margin-bottom: 0.1rem;
}
.radios-categorias {
    padding-top: 0.7rem;
    padding-left: 0.7rem;
    padding-right: 0.7rem;
}
.icon-categories {
    i {
        color: white;
    }
    margin-left: 1rem;
    margin-right: 1rem;
}
.fa-check {
    color: $green;
}
.fa-clock-o {
    color: $blue;
}
.item {
    .fa {
        font-size: 1.5rem;
    }
    .fa-times {
        color: $red;
    }
}
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
    background-color: $primary;
    color: white;
    position: fixed;
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
    background-color: $primary;
}
</style>
