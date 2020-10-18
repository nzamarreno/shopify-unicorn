const dotenv = require('dotenv')
const Airtable = require('airtable')
dotenv.config()

const { AIRTABLE_DATABASE_ID, AIRTABLE_API_KEY } = process.env;

const airtableTables = {
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

function post(uuid, email) {
    const airtable = getAirtable()
    airtable(airtableTables.Subscription).create([
        {
            "fields": {
                "uuid": uuid,
                "email": email
            }
        }
    ], function (err, records) {
        if (err) {
            console.log(err)
            return false
        }
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

                resolve(records)
            })
    })
}

/**
 * Description: Update Entities
 * @param {string} table Table Name
 * @param {Array} entitiesUpdated Entites Updated
 */
function update(table, entitiesUpdated) {
    const airtable = getAirtable()
    airtable(table).update(entitiesUpdated, function (err, records) {
        if (err) {
            console.log(err);
            return;
        }
    });
}

module.exports = {
    find,
    post,
    update,
    getAirtableUrl,
    airtableTables,
}