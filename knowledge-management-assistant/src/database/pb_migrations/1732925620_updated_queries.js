/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gifftld083w83kz")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "sbk7ix3g",
    "name": "llmresponse",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gifftld083w83kz")

  // remove
  collection.schema.removeField("sbk7ix3g")

  return dao.saveCollection(collection)
})
