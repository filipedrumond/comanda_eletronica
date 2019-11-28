<template>
    <div class="admin-cardapio container">
        <div class="row">
            <button @click="enviarDados()" class="btn-prevent">ENVIAR</button>
            <form action="" class="form-cardapio" id="form-cardapio">
                <input type="file" name="inputThumbnail" id="inputThumbnail" />

                <select name="pratoCategoria" id="">
                    <option
                        v-for="categoria in categorias"
                        v-bind:key="categoria.id"
                        :value="categoria.id"
                        >{{ categoria.categoria }}</option
                    >
                </select>

                <div class="d-flex">
                    Nome do prato
                    <input type="text" name="nome" id="" />
                </div>
                <div class="d-flex">
                    Descricao
                    <input type="text" name="descricao" id="" />
                </div>
                <div class="d-flex">
                    Valor
                    <input type="text" name="valor" id="" />
                </div>
                <div class="ingredientes">
                    <div
                        v-for="index in 24"
                        v-bind:key="index"
                        :class="'ingrediente ingrediente-' + index"
                    >
                        <input type="text" name="ingrediente" id="" />
                        <select name="status" id="">
                            <option
                                v-for="status in statusIngredientes"
                                v-bind:key="status.id"
                                :value="status.id"
                                >{{ status.status }}</option
                            >
                        </select>
                    </div>
                </div>
            </form>
        </div>
        {{ lastPratoId }}
        {{ retornoFoto }}
    </div>
</template>

<script>
import { log } from "util";
export default {
    name: "AdminCardapio",
    data() {
        return {
            lastPratoId: 0,
            retornoFoto: {},
            categorias: [],
            statusIngredientes: [],
            statusPratos: []
        };
    },
    created: function() {
        $(".btn-prevent").click(function(e) {
            e.preventDefault();
        });
        let url = `${this.DB_CARDAPIO}cardapio?_sort=id&_order=desc`;
        this.$http.get(url).then(
            response => {
                this.lastPratoId = response.body[0].id + 1;
            },
            response => {
                this.SimpleAlerts.error({
                    title: "O BANCO MORREU AO PEGAR O ULTIMO PRATO"
                });
            }
        );
        url = `${this.DB_CARDAPIO}categorias`;
        this.$http.get(url).then(
            response => {
                this.categorias = response.body;
            },
            response => {
                this.SimpleAlerts.error({
                    title: "O BANCO MORREU AO PEGAR AS CATEGORIAS"
                });
            }
        );
        url = `${this.DB_STATUS}ingredienteStatus`;
        this.$http.get(url).then(
            response => {
                this.statusIngredientes = response.body;
            },
            response => {
                this.SimpleAlerts.error({
                    title: "O BANCO MORREU AO PEGAR AS STATUS DOS INGREDIENTES"
                });
            }
        );
        url = `${this.DB_STATUS}pratoStatus`;
        this.$http.get(url).then(
            response => {
                this.statusPratos = response.body;
            },
            response => {
                this.SimpleAlerts.error({
                    title: "O BANCO MORREU AO PEGAR AS STATUS DOS PRATOS"
                });
            }
        );
    },
    computed: {},
    methods: {
        enviarFoto: function(callback) {
            let $vue = this;
            let url = `${this.SAVE_PHOTO}`;
            let formData = new FormData(
                document.getElementById("form-cardapio")
            );
            formData.append("idPrato", $vue.lastPratoId);
            $.ajax({
                url: url,
                type: "POST",
                data: formData,
                success: function(data) {
                    $vue.retornoFoto = JSON.parse(data);
                    callback();
                },
                cache: false,
                contentType: false,
                processData: false,
                xhr: function() {
                    // Custom XMLHttpRequest
                    var myXhr = $.ajaxSettings.xhr();
                    if (myXhr.upload) {
                        // Avalia se tem suporte a propriedade upload
                        myXhr.upload.addEventListener(
                            "progress",
                            function() {
                                /* faz alguma coisa durante o progresso do upload */
                            },
                            false
                        );
                    }
                    return myXhr;
                }
            });
        },
        enviarDados: function() {
            let $vue = this;
            this.enviarFoto(() => {
                if (!this.retornoFoto)
                    this.SimpleAlerts.error({ text: "Escolha uma foto" });
                let prato = this.mountPrato();
                prato.imgs = [this.retornoFoto.nomeAleatorio];
                let url = `${this.DB_CARDAPIO}cardapio`;
                let data = prato;
                this.$http.post(url, data).then(
                    response => {
                        this.SimpleAlerts.success({ title: "Prato Criado" });
                    },
                    response => {
                        this.SimpleAlerts.error({
                            title: "O BANCO AO SALVAR O PRATO"
                        });
                    }
                );
                console.log(prato);
            });
        },
        mountPrato: function() {
            let $vue = this;
            let $form = $(".form-cardapio");
            let $ingredientes = $form.find(".ingredientes");
            let ingredientes = [];
            $ingredientes.find(".ingrediente").each(function(index) {
                let $ingrediente = $(this)
                    .find("input[name='ingrediente']")
                    .val();
                if (!$ingrediente) return;
                let $status = parseFloat(
                    $(this)
                        .find("select[name='status']")
                        .val()
                );
                let tempIngrediente = {
                    ingrediente: $ingrediente,
                    status: $status
                };
                ingredientes.push(tempIngrediente);
            });

            let prato = {
                nome: $form.find("input[name='nome']").val(),
                descricao: $form.find("input[name='descricao']").val(),
                valor: parseFloat($form.find("input[name='valor']").val()),
                ingredientes: ingredientes,
                status: 1
            };

            return prato;
        }
    }
};
</script>

<style lang='scss'>
</style>
