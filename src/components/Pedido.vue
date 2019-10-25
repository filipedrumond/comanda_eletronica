<template>
    <div class="Pedido container" id="pedido">
        <div class="d-flex w-100 mt-2">
            <h5 class="mb-0">Resumo de Pedidos</h5>
        </div>
        <div v-for="pedido in pedidos" v-bind:key="pedido.id" class="row">
            <div class="col-12 my-2 d-flex align-items-center">
                <span class="ml-auto"> Pedido - {{ pedido.id }} </span>
                <div class="btn-status ml-auto">
                    <i
                        :class="pedido.status | handlerStatusPrato"
                        aria-hidden="true"
                        :title="pedido.status | handlerStatusPratoStr"
                    ></i>
                </div>
            </div>
            <div class="col-10">
                <div
                    v-for="item in pedido.pratos"
                    v-bind:key="item.id"
                    class="row m-0 d-flex align-items-center item"
                >
                    <div class="col-4">
                        <img
                            :src="'img/prato-' + item.id + '/' + item.imgs[0]"
                            class="img-fluid"
                            alt="Imagem do prato"
                        />
                    </div>
                    <div class="col-5 nome">
                        <span>{{ item.nome }}</span>
                    </div>
                    <div class="col-3">
                        <span>{{ item.valor | toReal }}</span>
                    </div>
                    <div class="col-12 collapse collapse-item ">
                        <span>{{ item.descricao }}</span>
                        <div class="row mt-2">
                            <div
                                class="col-3 d-flex justify-content-start ingrediente"
                                v-for="ingrediente in item.ingredientes"
                                v-bind:key="ingrediente.id"
                            >
                                <label class="check-container">
                                    <input
                                        type="checkbox"
                                        disabled
                                        :checked="ingrediente.status == 1"
                                        v-model="ingrediente.status"
                                        :true-value="1"
                                        :false-value="2"
                                    />
                                    <span class="checkmark"> </span>
                                    {{ ingrediente.ingrediente }}
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-2 status-pedido d-flex align-items-center">
                <div class="btn-pagar">
                    <i
                        class="fa fa-money"
                        aria-hidden="true"
                        title="Realizar Pagamento"
                    ></i>
                </div>
            </div>
            <div class="separador"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: "pedido",
    data() {
        return {
            pedidos: []
        };
    },
    filters: {
        handlerStatusPrato: function(value) {
            switch (value) {
                case 1:
                    return "fa fa-usd";
                case 2:
                    return "fa fa-hourglass-half";
                case 3:
                    return "fa fa-check";
                case 4:
                    return "fa fa-ticket";
                default:
                    return "fa fa-usd";
            }
        },
        handlerStatusPratoStr: function(value) {
            switch (value) {
                case 1:
                    return "Aguardando Pagamento";
                case 2:
                    return "Em Preparo";
                case 3:
                    return "Pronto";
                case 4:
                    return "Finalizado";
                default:
                    return "Aguardando Pagamento";
            }
        }
    },
    created: function() {
        let url = `${this.DB_DINAMICO}pedidos?${
            this.IDSESSIONNAME
        }=${this.$session.get(this.IDSESSIONNAME)}`;
        this.$http.get(url).then(
            response => {
                this.pedidos = response.body;
                console.log(response.body);
            },
            response => {
                this.SimpleAlerts.error({
                    title: "O BANCO MORREU NOS PEDIDOS"
                });
            }
        );
    },
    updated() {
        $(".item")
            .find(".nome")
            .click(function(params) {
                let $item = this.closest(".item");
                let $collapse = $($item).find(".collapse");
                $collapse.collapse("toggle");
            });
    }
};
</script>

<style lang='scss'>
@import "../../sass/variables.scss";
.status-pedido {
    // display: flex;
    // flex-wrap: wrap;
    // // justify-content: space-between;
    // vertical-align: baseline;
    .btn-status {
    }
    .btn-pagar {
    }
}
.separador {
    background-color: $black;
    display: flex;
    width: 100%;
    height: 1px;
}
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
.fa {
    font-size: 1.5rem;
}
.fa-usd {
    color: $red;
}
.fa-hourglass-half {
    color: $blue;
}
.fa-check {
    color: $green;
}
.fa-ticket {
    color: $gold;
}
.btn-fixed-bottom {
    background-color: $softGreen;
    color: white;
    position: fixed;
    bottom: 1.2rem;
    left: 1.2rem;
    &:active,
    &:focus {
        color: white;
    }
}
</style>
