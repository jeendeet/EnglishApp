const siteRouter = require('./site')
const videoRouter = require('./video')
const wordRouter = require('./word')
// const apiRouter = require('./apiApp')

function route(app){
    app.use('/videos', videoRouter);
    app.use('/word', wordRouter); 
    app.use('/', siteRouter);
}

module.exports = route
