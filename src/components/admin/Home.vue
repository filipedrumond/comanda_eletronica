<template>
    <div class="admin-home container">
        <div class="botoes">
            <router-link :to="{ name: 'AdminPedido' }" class="botao bg-success">
                <div class="texto">
                    Pedidos
                </div>
                <div class="icone">
                    <i class="fa fa-usd" aria-hidden="true"></i>
                </div>
            </router-link>
            <router-link :to="{ name: 'home' }" class="botao bg-danger">
                <div class="texto">
                    Cardápio
                </div>
                <div class="icone">
                    <i class="fa fa-list" aria-hidden="true"></i>
                </div>
            </router-link>
            <router-link :to="{ name: 'home' }" class="botao bg-warning">
                <div class="texto">
                    Estatíticas
                </div>
                <div class="icone">
                    <i class="fa fa-bar-chart" aria-hidden="true"></i>
                </div>
            </router-link>
            <router-link :to="{ name: 'home' }" class="botao bg-info">
                <div class="texto">
                    Usuários
                </div>
                <div class="icone">
                    <i class="fa fa-address-card-o" aria-hidden="true"></i>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: "AdminHome",
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
@import "../../../sass/variables.scss";
.container {
    padding-top: 15px;
}
.botoes {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    .botao {
        border-radius: 4%;
        margin: 0.5vw;
        width: 48%;
        height: 48vw;
        flex-direction: column;
        display: flex;
        .texto {
            align-self: center;
            font-size: 2rem;
            color: $white;
        }
        .icone {
            margin-top: 15%;
            align-self: center;
            i {
                font-size: 3rem;
                color: $white;
            }
        }
    }
    .botao2 {
        border-radius: 4%;
        margin: 0.5vw;
        width: 48%;
        height: 48vw;
        display: flex;
        justify-content: center;
        align-items: center;
        i {
            font-size: 3rem;
            color: $white;
        }
    }
}
</style>
