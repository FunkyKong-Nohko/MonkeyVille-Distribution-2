// Imports Java
const Commands = Java.loadClass('net.minecraft.commands.Commands');
const BlockPos = Java.loadClass('net.minecraft.core.BlockPos');

ServerEvents.commandRegistry(event => {
    event.register(
        Commands.literal("openwaystone")
            .requires(source => source.hasPermission(0)) // 0 = tout le monde, 2 = seulement op
            .executes(ctx => {
                let player = ctx.source.player;
                if (!player) return 0;

                let level = player.level;
                let pos = new BlockPos(-353, 112, 3909); // 📍 ta Waystone

                // On récupère le block entity (la Waystone elle-même côté serveur)
                let be = level.getBlockEntity(pos);
                if (be == null) {
                    // Si tu vois rien s’ouvrir, vérifie déjà que la Waystone est bien là
                    // et que les coords sont bonnes.
                    return 0;
                }

                // Ouvre directement le menu fourni par le block entity
                player.openMenu(be);

                return 1;
            })
    );
});
