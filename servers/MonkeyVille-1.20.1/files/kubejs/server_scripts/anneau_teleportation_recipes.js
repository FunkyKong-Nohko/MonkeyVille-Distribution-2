// kubejs/server_scripts/anneau_teleportation_recipes.js

ServerEvents.recipes(event => {
  event.shaped('kubejs:anneau_teleportation', [
    ' G ',
    'PEP',
    ' G '
  ], {
    G: 'minecraft:gold_ingot',      // or
    P: 'minecraft:amethyst_shard',  // éclat d’améthyste
    E: 'minecraft:ender_pearl'      // ender pearl
  });
});
