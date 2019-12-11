
const mixMethods = {
    setTitle: function (title) {
        document.title = title;
    },
    endSession: function () {
        if (this.$session.exists()) {
            this.$session.destroy();
        }
        this.$router.push({ path: "home" });
    },
    
    /**
     * 
     * @param {boolean} system Se foi o Sistema que gerou esse log
     * @param {string} action Acao Executa Pelo Usuario
     */
    systemLog: function (system, action) {
        let url = `${this.DB_LOG}log`;
        let hoje = new Date();
        let data = `${hoje.getDate()} - ${hoje.getMonth() +
            1} - ${hoje.getFullYear()}`;
        let hora = `${hoje.getHours()}:${hoje.getMinutes()}`;
        let fuso = hoje
            .toString()
            .match(/\((.*)\)/)
            .pop();
        let usuario = "System";
        if (!system) {
            usuario = `Usuario->${this.$session.get(this.USERNAME)}`;
            let isAdmin = this.$session.has(this.ADMINDATA);
            if (isAdmin) {
                let adminData = this.$session.get(this.ADMINDATA);
                usuario = `Admin->${adminData.id} Nome->${adminData.usuario}`
            }
            usuario += `${this.$session.get(this.IDSESSIONNAME)}`;
        }
        let body = {
            usuario: usuario,
            acontecimento: action,
            data: data,
            hora: hora,
            fusoHorario: fuso
        };
        this.$http.post(url, body).then(
            response => {
                console.log("salvo Log");
            },
            response => {
                console.log(response);

                console.log("erro ao fazer Log");
            }
        );
    },
};
export default mixMethods;