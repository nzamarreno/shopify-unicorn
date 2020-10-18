require('isomorphic-fetch');
const dotenv = require('dotenv');
const Koa = require('koa');
const next = require('next');
const { default: createShopifyAuth } = require('@shopify/koa-shopify-auth');
const { verifyRequest } = require('@shopify/koa-shopify-auth');
const session = require('koa-session');
const static = require('koa-static');
const router = require('@koa/router')()
dotenv.config();
const controllers = require('./controllers/airtableController')
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const koaBody = require('koa-body');
const cors = require('@koa/cors');

const { SHOPIFY_API_SECRET_KEY, SHOPIFY_API_KEY } = process.env;

function CreateController(server) {
    router.post('/post', koaBody(), controllers.PostController)
    router.get('/configuration', controllers.GetConfigurationController)
    router.put('/configuration', controllers.PutConfigurationController)
    router.get('/subscription', controllers.GetSubscriptionController)

    server.use(router.routes())
}

app.prepare().then(() => {
    const server = new Koa()

    // Init CORS
    server.use(cors({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST,GET,PUT"
    }))

    // Create routes
    CreateController(server)

    // Set public folder for distribute JS File
    server.use(static('./public'))

    // Init the lecture of POST parameters
    server.use(koaBody())

    // Configure
    server.use(session({ secure: true, sameSite: 'none' }, server));
    server.keys = [SHOPIFY_API_SECRET_KEY];

    // Redirect on Shopify with authorization
    server.use(
        createShopifyAuth({
            prefix: 'shopify',
            apiKey: SHOPIFY_API_KEY,
            secret: SHOPIFY_API_SECRET_KEY,
            scopes: ['read_products'],
            afterAuth(ctx) {
                const { shop, accessToken } = ctx.session;
                console.log('afterAuth', shop)
                ctx.redirect('/shopify');
            },
        }),
    );
    server.use(verifyRequest());

    server.use(async (ctx) => {
        await handle(ctx.req, ctx.res);
        ctx.respond = false;
        ctx.res.statusCode = 200;
        return
    });

    server.listen(port, () => {
        console.log(`> Ready on the http://localhost:${port}`)
    })
})

