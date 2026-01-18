// kubejs/startup_scripts/fromage_de_notch.js

StartupEvents.registry('item', event => {
  event.create('fromage_de_notch')
    .displayName('Fromage de Notch')
    .maxStackSize(1) // un seul par stack, objet "rare"
    .rarity('epic')  // violet dans l’inventaire
    .tooltip('§6Un fromage béni par Notch lui-même.');
});
