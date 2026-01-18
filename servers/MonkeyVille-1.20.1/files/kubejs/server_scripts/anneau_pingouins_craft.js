ServerEvents.recipes(event => {
  event.shaped('kubejs:anneau_des_3_pingouins', [
    'GSG',
    'SPS',
    'GSG'
  ], {
    G: 'minecraft:gold_ingot',   // l’anneau en or
    S: 'minecraft:snowball',     // les 3 pingouins (neige)
    P: 'minecraft:ender_pearl'   // la téléportation
  })
})
