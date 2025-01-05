const { 
    Client, 
    CommandInteraction, 
    ApplicationCommandOptionType, 
    ChannelType, 
    ModalBuilder, 
    ActionRowBuilder, 
    TextInputBuilder, 
    TextInputStyle, 
    ButtonBuilder, 
    ButtonStyle, 
    ComponentType, 
    EmbedBuilder 
} = require("discord.js");
const config = require("../config.json");

module.exports = {
    name: "sendembed",
    description: 'Sends the registration embed',
    type: 1,
    options: [],
    
    run: async (client, interaction) => {
        if (!interaction.member.permissions.has("ManageRoles")) {
            return interaction.reply({ content: "You do not have permission to use this command", ephemeral: true });
        }

        const { guild } = interaction;

        interaction.reply({ content: "Sent!", ephemeral: true });

        guild.channels.cache.get(config.channel).send({
            embeds: [
                {
                    title: `${interaction.guild.name} Registration`,
                    description: `> Every registered member is deemed to have read and accepted ⁠<#${config.rulesChannel}>. \n> If you cannot register, please contact the Management Team.`,
                    footer: { text: "DESN & Odunchu・@Senan Shukurzade" }
                }
            ],
            components: [
                new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setCustomId("kayıtmrsn")
                        .setLabel("Register")
                        .setStyle(ButtonStyle.Primary)
                )
            ]
        });
    }
};
