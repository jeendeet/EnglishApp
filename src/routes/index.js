const siteRouter = require('./site')
const videoRouter = require('./video')
const wordRouter = require('./word')
const adminRouter = require('./admin')
// const apiRouter = require('./apiApp')

function route(app){
    app.use('/admin',adminRouter);
    app.use('/videos', videoRouter);
    app.use('/word', wordRouter); 
    app.use('/', siteRouter);
}

module.exports = route
