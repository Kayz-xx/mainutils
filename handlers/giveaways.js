
const ascii = require("ascii-table");
const {readdirSync} = require('fs')

// Create a new Ascii table
let table = new ascii("Giveways");
table.setHeading("Giveaways", "Load status");

module.exports = (client) => {

  const commands = readdirSync(__dirname.replace("\handlers", "\giveaways")).filter(file => file.endsWith(".js"));

  for (let file of commands) {

    try {
    let pull = require(`${__dirname.replace("\handlers", "\giveaways")}/${file}`);

    if (pull.event && typeof pull.event !== "string") {
      table.addRow(file, `❌ -> Property event should be string.`);
      continue;
    }

    pull.event = pull.event || file.replace(".js", "")

    client.giveaways.on(pull.event, pull.run.bind(null, client))

    table.addRow(file, '✅');

    } catch(err) {

  console.log("Error While loading/executing command")
  console.log(err)
  table.addRow(file, `❌ -> Error while loading giveaway event`);
    }
  }

   console.log(table.toString());
}
