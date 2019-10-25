<template>
    <div class="Pedidos container" id="pedidos">
        <div class="d-flex w-100 mt-2">
            <h5 class="mb-0">Resumo de Pedidos</h5>
        </div>
        <div
            v-for="pedido in pedidos"
            v-bind:key="pedido.id"
            class="row py-2 pedido"
        >
            <div class="col-12 my-2 d-flex align-items-center pr-0">
                <div class="w-100 text-center">
                    <div
                        class="d-flex justify-content-center align-items-baseline"
                    >
                        <h5 class="mb-0 mr-2">Pedido - {{ pedido.id }}</h5>
                        <small
                            ><b class="mr-1">Mesa:</b>{{ pedido.idMesa }}</small
                        >
                    </div>
                    <div>
                        <small class="mr-2">
                            <b class="mr-1">DATA:</b> {{ pedido.data }}
                        </small>
                        <small>
                            <b class="mr-1">HORA:</b>{{ pedido.hora }}
                        </small>
                    </div>
                </div>
                <div
                    :class="
                        `ml-auto d-flex btn-status align-items-center justify-content-between py-2 px-3 pedido-status-` +
                            (pedido.status | handlerStatusPrato)
                    "
                >
                    <div class="mr-2">
                        <small>
                            {{ pedido.status | handlerStatusPratoStr }}
                        </small>
                    </div>
                    <div class="">
                        <i
                            :class="pedido.status | handlerStatusPrato"
                            aria-hidden="true"
                            :title="pedido.status | handlerStatusPratoStr"
                        ></i>
                    </div>
                </div>
            </div>
            <div class="itens-pedido d-flex mb-2">
                <div
                    v-for="item in pedido.pratos"
                    v-bind:key="item.id"
                    class="row m-0 w-100 d-flex align-items-center item"
                >
                    <!-- <div class="col-12">
                        <img
                            :src="'img/prato-' + item.id + '/' + item.imgs[0]"
                            class="img-prato"
                            alt="Imagem do prato"
                        />
                    </div> -->
                    <div class="col-9 ">
                        <b class="nome m-0 d-flex align-items-center">
                            <span class="mr-2">
                                {{ item.nome }}
                            </span>
                            <i
                                class="fa fa-chevron-down"
                                aria-hidden="true"
                            ></i>
                        </b>
                        <div class="col-12 collapse collapse-item px-0">
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
                                        <span>
                                            {{ ingrediente.ingrediente }}
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-3 text-right">
                        <span>{{ item.valor | toReal }}</span>
                    </div>
                </div>
            </div>
            <!-- <div class="btn-pagar">
                <div class="d-block text-center">
                    <i
                        class="fa fa-money"
                        aria-hidden="true"
                        title="Realizar Pagamento"
                    ></i>
                    <div class="">
                        <small>Pagar Agora</small>
                    </div>
                </div>
            </div> -->
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
    methods: {
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
        }
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
                let $item = $(this.closest(".item"));
                let $collapse = $item.find(".collapse");
                $item.find(".fa").toggleClass("fa-chevron-down");
                $item.find(".fa").toggleClass("fa-chevron-up");
                $collapse.collapse("toggle");
            });
    }
};
</script>

<style lang='scss'>
@import "../../sass/variables.scss";
.pedido {
    border-bottom: 1px solid $black;
    &:last-child {
        border: 0;
    }
    .item {
        border-bottom: 1px solid $green;
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        &:last-child {
            border: 0;
            padding-bottom: 0;
        }
    }
}

.itens-pedido {
    width: 100%;
    flex-wrap: wrap;
    // border-bottom: 1px solid $grey;
    // .img-prato {
    //     width: 100%;
    //     height: 75px;
    //     object-fit: cover;
    //     object-position: 50% 24%;
    // }
    .nome {
        i {
            font-size: 0.8rem;
        }
    }
}
.btn-pagar {
    width: 20%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
}
.btn-status {
    width: 50%;
    color: $white;
    i {
        color: $white;
    }
    small {
        text-align: center;
        display: flex;
        flex-wrap: wrap;
        font-size: 0.8rem;
    }
}
.separador-pedidos {
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
.pedido-status-1 {
    background-color: $bDanger;
}
.pedido-status-2 {
    background-color: $bInfo;
}
.pedido-status-3 {
    background-color: $bSuccess;
}
.pedido-status-4 {
    background-color: $bPrimary;
}
.fa-money {
    color: $softGreen;
}
</style>
