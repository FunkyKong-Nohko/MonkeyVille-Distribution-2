ItemEvents.rightClicked(event => {
  if (event.item.id !== 'kubejs:anneau_des_3_pingouins') return

  const player = event.player
  if (!player) return

  const server = player.server
  const name = player.username // important

  player.tell('§b🌀 L’anneau s’active…')

  // Commande du mod : /serverredirect <player> <ip:port>
  server.runCommand(`/serverredirect ${name} 91.197.6.60:25040`)

  event.cancel()
})
