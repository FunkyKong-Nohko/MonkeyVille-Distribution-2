// kubejs/server_scripts/fromage_taille.js

const SMALL_SIZE = 0.2;

ItemEvents.rightClicked('kubejs:fromage_de_notch', event => {
    const player = event.player;
    const server = event.server;
    if (!player) return;

    const name = player.username;
    const data = player.persistentData;

    const isTiny = data.getBoolean("kjs_isTiny");

    if (!isTiny) {
        // → Devient petit (0.2)
        server.runCommandSilent(`execute as ${name} run scale set pehkui:height ${SMALL_SIZE}`);
        server.runCommandSilent(`execute as ${name} run scale set pehkui:width ${SMALL_SIZE}`);

        data.putBoolean("kjs_isTiny", true);
        player.tell("§eTu rétrécis... Taille de souris activée !");
    } else {
        // → Retour taille normale
        server.runCommandSilent(`execute as ${name} run scale reset pehkui:height`);
        server.runCommandSilent(`execute as ${name} run scale reset pehkui:width`);

        data.putBoolean("kjs_isTiny", false);
        player.tell("§aTu reviens à ta taille normale.");
    }
});
