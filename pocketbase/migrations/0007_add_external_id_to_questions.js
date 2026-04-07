migrate(
  (app) => {
    const col = app.findCollectionByNameOrId('questions')
    if (!col.fields.getByName('external_id')) {
      col.fields.add(new NumberField({ name: 'external_id' }))
    }
    app.save(col)
  },
  (app) => {
    const col = app.findCollectionByNameOrId('questions')
    if (col.fields.getByName('external_id')) {
      col.fields.removeByName('external_id')
      app.save(col)
    }
  },
)
