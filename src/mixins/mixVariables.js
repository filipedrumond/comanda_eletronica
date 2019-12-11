
import { SimpleAlerts } from "@filipedp/simple_dialog";
import { SimpleConfirms } from "@filipedp/simple_dialog";
import { SimpleFormAlerts } from "@filipedp/simple_dialog";
const mixVariables = {
    data:function(){
        let SERVER_BASE_URL = "http://" + window.location.hostname;
        return {
            DB_CARDAPIO: SERVER_BASE_URL + ":8015/",
            DB_DINAMICO: SERVER_BASE_URL + ":8016/",
            DB_STATUS: SERVER_BASE_URL + ":8017/",
            DB_PAGAMENTOS: SERVER_BASE_URL + ":8018/",
            DB_ADMIN: SERVER_BASE_URL + ":8019/",
            DB_LOG: SERVER_BASE_URL + ":8020/",
            SAVE_PHOTO: SERVER_BASE_URL + ":8085/saveFile.php",
            IDSESSIONNAME: "idSession",
            ADMINDATA: "dadosAdmin",
            DEFAULTPATH: "#/",
            USERNAME: "nome",
            SimpleAlerts: SimpleAlerts,
            SimpleConfirms: SimpleConfirms,
            SimpleFormAlerts: SimpleFormAlerts,

        }
    }
};
export default mixVariables;