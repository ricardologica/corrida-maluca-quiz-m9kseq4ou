migrate(
  (app) => {
    const prizes = new Collection({
      name: 'session_prizes',
      type: 'base',
      listRule: '',
      viewRule: '',
      createRule: "@request.auth.role = 'teacher'",
      updateRule: "@request.auth.role = 'teacher' || (@request.auth.id != '' && claimed = false)",
      deleteRule: "@request.auth.role = 'teacher'",
      fields: [
        {
          name: 'session_id',
          type: 'relation',
          required: true,
          collectionId: app.findCollectionByNameOrId('game_sessions').id,
          maxSelect: 1,
        },
        { name: 'name', type: 'text', required: true },
        {
          name: 'image',
          type: 'file',
          maxSelect: 1,
          maxSize: 5242880,
          mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
        },
        { name: 'image_url', type: 'url' },
        { name: 'global_threshold', type: 'number', required: true, min: 0 },
        { name: 'min_correct', type: 'number', required: true, min: 0 },
        {
          name: 'winner_id',
          type: 'relation',
          collectionId: app.findCollectionByNameOrId('users').id,
          maxSelect: 1,
        },
        { name: 'claimed', type: 'bool' },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    })
    app.save(prizes)
  },
  (app) => {
    const prizes = app.findCollectionByNameOrId('session_prizes')
    app.delete(prizes)
  },
)
