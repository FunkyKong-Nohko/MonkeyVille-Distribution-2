// kubejs/server_scripts/anneau_teleportation_use.js

const COOLDOWN_TICKS = 20 * 15; // 15 secondes

ItemEvents.rightClicked('kubejs:anneau_teleportation', event => {
    const player = event.player;
    const server = event.server;

    if (!player || !server) return;

    const data = player.persistentData;
    const name = player.username;

    // Vérifie si cooldown actif
    const cooldown = data.getInt("tp_ring_cooldown") || 0;

    if (cooldown > 0) {
        player.tell("§cL'anneau se recharge encore... (" + Math.ceil(cooldown / 20) + "s)");
        return;
    }

    // Téléportation aléatoire
    server.runCommandSilent(
        `execute as ${name} at ${name} run spreadplayers ~ ~ 2500 5000 false @s`
    );

    player.tell("§dVous sentez votre corps se disperser dans l'espace...");

    // Applique le cooldown
    data.putInt("tp_ring_cooldown", COOLDOWN_TICKS);
});

// Tick event pour réduire le cooldown chaque tick
ServerEvents.tick(event => {
    if (event.server == null) return;

    for (const player of event.server.players) {
        const data = player.persistentData;

        let cooldown = data.getInt("tp_ring_cooldown") || 0;

        if (cooldown > 0) {
            cooldown--;
            data.putInt("tp_ring_cooldown", cooldown);
        }
    }
});
