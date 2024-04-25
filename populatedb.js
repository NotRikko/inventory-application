#! /usr/bin/env node

console.log(
    'This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
  );
  
  // Get arguments passed on command line
  const userArgs = process.argv.slice(2);
  
  const Unit = require("./models/unit");
  const Origin = require ("./models/origin");
  const Rarity = require("./models/rarity");

  const units = [];
  const origins = [];
  const rarities = [];
  
  const mongoose = require("mongoose");
  mongoose.set("strictQuery", false);
  
  const mongoDB = userArgs[0];
  
  main().catch((err) => console.log(err));
  
  async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
    await createRarities();
    await createOrigins();
    await createUnits();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
  }
  
  // We pass the index to the ...Create functions so that, for example,
  // genre[0] will always be the Fantasy genre, regardless of the order
  // in which the elements of promise.all's argument complete.
  async function originCreate(index, name, description) {
    const origin = new Origin({ name: name, description: description });
    await origin.save();
    origins[index] = origin;
    console.log(`Added category: ${name}`);
  }

  async function rarityCreate(index, name, cost) {
    const rarity = new Rarity({ name: name, cost: cost });
    await rarity.save();
    rarities[index] = rarity;
    console.log(`Added rarity: ${name}`);
  }
  
  async function unitCreate(index, name, description, origin, cost, amount, image) {
    const unitdetail = { 
        name: name,
        description: description,
        cost: cost,
        amount: amount,
        image: image,
        origin: origin,
    };
  
    const unit = new Unit(unitdetail);
  
    await unit.save();
    units[index] = unit;
    console.log(`Added unit: ${name}`);
  }
  
  
  async function createRarities() {
    console.log("Adding rarities");
    await Promise.all([
        rarityCreate(0, "Common", 1 ),
        rarityCreate(1, "Uncommon", 1 ),
        rarityCreate(2, "Rare", 1 ),
        rarityCreate(3, "Epic", 1 ),
        rarityCreate(4, "Legendary", 1 ),
        
    ])
  }
  
  async function createOrigins() {
    console.log("Adding categories");
    await Promise.all([
        originCreate(
            0, 
            "Ghostly",
            "Upon dealing or taking damage 6 times, Ghostly units send 2 spectres to haunt nearby enemies and heal 4.5% max Health every 2 seconds. Haunted enemies take bonus damage for each spectre on them, and pass spectres on death.",
        ),
        originCreate(
            1, 
            "Fortune",
            "When you lose a fight, gain Luck. The more fights in a row you lose, the more Luck you get. Lose Luck when you win.",
        ),
        originCreate(
            2, 
            "Dragonlord",
            "After 8 seconds of combat, the Dragon strikes the board, dealing true damage to enemies and granting all allies Attack Speed for the rest of combat.",
        ),
        originCreate(
            3, 
            "Heavenly",
            "Heavenly champions grant a unique stat bonus to your team, increased by their star level and each Heavenly unit in play.",
        ),
        originCreate(
            4, 
            "Fated",
            "Hover and drop one Fated unit over another to form a pair and unlock a Fated Bonus. Your pair gains bonus HP.",
        ),
        originCreate(
            5, 
            "Dryad",
            "Dryads gain Ability Power and 250 Health. Each enemy death grants additional Health.",
        ),
        originCreate(
            6, 
            "Mythic",
            "Mythic champions gain Health, Ability Power, and Attack Speed.After 4 player combats, they become Epic, increasing the bonus by 50%.",
        ),
        originCreate(
            7, 
            "Umbral",
            "The moon illuminates hexes, Shielding units placed in them at the start of combat. Umbral units in illuminated hexes execute low Health enemies.",
        ),

        
    ]);
  }

  async function createUnits() {
    console.log("Adding Units");
    await Promise.all([
        unitCreate(
            0,
            "Kayn",
            "On first cast, Kayn transforms, dealing physical damage to nearby enemies. While transformed, gain 30% Critical Strike Chance and critical attacks damage adjacent enemies. If the spin only hits one enemy, the damage is increased by 50%.",
            origins[0],
            rarities[3],
            10,
            "https://cdn.mobalytics.gg/assets/tft/images/champions/icons/set11/kayn.png?v=5",
        ),
        unitCreate(
            1,
            "Wukong",
            "Wukong throws his staff out, dealing physical damage to the current target and Stunning them.",
            origins[3],
            rarities[4],
            9,
            "https://cdn.mobalytics.gg/assets/tft/images/champions/thumbnail/set11/wukong.jpg?v=57",
        ),
        unitCreate(
            2,
            "Alune",
            "Rain meteors through the row with the most total enemy Health. Meteors deal magic damage split between all enemies hit. Deal magic damage to the current target. All enemies hit are 20% Shredded for 6 seconds. Grant 40% Attack Speed split amongst allies in Alune's row for 5 seconds. Shred: Reduce Magic Resist",
            origins[7],
            rarities[2],
            17,
            "https://pbs.twimg.com/media/GHwkuXQWwAASTB9.jpg",
        ),
        unitCreate(
            3,
            "Teemo",
            "Teemo throws a spoiled dumpling at the nearest non-poisoned enemy, poisoning them for magic damage over 10 seconds.",
            origins[1],
            rarities[1],
            20,
            "https://cdn.mobalytics.gg/assets/tft/images/champions/thumbnail/set11/teemo.jpg?v=57",
        ),
        unitCreate(
            4,
            "Cho'Gath",
            "Cho'Gath gains a Shield for 4 seconds and breathe a cone of fire, dealing magic damage, Burning, and Wounding enemies hit for 9 seconds.",
            origins[6],
            rarities[0],
            22,
            "https://cdn.mobalytics.gg/assets/tft/images/champions/thumbnail/set11/cho-gath.jpg?v=57",
        ),
        unitCreate(
            5,
            "Lee Sin",
            "Lee Sin kicks the target's spirit out of their body, dealing physical damage, 30% Mana Reaving them, and Stunning them. Enemies hit by the spirit take physical damage. Gain a Shield for 3 seconds.",
            origins[2],
            rarities[3],
            10,
            "https://cdn.mobalytics.gg/assets/tft/images/champions/thumbnail/set11/lee-sin.jpg?v=57",
        ),
        unitCreate(
            6,
            "Aphelios",
            "Aphelios 20% sunders the nearest 3 enemies for 7 seconds. Then fire 3 shots at them, dealing physical damage each.",
            origins[4],
            rarities[2],
            17,
            "https://cdn.mobalytics.gg/assets/tft/images/champions/thumbnail/set11/aphelios.jpg?v=57",
        ),
        unitCreate(
            7,
            "Azir",
            "Azir fires a beam through the current target, dealing magic damage to enemies hit. Spawn a Guardian adjacent to the first enemy hit. The Guardian does not move or attack.",
            origins[5],
            rarities[4],
            9,
            "https://cdn.mobalytics.gg/assets/tft/images/champions/thumbnail/set11/azir.jpg?v=57",
        ),
        unitCreate(
            8,
            "Janna",
            "Grant a Shield to Janna and the lowest Health ally for 4 seconds. Then, deal magic damage to the 2 nearest enemies.",
            origins[2],
            rarities[1],
            9,
            "https://cdn.mobalytics.gg/assets/tft/images/champions/thumbnail/set11/janna.jpg?v=57",
        ),

    ])
  }
  
