<template>
    <nav class="nav container-fluid">
        <ul class="d-flex justify-content-around w-100">
            <li><a>HOME</a></li>
            <li><a>PEDIDOS</a></li>
            <li><a>COMANDA</a></li>
            <li><a>MESA</a></li>
        </ul>
    </nav>
</template>

<script>
export default {
    name: "Nav",
    data() {
        return {
            validation: true
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

            padding-left: 0.7rem;
            padding-right: 0.7rem;

            background-color: rgb(218, 79, 79);
            a {
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
