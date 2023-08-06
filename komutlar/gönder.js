const { Client,CommandInteraction, ApplicationCommandOptionType,ChannelType,ModalBuilder,ActionRowBuilder,TextInputBuilder,TextInputStyle,ButtonBuilder,ButtonStyle,ComponentType, EmbedBuilder} = require("discord.js");
const config = require("../config.json")

module.exports = {
    name:"gönder",
    description: 'Kayıt embedini gönderir',
    type:1,
    options:[ ],
/** 
 Altyapı tamamen mrsn.dev kullanıcısına mahsustur
 */
    run: async (client, interaction) => {
            if(!interaction.member.permissions.has("ManageRoles")) return interaction.reply({content:"Bu komutu kullanamazsın", ephemeral:true})

            const {guild, options} = interaction;

      interaction.reply({content:"Gönderildi!",ephemeral:true});
                guild.channels.cache.get(config.channel)
                .send({ embeds: [{ title: `${interaction.guild.name} Kayıt`, description: `> Kayıt olan her üye ⁠<#${config.rulesChannel}>'ı okumuş ve kabul etmiş sayılır. \r\n> Eğer kayıt olamıyorsanız Yönetim Ekibi ile iletişime geçin.`,footer:{text:"USN Development・@mrsn.dev"} }], components:[ new ActionRowBuilder().addComponents(
new ButtonBuilder().setCustomId("kayıtmrsn").setLabel("Kayıt ol").setStyle(ButtonStyle.Primary)
      ),]});
}
};
