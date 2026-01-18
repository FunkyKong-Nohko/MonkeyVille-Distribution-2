// kubejs/server_scripts/fromage_de_notch_recipes.js

ServerEvents.recipes(event => {
  // Recette :
  // G M G
  // M A M
  // G M G
  // G = or, M = seau de lait, A = pomme dorée

  event.shaped('kubejs:fromage_de_notch', [
    'GMG',
    'MAM',
    'GMG'
  ], {
    G: 'minecraft:gold_ingot',
    M: 'minecraft:milk_bucket',
    A: 'minecraft:golden_apple'
  });
});
