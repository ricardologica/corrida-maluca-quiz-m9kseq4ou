migrate(
  (app) => {
    const collection = app.findCollectionByNameOrId('game_sessions')
    collection.fields.add(new TextField({ name: 'grade' }))
    app.save(collection)
  },
  (app) => {
    const collection = app.findCollectionByNameOrId('game_sessions')
    collection.fields.removeByName('grade')
    app.save(collection)
  },
)
