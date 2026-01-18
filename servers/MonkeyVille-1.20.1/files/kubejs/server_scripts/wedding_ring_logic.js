// Wedding Ring — Sneak + Right Click pour lier l’anneau (sans setLore)
const RING_ID = 'kubejs:wedding_ring';

ItemEvents.entityInteracted(RING_ID, event => {
  const { player, target, item, hand } = event;

  // Debug (optionnel) : décommente si besoin
  // console.info('[Ring] Trigger', hand, item?.id, target?.type, 'crouch=', player.isCrouching());

  if (hand !== 'MAIN_HAND') return;
  if (!target || !target.isPlayer()) return;
  if (!player.isCrouching()) return;

  if (player.uuid === target.uuid) {
    player.tell(Text.red("Tu ne peux pas te lier à toi-même."));
    event.cancel();
    return;
  }

  const tag = item.getOrCreateTag();
  const existingUUID = tag.getString('PartnerUUID') || '';
  const existingName = tag.getString('PartnerName') || '';

  if (existingUUID && existingUUID !== target.uuid) {
    player.tell(Text.red(`Cet anneau est déjà lié à ${existingName}.`));
    event.cancel();
    return;
  }

  // Écriture de la liaison
  tag.putString('PartnerUUID', target.uuid);
  tag.putString('PartnerName', target.username);
  tag.putLong('LinkedAt', Date.now());

  // Feedback (son + actionbar + tell)
  player.playSound('minecraft:entity.player.levelup', 1, 1);
  target.playSound('minecraft:entity.player.levelup', 1, 1);

  player.server.runCommandSilent(
    `title ${player.username} actionbar {"text":"Lié à ${target.username}","color":"gold"}`
  );
  target.server.runCommandSilent(
    `title ${target.username} actionbar {"text":"${player.username} t'a lié(e)","color":"gold"}`
  );

  player.tell(Text.gold(`Anneau lié à ${target.username}.`));
  target.tell(Text.gold(`${player.username} t'a lié(e) avec son anneau.`));

  event.cancel(); // bloque l’interaction vanilla
});
