const Koa = require('koa')
const {koaBody} = require('koa-body')
const Controller = require('./DBControl/controller')
const control = new Controller()
const http = require('http')

const app = new Koa();

app.use(koaBody({
    urlencoded: true,
    multipart: true,
}))

app.use(async(ctx, next) => {
    const origin = ctx.request.get('Origin')
    if (!origin) {
        return await next()
    }
    const allowOrigin = { 'Access-Control-Allow-Origin': '*', }
    if (ctx.request.method != 'OPTIONS') {
        ctx.response.set({...allowOrigin})
        try {
            return await next()
        } catch(e) {
            e.headers = {...e.headers, ...allowOrigin}
            throw e
        }
    }
    if (ctx.request.get('Access-Control-Request-Method')) {
        ctx.response.set({
            ...allowOrigin,
            'Access-Control-Allow-Methods': ctx.request.get('Access-Control-Request-Method'),
        })
        if (ctx.request.get('Access-Control-Request-Headers')) {
            ctx.response.set('Access-Control-Allow-Headers', ctx.request.get('Access-Control-Allow-Request-Headers'))
        }
        ctx.response.status = 204;
    }
})

app.use(async(ctx) => {
    const { method, id } = ctx.request.query;
    if (ctx.request.method == 'POST') {
        if (method == 'createTicket') {
            try {
                const {name, description} = ctx.request.body
                const result = control.createTicket(name, description)
                ctx.response.body = result;
                ctx.response.status = 201
            } catch (e) {
                ctx.response.status = 500;
                ctx.response.body = 'Sorry, we already fixing the server'
            }
        }
    }
    if (ctx.request.method == 'GET') {
        switch (method) {
            case 'allTickets':
                try {
                    const result = control.getAllTickets()
                    ctx.response.body = result
                    ctx.response.status = 200;
                } catch (e) {
                    ctx.response.status = 500;
                    ctx.response.body = 'Sorry, we already fixing the server'
                }
                return;
            case 'ticketById':
                try {
                    const result = control.getTicketById(id)
                    ctx.response.body = result
                    ctx.response.status = 200;
                } catch (e) {
                    ctx.response.status = 500;
                    ctx.response.body = 'Sorry, we already fixing the server'
                }
                return;
        }
    }
    if (ctx.request.method == 'PATCH') {
        switch (method) {
            case 'updateTicket':
                try {
                    const {name, description} = ctx.request.body
                    const result = control.updateTicket(id, name, description)
                    ctx.response.body = result
                    ctx.response.status = 200;
                } catch (e) {
                    ctx.response.status = 500;
                    ctx.response.body = 'Sorry, we already fixing the server'
                }
                return;
            case 'statusTicket':
                try {
                    const result = control.changeStatusTicket(id)
                    ctx.response.body = result;
                    ctx.response.status = 200
                } catch (e) {
                    ctx.response.status = 500;
                    ctx.response.body = 'Sorry, we already fixing the server'
                }
                return;
        }
    }
    if (ctx.request.method == 'DELETE') {
        if (method == 'deleteTicket') {
            try {
                const result = control.deleteTicket(id)
                ctx.response.body = result;
                ctx.response.status = 200
            } catch (e) {
                ctx.response.status = 500;
                ctx.response.body = 'Sorry, we already fixing the server'
            }
        }
    }
})

http.createServer(app.callback()).listen(3000);