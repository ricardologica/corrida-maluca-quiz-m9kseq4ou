migrate(
  (app) => {
    const users = app.findCollectionByNameOrId('_pb_users_auth_')
    users.fields.add(new TextField({ name: 'grade' }))
    users.fields.add(
      new SelectField({ name: 'role', values: ['teacher', 'student'], maxSelect: 1 }),
    )
    users.createRule = '' // Allow guest sign up
    app.save(users)

    const questions = new Collection({
      name: 'questions',
      type: 'base',
      listRule: '',
      viewRule: '',
      createRule: "@request.auth.role = 'teacher'",
      updateRule: "@request.auth.role = 'teacher'",
      deleteRule: "@request.auth.role = 'teacher'",
      fields: [
        { name: 'statement', type: 'text', required: true },
        { name: 'option_a', type: 'text', required: true },
        { name: 'option_b', type: 'text', required: true },
        { name: 'option_c', type: 'text', required: true },
        { name: 'option_d', type: 'text', required: true },
        {
          name: 'correct_option',
          type: 'select',
          values: ['A', 'B', 'C', 'D'],
          required: true,
          maxSelect: 1,
        },
        { name: 'explanation', type: 'text' },
        { name: 'theme', type: 'text' },
        { name: 'difficulty', type: 'text' },
        { name: 'suggested_grade', type: 'text' },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    })
    app.save(questions)

    const game_sessions = new Collection({
      name: 'game_sessions',
      type: 'base',
      listRule: '',
      viewRule: '',
      createRule: "@request.auth.role = 'teacher'",
      updateRule: "@request.auth.role = 'teacher'",
      deleteRule: "@request.auth.role = 'teacher'",
      fields: [
        { name: 'code', type: 'text', required: true },
        {
          name: 'status',
          type: 'select',
          values: ['lobby', 'active', 'paused', 'finished'],
          required: true,
          maxSelect: 1,
        },
        {
          name: 'created_by',
          type: 'relation',
          collectionId: users.id,
          maxSelect: 1,
          required: true,
        },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    })
    app.save(game_sessions)

    const player_progress = new Collection({
      name: 'player_progress',
      type: 'base',
      listRule: '',
      viewRule: '',
      createRule: "@request.auth.id != ''",
      updateRule: 'user_id = @request.auth.id',
      deleteRule: 'user_id = @request.auth.id',
      fields: [
        { name: 'user_id', type: 'relation', collectionId: users.id, maxSelect: 1, required: true },
        {
          name: 'session_id',
          type: 'relation',
          collectionId: game_sessions.id,
          maxSelect: 1,
          required: true,
        },
        { name: 'score', type: 'number' },
        { name: 'wrong_answers', type: 'number' },
        { name: 'current_question_index', type: 'number' },
        { name: 'position_x', type: 'number' },
        { name: 'car_color', type: 'text' },
        { name: 'avatar_url', type: 'text' },
        { name: 'status', type: 'select', values: ['idle', 'boost', 'penalty'], maxSelect: 1 },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
      indexes: ['CREATE UNIQUE INDEX idx_user_session ON player_progress (user_id, session_id)'],
    })
    app.save(player_progress)
  },
  (app) => {
    const pp = app.findCollectionByNameOrId('player_progress')
    app.delete(pp)
    const gs = app.findCollectionByNameOrId('game_sessions')
    app.delete(gs)
    const q = app.findCollectionByNameOrId('questions')
    app.delete(q)
  },
)
