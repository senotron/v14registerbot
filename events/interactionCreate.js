const { 
    Client, 
    CommandInteraction, 
    ButtonInteraction, 
    EmbedBuilder, 
    ButtonBuilder, 
    ActionRowBuilder, 
    ButtonStyle, 
    ModalBuilder, 
    TextInputBuilder, 
    TextInputStyle, 
    InteractionType 
} = require("discord.js");
const fs = require("fs");
const db = require('croxydb');
const config = require("../config.json");

/**
 * @param {Client} client 
 * @param {CommandInteraction} interaction 
 * @param {ButtonInteraction} button
 */
module.exports = async (client, interaction, button) => {
    if (interaction.isCommand()) {
        try {
            fs.readdir("./komutlar/", (err, files) => {
                if (err) throw err;

                files.forEach(async (f) => {
                    const command = require(`../komutlar/${f}`);
                    if (interaction.commandName.toLowerCase() === command.name.toLowerCase()) {
                        return command.run(client, interaction);
                    }
                });
            });
        } catch (err) {
            console.error(err);
        }
    }

    const verificationCode = Math.floor(Math.random() * 900000) + 100000;

    if (interaction.isButton()) {
        const { guild, member, customId, channel } = interaction;

        if (customId == "kayıtmrsn") {
            const role = interaction.guild.roles.cache.get(config.memberRole);
            const memberRoles = interaction.member.roles;
            const hasRole = memberRoles.cache.has(config.memberRole);

            if (hasRole) {
                interaction.reply({ content: `You seem to be already registered...`, ephemeral: true });
            } else {
                if (config.verifyStatus === false) {
                    memberRoles.add(config.memberRole);
                    interaction.reply({ content: `You have successfully registered!`, ephemeral: true });
                } else {
                    const verificationEmbed = new EmbedBuilder()
                        .setAuthor({ name: "User Verification System" })
                        .setTitle("Steps required for registration:")
                        .setDescription("To register, you need to complete the steps below.\n> Click the 'Send Code' button. The bot will send a 6-digit verification code via DM.");
                    const verificationEmbedUpdated = new EmbedBuilder()
                        .setAuthor({ name: "User Verification System" })
                        .setTitle("Steps required for registration:")
                        .setDescription("To register, click the 'Enter Code' button, then enter the verification code in the form that opens!");
                    const row = new ActionRowBuilder().addComponents(
                        new ButtonBuilder().setCustomId("dmMsg").setLabel("Send Code").setStyle(ButtonStyle.Primary),
                        new ButtonBuilder().setCustomId("dogrulamamrsn").setLabel("Enter Code").setStyle(ButtonStyle.Success).setDisabled(true)
                    );

                    const rowDisabled = new ActionRowBuilder().addComponents(
                        new ButtonBuilder().setCustomId("dmMsg").setLabel("Send Code").setStyle(ButtonStyle.Primary).setDisabled(true),
                        new ButtonBuilder().setCustomId("dogrulamamrsn").setLabel("Enter Code").setStyle(ButtonStyle.Success)
                    );

                    interaction.reply({ embeds: [verificationEmbed], components: [row], ephemeral: true });

                    const filter = (i) => i.customId === 'dmMsg' && i.user.id === interaction.user.id;
                    const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

                    collector.on('collect', async (btnInteraction) => {
                        if (btnInteraction.customId === 'dmMsg') {
                            db.set(`${interaction.member.id}`, `${verificationCode}`);
                            const code = db.get(`${interaction.member.id}`);
                            client.users.cache.get(interaction.member.id).send(`Verification code: ${code}`);
                            interaction.editReply({ embeds: [verificationEmbedUpdated], components: [rowDisabled] });
                        }
                    });
                }
            }
        }
    }

    const modal = new ModalBuilder()
        .setCustomId('form')
        .setTitle('User Verification System');

    const codeInput = new TextInputBuilder()
        .setCustomId('kod')
        .setLabel('6-digit code')
        .setStyle(TextInputStyle.Short)
        .setMaxLength(6)
        .setMinLength(6)
        .setPlaceholder('Enter the code')
        .setRequired(true);

    const modalRow = new ActionRowBuilder().addComponents(codeInput);
    modal.addComponents(modalRow);

    if (interaction.customId === "dogrulamamrsn") {
        await interaction.showModal(modal);
    }

    if (interaction.type !== InteractionType.ModalSubmit) return;

    if (interaction.customId === 'form') {
        const enteredCode = interaction.fields.getTextInputValue('kod');
        const storedCode = db.get(`${interaction.member.id}`);
        if (enteredCode === `${storedCode}`) {
            const memberRoles = interaction.member.roles;
            memberRoles.add(config.memberRole);
            await interaction.reply({ content: "You have successfully registered", ephemeral: true });
            db.delete(`${interaction.member.id}`);
        } else {
            interaction.reply({ content: "The code you entered is incorrect!", ephemeral: true });
        }
    }
};
