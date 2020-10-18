const dotenv = require('dotenv')
const Airtable = require('airtable')
dotenv.config()

const { AIRTABLE_DATABASE_ID, AIRTABLE_API_KEY } = process.env;
const airtableTabs = {
    Configuration: 'Configuration',
    Subscription: 'Subscription'
}

function getAirtableUrl(tableName) {
    return `${AIRTABLE_URL}/${AIRTABLE_DATABASE_ID}/${tableName}`
}

function getAirtable() {
    Airtable.configure({
        apiKey: AIRTABLE_API_KEY
    });

    return Airtable.base(AIRTABLE_DATABASE_ID);
}

function createUser(uuid, email) {
    const airtable = getAirtable()
    console.log(uuid, email)
    airtable(airtableTabs.Subscription).create([
        {
          "fields": {
            "uuid": uuid,
            "email": email
          }
        }
      ], function(err, records) {
        if (err) {
          console.log(err)
          return false
        }
        console.log(records)
        return true
      });
}

/**
 * Description: Get Application Fields
 * @param {string} field 
 * @param {string} search 
 */
async function find(table, field, search) {
    const airtable = getAirtable()
    console.log(table, field, search)
    return new Promise((resolve, reject) => {
        airtable(table)
        .select({
            filterByFormula: `${field} = "${search}"`
        })
        .firstPage(function (err, records) {
            if (err) {
                console.log('There is an error here!', err) 
                reject()
            }
            const results = records.map(x => x.fields)
            console.log(results)
            resolve(results)
        })
    })
}

/**
 * Description: Create entry
 * @param {Object} ctx Context of Controller
 */
function PostController(ctx) {
    console.log(ctx.request.body)
    if (!ctx.request.body) return
    const {uuid, email} = JSON.parse(ctx.request.body)
    console.log('POST', uuid, email)
    createUser(uuid, email)
    ctx.body = {
        "status": 200
    }
}

/**
 * Example: /get?uuid=f33a4f00-31bb-404e-b2de-95b1e2743f21
 * Description: Get Configuration
 * @param {Object} ctx       
 */
async function GetConfigurationController(ctx) {
    const uuid = ctx.query.uuid;
    const response = await find(airtableTabs.Configuration, 'uuid', uuid)  
    console.log('GetConfigurationController', uuid, response)
    ctx.body = {
        "status": 200,
        "json": response
    }
}

/**
 * Example: /get?uuid=f33a4f00-31bb-404e-b2de-95b1e2743f21
 * Description: Get Configuration
 * @param {Object} ctx       
 */
async function PutConfigurationController(ctx) {
    const uuid = ctx.query.uuid;
    const response = await find(airtableTabs.Configuration, 'uuid', uuid)  
    
    ctx.body = {
        "status": 200,
        "json": response
    }
}

/**
 * Example: /get?uuid=f33a4f00-31bb-404e-b2de-95b1e2743f21
 * Description: Get Subcription
 * @param {Object} ctx       
 */
async function GetSubscriptionController(ctx) {
    const uuid = ctx.query.uuid;
    const response = await find(airtableTabs.Subscription, 'uuid', uuid)  
    console.log('GetSubscriptionController', uuid, response)
    ctx.body = {
        "status": 200,
        "json": response
    }
}

module.exports = {
    GetConfigurationController,
    GetSubscriptionController,
    PutConfigurationController,
    PostController,
}