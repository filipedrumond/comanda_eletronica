<template>
    <div class="admin-pedido container"></div>
</template>

<script>
export default {
    name: "AdminPedido",
    data() {
        return {
            pedidos: []
        };
    },
    created: function() {
        // let url = `${this.DB_DINAMICO}pedidos`;
        // this.$http.get(url).then(
        //     response => {
        //         this.pedidos = response.body;
        //         console.log(response.body);
        //     },
        //     response => {
        //         this.SimpleAlerts.error({
        //             title: "O BANCO MORREU NOS PEDIDOS"
        //         });
        //     }
        // );
    },
    computed: {},
    methods: {}
};
</script>

<style lang='scss'>
</style>
