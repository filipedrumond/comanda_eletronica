<template>
    <div class="Blank container">

    </div>
</template>

<script>
export default {
    name: "Blank",
    data() {
        return {
            validation: true,
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
    }
};
</script>

<style lang='scss'>
</style>
