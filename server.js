require('isomorphic-fetch');
const dotenv = require('dotenv');
const Koa = require('koa');
const next = require('next');
const { default: createShopifyAuth } = require('@shopify/koa-shopify-auth');
const { verifyRequest } = require('@shopify/koa-shopify-auth');
const session = require('koa-session');
const static = require('koa-static');
const router = require('@koa/router')()
const controllers = require('./server/controllers/airtableController')
const koaBody = require('koa-body');
const cors = require('@koa/cors');
const addScriptTag = require("./server/controllers/addScriptTag");
dotenv.config();
const { default: graphQLProxy } = require('@shopify/koa-shopify-graphql-proxy');
const { ApiVersion } = require('@shopify/koa-shopify-graphql-proxy');

// Configurations Stuffs
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const { SHOPIFY_API_SECRET_KEY, SHOPIFY_API_KEY } = process.env;


function initController(server) {
    router.post('/api/post', koaBody(), controllers.PostController)
    router.get('/api/configuration', controllers.GetConfigurationController)
    router.put('/api/configuration', koaBody(), controllers.PutConfigurationController)
    router.get('/api/subscription', controllers.GetSubscriptionController)

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
    initController(server)

    // Set public folder for distribute JS File
    server.use(static('./server/public'))

    // Init the lecture of POST parameters
    server.use(koaBody())

    // Configure Security connexion
    server.use(session({ secure: true, sameSite: 'none' }, server));
    server.keys = [SHOPIFY_API_SECRET_KEY];

    // Redirect on Shopify with authorization
    server.use(graphQLProxy({version: ApiVersion.July20}))
    server.use(
        createShopifyAuth({
            apiKey: SHOPIFY_API_KEY,
            secret: SHOPIFY_API_SECRET_KEY,
            scopes: ['read_products', 'read_script_tags', 'write_script_tags'],
            async afterAuth(ctx) {
                const { shop, accessToken } = ctx.session;
                console.log('afterAuth', shop)
                await addScriptTag(ctx, accessToken, shop)
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

