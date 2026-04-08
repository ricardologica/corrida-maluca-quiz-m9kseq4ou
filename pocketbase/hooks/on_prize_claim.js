onRecordUpdateRequest((e) => {
  const original = $app.findRecordById('session_prizes', e.record.id)

  if (original.get('claimed') === true && e.record.get('claimed') === true) {
    if (
      e.auth &&
      e.auth.get('role') !== 'teacher' &&
      original.get('winner_id') !== e.record.get('winner_id')
    ) {
      throw new BadRequestError('Este prêmio já foi resgatado por outro jogador!')
    }
  }

  e.next()
}, 'session_prizes')
