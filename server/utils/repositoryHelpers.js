const getFieldsRecords = (records) => records.map(x => x.fields)
const getIdRecord = (record) => record.id
const findFirstOrDefault = (records) => {
    if (records[0]) return records[0]
    return null
}

module.exports = {
    findFirstOrDefault,
    getFieldsRecords,
    getIdRecord,
}