const siteRouter = require('./site')
const videoRouter = require('./video')
const wordRouter = require('./word')
const adminRouter = require('./admin')
const userRouter = require('./user')
const apiRouter = require('./apiApp')
// const apiRouter = require('./apiApp')

function route(app){
    app.use('/api',apiRouter);
    app.use('/admin',adminRouter);
    app.use('/user', userRouter); 
    app.use('/videos', videoRouter);
    app.use('/word', wordRouter); 
    app.use('/', siteRouter);
}

module.exports = route
