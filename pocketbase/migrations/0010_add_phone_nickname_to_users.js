migrate(
  (app) => {
    const users = app.findCollectionByNameOrId('users')

    if (!users.fields.getByName('nickname')) {
      users.fields.add(new TextField({ name: 'nickname' }))
    }
    if (!users.fields.getByName('phone')) {
      users.fields.add(new TextField({ name: 'phone' }))
    }

    users.addIndex('idx_users_phone', true, 'phone', "phone != ''")

    app.save(users)
  },
  (app) => {
    const users = app.findCollectionByNameOrId('users')

    users.fields.removeByName('nickname')
    users.fields.removeByName('phone')
    users.removeIndex('idx_users_phone')

    app.save(users)
  },
)
