import { world } from "mojang-minecraft";

world.events.tick.subscribe(function (e) {
  var players = world.getPlayers();
  for (var p of players) {
    var ent = p.getEntitiesFromViewVector();
    if (ent.length > 0) {
      if (ent[0].id === "adamraichu:rascal") {
        var found_time;
        if (p.hasTag("rascal_2")) {
          p.removeTag("rascal_2");
          found_time = "3rd";
        } else if (p.hasTag("rascal_1")) {
          p.removeTag("rascal_1");
          p.addTag("rascal_2");
          found_time = "2nd";
        } else {
          p.addTag("rascal_1");
          found_time = "1st";
        }
        ent[0].runCommand(
          `tell ${p.name} §rYou found me for the ${found_time} time!`
        );
        if (found_time === "3rd") {
          ent[0].runCommand(
            `tell ${p.name} §rYou deserve a prize. Here, take this.`
          );
          ent[0].runCommand(
            `execute @s ~ ~ ~ loot spawn ~ ~ ~ loot "rascal/rascal_reward"`
          );
        }
        ent[0].runCommand("tp @s 0 -64 0");
      }
    }
  }
});
