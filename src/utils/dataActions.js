const Actions = require('./actions');

const knex = require('../database/connection');

const emoji = require('node-emoji');
const bot = require('../configBot');

class DataActions extends Actions {

    async createEj(chat, matches, answer){
        const ej = {
            empresa: matches[1],
            emoji: emoji.unemojify(matches[2])
        }

        try{
            await knex('ejdata').insert(ej);
            bot.sendMessage(chat, `${ej.empresa} ${emoji.emojify(ej.emoji)} criada com sucesso`);
        } catch(err){
            bot.sendMessage(chat, 'Não foi possível criar a empresa');
        }

    }

    async updateMetas(chat, matches, answer){
        const [total, ej, metafat, metaproj] = matches

        try{
            await knex('ejdata')
            .where('empresa', '=', ej)
            .update({
                metafat,
                metaproj,
            })
            bot.sendMessage(chat, `${ej} - Metas Atualizadas \nMeta Faturamento: ${metafat} \nMeta Projetos: ${metaproj}`);
        } catch(err){
            bot.sendMessage(chat, 'Não foi possível atulizar as metas');
        }

    }

    async updateDados(chat, matches, answer){
        const [total, ej, fat, proj] = matches

        try{
            await knex('ejdata')
            .where('empresa', '=', ej)
            .update({
                faturamento: knex.raw('faturamento + ?', fat),
                projetos: knex.raw('projetos + ?', proj)
            })
        } catch(err){
            bot.sendMessage(chat, 'Não foi possivel atualizar os dados');
        }

    }

    async showDadosDaRede(chat){
        const data = 
            await knex('ejdata')
                .select('ejdata.*')
                .orderBy('empresa');

        const answer = 
            "<a>DADOS DA REDE:</a> \n\n" +
                data.map(ej => {
                    return(
                        `<a>${emoji.emojify(ej.emoji)} ${ej.empresa}</a> \n` +
                        `<a>${emoji.emojify(':card_file_box:')} ${ej.projetos}/${ej.metaproj}</a> \n` +
                        `<a>${emoji.emojify(':moneybag:')} R$ ${ej.faturamento.toFixed(2)}/ R$ ${ej.metafat.toFixed(2)} \n</a>`
                    )}).join('\n')
            
        bot.sendMessage(chat, answer,{parse_mode : "HTML"});
    }

    async showMonitoramentoDaRede(chat){
        const data = 
            await knex('ejdata')
                .select('ejdata.*')
                .orderBy('empresa');

        const month = new Date().getMonth();

        const answer = 
            "<a>MONITORAMENTO DA REDE:</a> \n\n" +

            `${emoji.emojify(':green_heart:')} Farol Verde : \n\n` +
                data.filter(ej => {
                    return(ej.metafat/12 * (month + 1) <= ej.faturamento) && (ej.metaproj/12 * (month + 1) <= ej.projetos)
                }).map(ej => {
                    return(
                        `<a>${emoji.emojify(ej.emoji)} ${ej.empresa}</a>`
                    )}).join('\n') +

            `\n\n\n ${emoji.emojify(':warning:')} Farol Amarelo : \n\n` +
                data.filter(ej => {
                    return(((ej.metafat/12 * (month + 1) > ej.faturamento) && (ej.metafat/12 * (month) <= ej.faturamento)) || ((ej.metaproj/12 * (month + 1) > ej.projetos) && (ej.metaproj/12 * (month) <= ej.projetos)) && !((ej.metafat/12 * (month) > ej.faturamento) || (ej.metaproj/12 * (month) > ej.projetos)))
                }).map(ej => {
                    return(
                        `<a>${emoji.emojify(ej.emoji)} ${ej.empresa}</a>`
                    )}).join('\n') +

            `\n\n\n ${emoji.emojify(':red_circle:')} Farol Vermelho : \n\n` +
                data.filter(ej => {
                    return(ej.metafat/12 * (month) > ej.faturamento) || (ej.metaproj/12 * (month) > ej.projetos)
                }).map(ej => {
                    return(
                        `<a>${emoji.emojify(ej.emoji)} ${ej.empresa}</a>`
                    )}).join('\n')
    
        bot.sendMessage(chat, answer,{parse_mode : "HTML"});
    }

    async ticketMedioEj(chat, matches){
        const [{faturamento, projetos}] = 
            await knex('ejdata')
                .select('faturamento', 'projetos')
                .where('empresa', '=', matches[2])

        bot.sendMessage(chat, `O ticket médio da ${matches[2]} é R$ ${(faturamento/projetos).toFixed(2)} `)
    }

    async strategicPlan(chat, matches){
        const [ej] = 
            await knex('ejdata')
                .select()
                .where('empresa', '=', matches[2])
        
        const month = new Date().getMonth();

        const faturamentoMedio = ((ej.metafat - ej.faturamento)/(12 - month)) > 0 ? ((ej.metafat - ej.faturamento)/(12 - month)).toFixed(2) : 'Meta Batida';
        const ticketMedio = ((ej.metafat - ej.faturamento)/(ej.metaproj - ej.projetos)) > 0 ? ((ej.metafat - ej.faturamento)/(ej.metaproj - ej.projetos)).toFixed(2) : 'Meta Batida';
        const missFat = (ej.metafat - ej.faturamento) > 0 ? (ej.metafat - ej.faturamento).toFixed(2) : 0
        const missProj = (ej.metaproj - ej.projetos) > 0 ? (ej.metaproj - ej.projetos) : 0

        const answer = `<a><b>${matches[2]}</b> ${emoji.emojify(ej.emoji)} precisa de: </a> \n` +
                        `<a>Faturamento: R$ ${missFat}</a> \n` +
                        `<a>Projetos: ${missProj}</a> \n\n` +
                        `<b>Planejamento estratégico</b> \n` +
                        `<a>Fataturar Mensalmente: R$ ${faturamentoMedio}</a> \n` +
                        `<a>Ticket Médio de: R$ ${ticketMedio}</a>`
                        

        bot.sendMessage(chat, answer,{parse_mode : "HTML"});
    }

    async listByTicket(chat){
        const data = 
            await knex('ejdata')
                .select('ejdata.*');

        data.sort((ej1, ej2) => (ej2.faturamento/ej2.projetos) - (ej1.faturamento/ej1.projetos));

        const answer = 
            "<a>TICKET DA REDE:</a> \n\n" +
                data.map(ej => {
                    return(
                        `<a>${emoji.emojify(ej.emoji)} ${ej.empresa}: R$ ${(ej.faturamento/ej.projetos).toFixed(2)}</a>`
                    )}).join('\n');

            bot.sendMessage(chat, answer,{parse_mode : "HTML"});
    }

}

module.exports = DataActions