ItemEvents.rightClicked(event => {
  if (event.item.id !== 'kubejs:amulette_de_la_souris') return

  const player = event.player
  if (!player) return

  const server = player.server
  const name = player.username

  player.tell('§7🐭 L’amulette de la Souris s’illumine…')

  server.runCommand(`/serverredirect ${name} 91.197.6.208:26788`)

  event.cancel()
})
