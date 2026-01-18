// Wedding Ring — TP vers la personne liée (clic droit sans sneak) + cooldown
(function () {
  var RING_ID = 'kubejs:wedding_ring';
  var COOLDOWN_MS = 240000; // 2 min
  var SOUND_TP = 'minecraft:entity.enderman.teleport';

  function isRing(item) {
    try { return item && item.id === RING_ID; } catch (_) { return false; }
  }

  console.info("[RingTP] wedding_ring_tp.js chargé !");

  ItemEvents.rightClicked(function (event) {
    var player = event.player;
    var item = event.item;
    var hand = event.hand;
    var server = event.server;

    if (!isRing(item)) return;
    if (hand !== 'MAIN_HAND') return;
    if (player.isCrouching()) return; // sneak = link, pas TP

    var tag = item.getOrCreateTag();
    var partnerUUID = tag.getString('PartnerUUID') || '';
    var partnerName = tag.getString('PartnerName') || '';

    if (!partnerUUID) {
      player.tell(Text.red("Cet anneau n'est lié à personne."));
      event.cancel();
      return;
    }

    // Cooldown
    var now = Date.now();
    var cdUntil = tag.getLong('TpCooldownEnd') || 0;
    if (cdUntil && now < cdUntil) {
      var remainingSecs = Math.ceil((cdUntil - now) / 1000);
      player.tell(Text.gray("Téléportation disponible dans " + remainingSecs + "s."));
      event.cancel();
      return;
    }

    // Trouver le partenaire
    var partner = server.players.find(function (p) { return p.uuid === partnerUUID; });
    if (!partner) {
      player.tell(Text.red("Ton/ta partenaire n'est pas en ligne."));
      event.cancel();
      return;
    }
    if (partner.isDead && partner.isDead()) {
      player.tell(Text.red("Ton/ta partenaire est mort(e) pour l'instant."));
      event.cancel();
      return;
    }

    // Effets
    player.playSound(SOUND_TP, 1, 1);
    partner.playSound(SOUND_TP, 1, 1);

    // TP inter-dimension
    var dim = partner.level.dimension; // ex: minecraft:overworld
    server.runCommandSilent("execute in " + dim + " run tp " + player.username + " " + partner.username);

    // Feedback + cooldown
    player.tell(Text.gold("Téléporté à " + (partner.username || partnerName) + "."));
    partner.tell(Text.gray(player.username + " s'est téléporté à toi via l'anneau."));
    tag.putLong('TpCooldownEnd', now + COOLDOWN_MS);

    event.cancel();
  });
})();
