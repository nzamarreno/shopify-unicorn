const Repositories = require('../repositories/repository')
const RepositoryHelpers = require('../utils/repositoryHelpers')

const NotFound = (ctx) => {
    return ctx.body = {
        "status": 404
    }
}

/**
 * Description: Get Subcription
 * Example: /subscription?uuid=f33a4f00-31bb-404e-b2de-95b1e2743f21
 * @param {Object} ctx       
 */
async function GetSubscriptionController(ctx) {
    const uuid = ctx.query.uuid
    const response = await Repositories.find(Repositories.airtableTables.Subscription, 'uuid', uuid)
    const entities = RepositoryHelpers.getFieldsRecords(response)
    console.log('GetSubscriptionController', uuid)
    ctx.body = {
        "status": 200,
        "json": entities
    }
}

/**
 * Description: Get Configuration
 * Example: /configuration?uuid=f33a4f00-31bb-404e-b2de-95b1e2743f21
 * @param {Object} ctx       
 */
async function GetConfigurationController(ctx) {
    const uuid = ctx.query.uuid;
    const response = await Repositories.find(Repositories.airtableTables.Configuration, 'uuid', uuid)
    const entities = RepositoryHelpers.getFieldsRecords(response)
    console.log('GetConfigurationController', uuid)
    ctx.body = {
        "status": 200,
        "json": RepositoryHelpers.findFirstOrDefault(entities)
    }
}

/**
 * Description: Create entry
 * @param {Object} ctx Context of Controller
 */
function PostController(ctx) {
    console.log('POST', ctx.request.body)
    if (!ctx.request.body) return
    const { uuid, email } = JSON.parse(ctx.request.body)
    Repositories.post(uuid, email)
    ctx.body = {
        "status": 200
    }
}

/**
 * Description: Put Configuration
 * Example: /update?uuid=f33a4f00-31bb-404e-b2de-95b1e2743f21
 * @param {Object} ctx       
 */
async function PutConfigurationController(ctx) {
    console.log('PUT', ctx.request.body)
    if (!ctx.request.body) return
    const { uuid, title, description } = JSON.parse(ctx.request.body)
    const entities = await Repositories.find(Repositories.airtableTables.Configuration, 'uuid', uuid)
    console.log(entities)
    if (entities && entities.length === 0) {
        NotFound(ctx)
        return
    }

    const entityFound = RepositoryHelpers.findFirstOrDefault(entities)
    if (!entityFound) {
        NotFound(ctx)
        return
    }

    const entityId = RepositoryHelpers.getIdRecord(entityFound)

    const entity = {
        id: entityId,
        fields: {
            title,
            description
        }
    }
    
    const response = Repositories.update(Repositories.airtableTables.Configuration, [entity])

    ctx.body = {
        "status": 200,
        "json": response
    }
}

module.exports = {
    GetConfigurationController,
    PutConfigurationController,
    GetSubscriptionController,
    PostController,
}