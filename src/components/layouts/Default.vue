<template>
    <div id="l-default" class="l-default">
        <Nav />
        <slot name="content"></slot>
        <Footer />
    </div>
</template>

<script>
import Nav from "./../Nav.vue";
import Footer from "./../Footer.vue";
export default {
    name: "Default",
    data() {
        return {};
    },
    created: function() {},
    components: { Nav, Footer }
};
</script>

<style lang="scss" scoped></style>