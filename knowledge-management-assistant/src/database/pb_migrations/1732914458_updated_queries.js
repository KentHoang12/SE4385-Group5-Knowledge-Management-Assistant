/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("oyozr72hxf6838l")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "okwo65ed",
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
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("oyozr72hxf6838l")

  // remove
  collection.schema.removeField("okwo65ed")

  return dao.saveCollection(collection)
})
