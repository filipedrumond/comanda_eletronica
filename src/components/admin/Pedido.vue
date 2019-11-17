<template>
    <div class="admin-pedido container">
        <div class="d-flex w-100">
            <button
                v-for="status in statusPedidos"
                v-bind:key="status.id"
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
                class="pedido col-6 mb-3"
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
                            <span class="ml-3">
                                {{
                                    getIngredientesRemovidos(prato.ingredientes)
                                        .length > 0
                                        ? "REMOVIDO ->"
                                        : "Completo"
                                }}
                            </span>
                        </h5>
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
            filtroStatus: 4
        };
    },
    created: function() {
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
        url = `${this.DB_STATUS}pedidoStatus`;
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
        }
    }
};
</script>

<style lang='scss' scoped>
</style>
