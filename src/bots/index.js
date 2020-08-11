const bot = require('../configBot');

const bots = {
    fastAnswers: require('./fastAnswers/fastAnswers'),
    ejdata: require('./ejdata/ejdata'),
}
  
console.log('Init Answers');
bots.fastAnswers(bot);
bots.ejdata(bot);
