const ig = require('./instagram');
const config = require('./config');


(async () => {

  await ig.initialize();

  await ig.login(config.username,config.pass);

  await ig.likeTagsProcess(['harrypotter','jkrowling']);

})()