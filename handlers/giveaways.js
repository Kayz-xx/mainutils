const { readdirSync } = require("fs");

let array = [];

module.exports = (client) => {
  const commands = readdirSync(
    __dirname.replace("handlers", "giveaways")
  ).filter((file) => file.endsWith(".js"));

  for (let file of commands) {
    try {
      let pull = require(`${__dirname.replace(
        "handlers",
        "giveaways"
      )}/${file}`);

      if (pull.event && typeof pull.event !== "string") {
        array.push({
          File: file.replace(".js", ""),
          Status: `❌ -> Property event should be string.`,
        });
        continue;
      }

      pull.event = pull.event || file.replace(".js", "");

      client.giveaways.on(pull.event, pull.run.bind(null, client));

      array.push({ File: file.replace(".js", ""), Status: "✅" });
    } catch (err) {
      console.log("Error While loading/executing command");
      console.log(err);
      array.push({
        File: file.replace(".js", ""),
        Status: `❌ -> Error while loading giveaway event`,
      });
    }
  }

  console.table(array);
};
