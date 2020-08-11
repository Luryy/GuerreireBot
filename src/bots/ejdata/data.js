const DataActions = require('../../utils/dataActions');

const answerData = (msg, bot) => { 
    const actions = new DataActions(msg, bot);

    return(
        [
            {onText:  /cadastrar \[(.+)\] \[(.+)\]/i , answer: `EJ criada com sucesso`, action: actions.createEj},
            {onText:  /atualizar metas \[(.+)\] \[(.+)\] \[(.+)\]/i , answer: `Metas atualizadas com sucesso`, action: actions.updateMetas},
            {onText:  /fechou \[(.+)\] \[(.+)\] \[(.+)\]/i , answer: `Dados atualizados com sucesso`, action: actions.updateDados},
            {onText:  /dados da rede/i , answer: `Dados atualizados com sucesso`, action: actions.showDadosDaRede},
            {onText:  /monitoramento da rede/i , answer: `Dados atualizados com sucesso`, action: actions.showMonitoramentoDaRede},
            {onText:  /qual o ticket m(é|e)dio da \[(.+)\]/i , answer: `Dados atualizados com sucesso`, action: actions.ticketMedioEj},
            {onText:  /planejamento estrat(é|e)gico da \[(.+)\]/i , answer: `Dados atualizados com sucesso`, action: actions.strategicPlan},
            {onText:  /ticket da rede/i , answer: `Dados atualizados com sucesso`, action: actions.listByTicket},
        ]
)};

module.exports = answerData;