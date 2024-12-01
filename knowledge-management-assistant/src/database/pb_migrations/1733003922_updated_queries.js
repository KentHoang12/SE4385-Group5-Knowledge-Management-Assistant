/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gifftld083w83kz")

  // remove
  collection.schema.removeField("ja5cy23q")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gifftld083w83kz")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ja5cy23q",
    "name": "time",
    "type": "date",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  return dao.saveCollection(collection)
})
