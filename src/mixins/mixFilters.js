const mixFilters = {
    filters: {
        toReal: function (value) {
            return "R$ " + value.toFixed(2);
        },
        handleStatusItem: function (value) {
            switch (value) {
                case 1:
                    return "fa fa-check";
                case 2:
                    return "fa fa-clock-o";
                case 3:
                    return "fa fa-times";
                default:
                    return "fa fa-times";
            }
        },
        handleStatusMesa: function (value) {
            switch (value) {
                case 1:
                    return "fa fa-check";
                case 2:
                    return "fa fa-clock-o";
                case 3:
                    return "fa fa-times";
                default:
                    return "fa fa-times";
            }
        },
        handlerStatusPrato: function (value) {
            switch (value) {
                case 1:
                    return "fa fa-usd";
                case 2:
                    return "fa fa-hourglass-half";
                case 3:
                    return "fa fa-check";
                case 4:
                    return "fa fa-ticket";
                default:
                    return "fa fa-usd";
            }
        },
        handlerStatusPratoStr: function (value) {
            switch (value) {
                case 1:
                    return "Aguardando Pagamento";
                case 2:
                    return "Em Preparo";
                case 3:
                    return "Pronto";
                case 4:
                    return "Finalizado";
                default:
                    return "Aguardando Pagamento";
            }
        },
        handlerStatusPedidotr: function (value) {
            switch (value) {
                case 1:
                    return "Aguardando Pagamento";
                case 2:
                    return "Recebido"
                case 3:
                    return "Em Preparo";
                case 4:
                    return "Pronto";
                case 5:
                    return "Revisar Pedido";
                case 6:
                    return "Finalizado";
                default:
                    return "Aguardando Pagamento";
            }
        },
        handlerStatusPagamentoStr: function (value) {
            switch (value) {
                case 1:
                    return "Aguardando Pagamento";
                case 2:
                    return "Pago com cartão";
                case 3:
                    return "Pago no caixa";
                default:
                    return "Aguardando Pagamento";
            }
        },
        handlerStatusIngredienteStr: function (value) {
            switch (value) {
                case 1:
                    return "Disponível/Checkado";
                case 2:
                    return "Disponível/NaoCheckado";
                case 3:
                    return "Inpisponivel";
                default:
                    return "Disponível/Checkado";
            }
        }

    },
};
export default mixFilters;