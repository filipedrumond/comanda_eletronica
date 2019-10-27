<template>
    <nav class="nav container-fluid">
        <ul class="d-flex justify-content-around w-100">
            <li><router-link :to="{ name: 'home' }">HOME</router-link></li>
            <li><router-link :to="{ name: 'pedido' }">PEDIDOS</router-link></li>
            <li>
                <router-link :to="{ name: 'comanda' }">COMANDA</router-link>
            </li>
            <li>
                <router-link :to="{ name: 'mesa', params: { idMesa: idMesa } }"
                    >MESA</router-link
                >
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
    name: "Nav",
    data() {
        return {
            validation: true,
            idMesa: 0,
            links: [{ text: "", link: "" }]
        };
    },
    created: function() {
        this.idMesa = this.$session.get("idMesa");
    },
    computed: {},
    methods: {}
};
</script>

<style lang='scss'>
@import "../../sass/variables.scss";
nav {
    position: fixed;
    top: 0;
    z-index: 1;
    background-color: $primary;
    height: 42px;
    ul {
        li {
            list-style: none;
            padding-top: 0.7rem;
            padding-bottom: 0.7rem;
            a {
                padding-top: 0.7rem;
                padding-bottom: 0.7rem;

                padding-left: 0.7rem;
                padding-right: 0.7rem;

                background-color: rgb(218, 79, 79);
                text-decoration: none;
                color: white;
                height: 42px !important;
                &:hover {
                    box-shadow: 2px rgba(245, 116, 116, 0.5);
                }
            }
        }
    }
}
</style>
