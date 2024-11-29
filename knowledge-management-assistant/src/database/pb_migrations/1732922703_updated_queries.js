/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gifftld083w83kz")

  collection.listRule = "  user.id = @request.auth.id"
  collection.viewRule = "  user.id = @request.auth.id"
  collection.createRule = "@request.auth.id != ''"
  collection.updateRule = "  user.id = @request.auth.id"
  collection.deleteRule = "  user.id = @request.auth.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gifftld083w83kz")

  collection.listRule = null
  collection.viewRule = null
  collection.createRule = null
  collection.updateRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
})
