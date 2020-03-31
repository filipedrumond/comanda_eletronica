<template>
    <section>
        <div class="content">
            <div class="title">
                <h1>Acessar o mydog</h1>
            </div>
            <form action="">
                <label for="fname">Usuário </label>
                <input
                    type="text"
                    :value="usuario"
                    placeholder="filipe@mydog.com"
                />
                <label for="lname">Senha </label>
                <input type="password" :value="senha" placeholder="*****" />
                <button class="btn btn-primary" type="submit">Enviar</button>
            </form>
        </div>
    </section>
</template>

<script>
export default {
    name: "login",
    data() {
        return {
            usuario: "",
            senha: ""
        };
    },
    created: function() {},
    components: {}
};
</script>