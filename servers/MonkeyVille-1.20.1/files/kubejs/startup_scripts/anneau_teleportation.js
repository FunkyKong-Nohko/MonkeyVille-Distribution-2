// kubejs/startup_scripts/anneau_teleportation.js

StartupEvents.registry('item', event => {
  event.create('anneau_teleportation')
    .displayName('Anneau de téléportation chaotique')
    .maxStackSize(1)
    .rarity('rare');
});
