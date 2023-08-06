const {CLient, CommandInteraction, ButtonInteraction, EmbedBuilder, ButtonBuilder, ActionRowBuilder,ButtonStyle, ModalBuilder, TextInputBuilder,TextInputStyle,InteractionType} = require("discord.js");
const fs = require("fs");
const db = require('croxydb');
const config = require("../config.json");
/**
 * 
 * @param {Client} client 
 * @param {CommandInteraction} interaction 
 * @param {ButtonInteraction} button
 */
module.exports = async (client, interaction, button) => {
    if (interaction.isCommand()){
    try {
      fs.readdir("./komutlar/", (err, files) => {
        if (err) throw err;

        files.forEach(async (f) => {
          const command = require(`../komutlar/${f}`);
          if (
            interaction.commandName.toLowerCase() === command.name.toLowerCase()
          ) {
            return command.run(client, interaction);
          }
        });
      });
    } catch (err) {
      console.error(err);
    }
  }
const dkod = Math.floor(Math.random() * 900000) + 100000;
 
    if (interaction.isButton()){

      const {guild, member, customId, channel} = interaction;
      


      if(customId == "kayıtmrsn"){

       const role = interaction.guild.roles.cache.get(config.memberRole)
       const memberRoles = interaction.member.roles;
       
       const hasRole = memberRoles.cache.has(config.memberRole);

if(hasRole){
         interaction.reply({content:`Galiba kayıt olmuşsun...`, ephemeral:true})
       } else { 
  if(config.verifyStatus === false){
        memberRoles.add(config.memberRole);
        interaction.reply({content:`Başarıyla kayıt oldun!`, ephemeral:true})
  }
else {
  const dogrulamaEmbed = new EmbedBuilder()
   .setAuthor({name:"Kullanıcı Doğrulama Sistemi"})
   .setTitle("Kayıt olabilmeniz için gerekli olan işlemler;")
   .setDescription("Kayıt olabilmeniz için aşağıdaki adımları yapmanız gerekmektedir.\r\n > Kodu gönder butonuna basın.Bot size dm üzerinden 6 rakamlı doğrulama kodu gönderecek.")
const dogrulamaEmbeds = new EmbedBuilder()
   .setAuthor({name:"Kullanıcı Doğrulama Sistemi"})
   .setTitle("Kayıt olabilmeniz için gerekli olan işlemler;")
   .setDescription("Kayıt olabilmeniz için aşağıdaki adımları yapmanız gerekmektedir.\r\n > Kodu girin düğmesine tıklayın, ardından açılan form kutusuna doğrulama kodunu girin!")
  const row = new ActionRowBuilder().addComponents( new ButtonBuilder() .setCustomId("dmMsg") .setLabel("Kodu gönder") .setStyle(ButtonStyle.Primary),
    new ButtonBuilder() .setCustomId("dogrulamamrsn") .setLabel("Kodu gir") .setStyle(ButtonStyle.Success) .setDisabled(true));
  
    const rows = new ActionRowBuilder().addComponents( new ButtonBuilder() .setCustomId("dmMsg") .setLabel("Kodu gönder") .setStyle(ButtonStyle.Primary) .setDisabled(true),
    new ButtonBuilder() .setCustomId("dogrulamamrsn") .setLabel("Kodu gir") .setStyle(ButtonStyle.Success));

                        
          
      
  interaction.reply({embeds: [dogrulamaEmbed],components:[row],ephemeral:true});
      

const filter = i => i.customId === 'dmMsg' && i.user.id === interaction.user.id;

const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

collector.on('collect', async mrsni => {


    if (mrsni.customId === 'dmMsg') {
        db.set(`${interaction.member.id}`, `${dkod}`);
      const kod6 = db.get(`${interaction.member.id}`)


client.users.cache.get(interaction.member.id).send(`Doğrulama kodu: ${kod6}`)
        interaction.editReply({embeds: [dogrulamaEmbeds],components:[rows]});
    }
})
       }
     }
     
          }

      
      
};


const modal = new ModalBuilder()
  .setCustomId('form')
  .setTitle('Kullanıcı Doğrulama Sistemi')
  
   const kod = new TextInputBuilder()
  .setCustomId('kod')
  .setLabel('6 rakamlı kod')
  .setStyle(TextInputStyle.Short)
  .setMaxLength(6)
  .setMinLength(6)
  .setPlaceholder('Kodu girin')
  .setRequired(true)

  const row2 = new ActionRowBuilder().addComponents(kod);
  modal.addComponents(row2);

if(interaction.customId === "dogrulamamrsn"){
  await interaction.showModal(modal);
}


if(interaction.type !== InteractionType.ModalSubmit) return;
  if(interaction.customId === 'form'){
   const mrsnkod = interaction.fields.getTextInputValue('kod')
const kod6 = db.get(`${interaction.member.id}`)
    if(mrsnkod === `${kod6}`)
    {
             const memberRoles = interaction.member.roles;
       
      memberRoles.add(config.memberRole);
      await interaction.reply({content:"Başarıyla kayıt oldun",ephemeral:true})
      db.delete(`${interaction.member.id}`);
    } else {
      interaction.reply({content:"Girdiğiniz kod yanlış!",ephemeral:true})
    }

    
  }
}
