<template>
    <div class="c-nav">
        <nav class="nav container-fluid nav-comum">
            <ul class="d-flex justify-content-around w-100">
                <li><router-link :to="{ name: 'home' }">HOME</router-link></li>
                <li>
                    <router-link :to="{ name: 'pedido' }">PEDIDOS</router-link>
                </li>

                <li>
                    <router-link
                        :to="{ name: 'mesa', params: { idMesa: idMesa } }"
                        >MESA</router-link
                    >
                </li>
            </ul>
        </nav>
        <nav class="nav container-fluid nav-admin">
            <ul class="d-flex justify-content-around w-100">
                <li>
                    <router-link :to="{ name: 'AdminHome' }">HOME</router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'AdminPedido' }">PED</router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'AdminCardapio' }"
                        >CARD</router-link
                    >
                </li>
                <li>
                    <router-link :to="{ name: 'comanda' }">STATS</router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'comanda' }">USE</router-link>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
export default {
    name: "Nav",
    data() {
        return {
            validation: true,
            idMesa: 1,
            links: [{ text: "", link: "" }]
        };
    },
    created: function() {
        this.idMesa = this.$session.get("idMesa") || 1;
    },
    computed: {},
    methods: {}
};
</script>

<style lang="scss" scoped></style>
