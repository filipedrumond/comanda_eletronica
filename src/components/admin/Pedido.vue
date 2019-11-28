<template>
    <div class="admin-pedido container">
        <div class="d-flex w-100">
            <button
                v-for="status in statusPedidos"
                v-bind:key="status.id"
                :class="
                    (filtroStatus == status.id ? 'btn-success' : 'btn-info') +
                        ' btn '
                "
                @click="
                    () => {
                        filtroStatus = status.id;
                    }
                "
            >
                {{ status.status }}
            </button>
        </div>
        <h4>
            Mostrando por -> Pedidos "{{
                filtroStatus | handlerStatusPedidotr
            }}"
        </h4>
        <div
            v-for="mesa in pedidosPorMesaPorStatus"
            v-bind:key="mesa.id"
            class="mesa col-12 row"
        >
            <div
                v-if="
                    mesa[0] ? (mesa[0].idMesa ? mesa[0].idMesa : false) : false
                "
                class="col-12"
            >
                <h4>Mesa - {{ mesa[0].idMesa }}</h4>
            </div>
            <div
                v-for="pedido in mesa"
                v-bind:key="pedido.id"
                class="pedido col-6 mb-3 border"
            >
                <div class="d-flex align-items-baseline">
                    <div class="nome">
                        <h5>pedido de - {{ pedido.nome }}</h5>
                    </div>
                    <div class="data-hora ml-3 d-flex">
                        <b>
                            {{ pedido.data }}
                        </b>
                        <b class="ml-3">
                            {{ pedido.hora }}
                        </b>
                    </div>
                </div>
                <div class="botoes d-flex mb-2">
                    <button
                        @click="editarPedido(2, pedido)"
                        class="btn btn-warning"
                    >
                        RECEBIDO
                    </button>
                    <button
                        @click="editarPedido(3, pedido)"
                        class="btn btn-info"
                    >
                        EM PREPARO
                    </button>
                    <button
                        @click="editarPedido(4, pedido)"
                        class="btn btn-success"
                    >
                        PRONTO
                    </button>
                    <button
                        @click="editarPedido(5, pedido)"
                        class="btn btn-danger"
                    >
                        REVISAR
                    </button>
                </div>
                <div class="pagamento">
                    <span>
                        {{ pedido.statusPagamento | handlerStatusPagamentoStr }}
                    </span>
                </div>
                <div>
                    <h5 class="mt-3">
                        items do pedido
                    </h5>
                    <div
                        class="prato "
                        v-for="prato in pedido.pratos"
                        v-bind:key="prato.id"
                    >
                        <h5>
                            {{ prato.nome }}
                        </h5>
                        <div>
                            <span class="">
                                {{
                                    getIngredientesRemovidos(prato.ingredientes)
                                        .length > 0
                                        ? "REMOVIDO ->"
                                        : "Completo"
                                }}
                            </span>
                        </div>
                        <div class="row">
                            <div
                                class="col-3 ingrediente d-flex"
                                v-for="ingrediente in getIngredientesRemovidos(
                                    prato.ingredientes
                                )"
                                v-bind:key="ingrediente.id"
                            >
                                <i class="fa fa-circle" aria-hidden="true"></i>
                                {{ ingrediente.ingrediente }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "AdminPedido",
    data() {
        return {
            pedidos: [],
            statusPedidos: [],
            pedidosPorMesa: [],
            filtroStatus: 2
        };
    },
    created: function() {
        this.loadPedidos();
        this.loadPedidoStatus();
    },
    computed: {
        pedidosPorMesaPorStatus: function() {
            let $vue = this;
            let ret = [];
            $.each(this.pedidosPorMesa, function(key, value) {
                ret.push(
                    value.filter(value => {
                        return value.status == $vue.filtroStatus;
                    })
                );
            });
            return ret;
        }
    },
    methods: {
        loadPedidos: function() {
            let url = `${this.DB_DINAMICO}pedidos`;
            this.$http.get(url).then(
                response => {
                    this.pedidos = response.body;
                    this.pedidosPorMesa = this.groupBy(response.body, "idMesa");
                },
                response => {
                    this.SimpleAlerts.error({
                        title: "O BANCO MORREU NOS PEDIDOS"
                    });
                }
            );
        },
        loadPedidoStatus: function() {
            let url = `${this.DB_STATUS}pedidoStatus`;
            this.$http.get(url).then(
                response => {
                    this.statusPedidos = response.body;
                },
                response => {
                    this.SimpleAlerts.error({
                        title: "O BANCO MORREU NOS STATUS DE PEDIDO"
                    });
                }
            );
        },
        print: function() {
            console.log(this.pedidosPorMesaPorStatus);
        },
        groupBy: function(xs, key) {
            return xs.reduce(function(rv, x) {
                (rv[x[key]] = rv[x[key]] || []).push(x);
                return rv;
            }, {});
        },
        getIngredientesRemovidos: function(ingredientes) {
            return ingredientes.filter(ele => {
                return ele.status == 2;
            });
        },
        editarPedido: function(status, pedido) {
            let url = `${this.DB_DINAMICO}pedidos/${pedido.id}`;
            let data = pedido;
            data.status = status;
            this.$http.put(url, data).then(
                response => {
                    console.log("PEDIDO ATUALIZADO");
                    this.loadPedidos();
                },
                response => {
                    console.log("PEDIDO ERRO");
                }
            );
        }
    }
};
</script>

<style lang='scss' scoped>
</style>
