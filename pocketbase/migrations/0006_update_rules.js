migrate(
  (app) => {
    const users = app.findCollectionByNameOrId('users')
    users.listRule = "id = @request.auth.id || @request.auth.role = 'teacher'"
    users.viewRule = "id = @request.auth.id || @request.auth.role = 'teacher'"
    users.updateRule = "id = @request.auth.id || @request.auth.role = 'teacher'"
    users.deleteRule = "id = @request.auth.id || @request.auth.role = 'teacher'"
    app.save(users)

    const playerProgress = app.findCollectionByNameOrId('player_progress')
    playerProgress.updateRule = "user_id = @request.auth.id || @request.auth.role = 'teacher'"
    playerProgress.deleteRule = "user_id = @request.auth.id || @request.auth.role = 'teacher'"
    app.save(playerProgress)
  },
  (app) => {
    const users = app.findCollectionByNameOrId('users')
    users.listRule = 'id = @request.auth.id'
    users.viewRule = 'id = @request.auth.id'
    users.updateRule = 'id = @request.auth.id'
    users.deleteRule = 'id = @request.auth.id'
    app.save(users)

    const playerProgress = app.findCollectionByNameOrId('player_progress')
    playerProgress.updateRule = 'user_id = @request.auth.id'
    playerProgress.deleteRule = 'user_id = @request.auth.id'
    app.save(playerProgress)
  },
)
