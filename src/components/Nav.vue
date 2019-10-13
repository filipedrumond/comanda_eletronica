<template>
    <nav class="nav container-fluid">
        <ul class="d-flex justify-content-around w-100">
            <li><router-link :to="{ name: 'home' }">HOME</router-link></li>
            <li><router-link :to="{ name: 'pedido' }">PEDIDOS</router-link></li>
            <li><router-link :to="{ name: 'comanda' }">COMANDA</router-link></li>
            <li><router-link :to="{ name: 'mesa',params: { idMesa: 1 }}">MESA</router-link></li>
        </ul>

    </nav>
</template>

<script>
export default {
    name: "Nav",
    data() {
        return {
            validation: true,
            links:[
                {text:"",link:""}
            ]
        };
    },
    created: function() {},
    computed: {},
    methods: {}
};
</script>

<style lang='scss'>
@import "../../sass/variables.scss";
nav {
    background-color: $primary;
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
                &:hover {
                    box-shadow: 2px rgba(245, 116, 116, 0.5);
                }
            }
        }
    }
}
</style>
