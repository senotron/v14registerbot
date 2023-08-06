const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");
const { Client, Collection, EmbedBuilder, ModalBuilder, TextInputBuilder,TextInputStyle,ActionRowBuilder,InteractionType} = require('discord.js');
const client = new Client({ intents: 851 });
const fs = require("fs");
const makermrsn = "mrsn.dev"
const mrsntoken = "MTEzNjk5NzU3NTQyMjEzNjMyMA.Goyucu.NCtP4_d-cP5y0TvhWEG9jBxexfoKjTeY6CEKn4"
const config = require("./config.json")



global.client = client;
client.commands = (global.commands = []);
//#region KOMUTLAR LOAD
fs.readdir("./komutlar/", (err, files) => {
  if (err) throw err;
  files.forEach((file) => {
    if (!file.endsWith(".js")) return;
    let props = require(`./komutlar/${file}`);
    client.commands.push({
      name: props.name.toLowerCase(),
      description: props.description,
      options: props.options,
      type: 1
    })
    console.log(`${makermrsn}・${props.name} isimli komut yüklendi!`);
  });
});
//#endregion
//#region EVENTS LOAD
fs.readdir("./events/", (_err, files) => {
  files.forEach((file) => {
    if (!file.endsWith(".js")) return;
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    console.log(`${makermrsn}・${eventName} isimli event başarıyla yüklendi!`);
    client.on(eventName, (...args) => {
      event(client, ...args);
    });
  });
});
//#endregion
//#region KOMUTLAR SET
client.on("ready", async () => {
  console.log(`${makermrsn}・Bot kullanıma hazır!`);
  client.user.setActivity(`mrsn.dev`, { type: "WATCHING" });

/**
client.user.setActivity("mrsn.dev", {
  type: "STREAMING",
  url: "mrsn.dev"
});
**/
  const rest = new REST({ version: "10" }).setToken(mrsntoken);
  try {
    await rest.put(Routes.applicationCommands(client.user.id), {
      body: client.commands,
    })
  } catch (error) {
    console.error(error);
  }
});
//#endregion

client.login(mrsntoken)
  
const express = require("express");
const app = express();

app.listen(process.env.PORT);
app.get("/", (req, res) => {
return res.sendStatus(200)
})


