<template>
    <div class="base container row">
        <div class="events col">
            <h2>Events</h2>
            <div class="d-flex align-items-center">
                <h5 class="mr-3">BLUR</h5>
                <input
                    class="form-control"
                    type="text"
                    v-model="input"
                    @blur="baseFuncition('BLUR')"
                />
            </div>
            <div class="d-flex align-items-center">
                <h5 class="mr-3">CLICK</h5>
                <input
                    class="form-control"
                    type="text"
                    v-model="input"
                    @click="baseFuncition('CLICK')"
                />
            </div>
        </div>
        <div class="requests col">
            <h2>Requests</h2>
            <div class="d-flex align-items-center">
                <button class="btn btn-success mr-3" @click="baseGet()">
                    GET BASE
                </button>
                {{ requestResult }}
            </div>
            <div class="d-flex align-items-center mt-2">
                <button class="btn btn-danger mr-3" @click="basePost()">
                    Post BASE
                </button>
                {{ requestResult }}
            </div>
            <div class="d-flex align-items-center mt-2">
                <button class="btn btn-info mr-3" @click="basePut()">
                    Put BASE
                </button>
                {{ requestResult }}
            </div>
            <div class="d-flex align-items-center mt-2">
                <button class="btn btn-warning mr-3" @click="basePatch()">
                    Patch BASE
                </button>
                {{ requestResult }}
            </div>
            <div class="d-flex align-items-center mt-2">
                <button class="btn btn-danger mr-3" @click="baseDelete()">
                    Delete BASE
                </button>
                {{ requestResult }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Base",
    data() {
        return {
            validation: true,
            input: "Input Text",
            requestResult: {}
        };
    },
    created: function() {
        console.log("Created");
    },
    computed: {
        baseComputed: function() {
            if (this.validation) {
                return false;
            }
            return true;
        }
    },
    methods: {
        baseFuncition: function(params) {
            console.log(params);
        },
        baseGet: function() {
            let url = `${this.db_url}base`;
            this.$http.get(url).then(
                response => {
                    this.requestResult = response.body;
                },
                response => {
                    this.SimpleAlerts.error({ title: "O BANCO MORREU" });
                }
            );
        },
        basePost: function() {
            let url = `${this.db_url}base`;
            let data = { content: "teste_post" };
            this.$http.post(url, data).then(
                response => {
                    this.SimpleAlerts.success({ title: "Enviado" });
                    this.baseGet();
                },
                response => {
                    this.SimpleAlerts.error({ title: "O BANCO MORREU" });
                }
            );
        },
        basePut: function() {
            let url = `${this.db_url}base/6`;
            let data = { content: "teste_put" + Math.random() };
            this.$http.put(url, data).then(
                response => {
                    this.SimpleAlerts.success({ title: "Enviado" });
                    this.baseGet();
                },
                response => {
                    console.log(response);
                    this.SimpleAlerts.error({ title: "O BANCO MORREU" });
                }
            );
        },
        basePatch: function() {
            let url = `${this.db_url}base/6`;
            let data = { content: "teste_patch" + Math.random() };
            this.$http.patch(url, data).then(
                response => {
                    this.SimpleAlerts.success({ title: "Enviado" });
                    this.baseGet();
                },
                response => {
                    console.log(response);
                    this.SimpleAlerts.error({ title: "O BANCO MORREU" });
                }
            );
        },
        baseDelete: function() {
            let url = `${this.db_url}base/6`;
            this.$http.delete(url).then(
                response => {
                    this.SimpleAlerts.success({ title: "Enviado" });
                    this.baseGet();
                },
                response => {
                    console.log(response);
                    this.SimpleAlerts.error({ title: "O BANCO MORREU" });
                }
            );
        }
    }
};
</script>

<style lang='scss'>
</style>
