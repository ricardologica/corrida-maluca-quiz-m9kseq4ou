migrate(
  (app) => {
    const col = app.findCollectionByNameOrId('questions')
    app.truncateCollection(col)
  },
  (app) => {
    // Irreversible operation.
  },
)
