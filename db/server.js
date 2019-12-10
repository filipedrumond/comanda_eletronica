const jsonServer = require('json-server')
/**
 * 
 * @param {string} path Path to json arquive 
 */
function startDbArquive(path,port) {
    let server = jsonServer.create()
    let router = jsonServer.router(path)
    // let middlewares = jsonServer.defaults()

    server.use(middlewares)
    server.use(router)
    server.listen(port, () => {
        console.log(`JSON Server running ${path} on ${port}`)
    })
}
var dbs = [{}]