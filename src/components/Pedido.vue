<template>
    <div class="Pedido container" id="pedido">
        {{ requestResult }}
        <br />
        <br />
        <br />
        {{ $session.getAll() }}
    </div>
</template>

<script>
export default {
    name: "pedido",
    data() {
        return {
            requestResult: []
        };
    },
    created: function() {
        let url = `${this.db_url}base`;
        this.$http.get(url).then(
            response => {
                this.requestResult = response.body;
            },
            response => {
                this.SimpleAlerts.error({
                    title: "O BANCO MORREU NOS PEDIDOS"
                });
            }
        );
    },
    computed: {},
    methods: {}
};
</script>

<style lang='scss'>
</style>
