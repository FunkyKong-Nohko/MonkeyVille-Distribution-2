// KubeJS 1.20.1 (2001.x)
// Enregistre l'item Wedding Ring au démarrage (startup)

StartupEvents.registry('item', event => {
  event.create('wedding_ring')
    .displayName('Wedding Ring')
    .maxStackSize(1)
    .tooltip([
      '§7Sneak + clic-droit sur un joueur pour lier l’anneau.',
      '§7Clic-droit dans le vide pour se téléporter au/à la partenaire.'
    ]);
});
