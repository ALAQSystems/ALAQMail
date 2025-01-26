const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType } = require('discord.js');
const fs = require('fs');

module.exports = async (client, interaction) => {
    if (!interaction.isButton()) return;

    const config = require('../config.json');

    if (interaction.customId === 'channel_system') {
        config.ticketingSystem = 'channel';

        // First embed for setting up ticket category and log channel
        const embed = new EmbedBuilder()
            .setColor(0x5865F2)
            .setTitle('Channel-Based Ticketing Setup')
            .setDescription(
                'You have selected the **Channel-Based Ticketing System**.\n\n' +
                'Please configure the following:\n' +
                '1. **Set Ticket Category**: Specify where ticket channels will be created.\n' +
                '2. **Set Log Channel**: Define the channel for ticket logs.\n\n' +
                'Click the buttons below to set these options.'
            );

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('set_ticket_category')
                .setLabel('Set Ticket Category')
                .setStyle(ButtonStyle.Primary),

            new ButtonBuilder()
                .setCustomId('set_log_channel')
                .setLabel('Set Log Channel')
                .setStyle(ButtonStyle.Secondary)
        );

        await interaction.reply({ embeds: [embed], components: [row], ephemeral: true });

        // Save updated config
        fs.writeFileSync('./config.json', JSON.stringify(config, null, 4));
    } else if (interaction.customId === 'set_ticket_category') {
        await interaction.reply({
            content: 'Please mention the category where ticket channels should be created (e.g., `#category-name`).',
            ephemeral: true
        });

        const filter = (msg) => msg.author.id === interaction.user.id;
        const collector = interaction.channel.createMessageCollector({ filter, max: 1, time: 30000 });

        collector.on('collect', async (msg) => {
            const category = msg.mentions.channels.first();

            if (!category || category.type !== ChannelType.GuildCategory) {
                return msg.reply('Invalid category! Please mention a valid category.');
            }

            config.ticketCategoryId = category.id;
            msg.reply(`Ticket category set to **${category.name}**.`);
            fs.writeFileSync('./config.json', JSON.stringify(config, null, 4));
        });

        collector.on('end', (collected) => {
            if (!collected.size) {
                interaction.followUp({ content: 'Setup timed out. Please try again.', ephemeral: true });
            }
        });
    } else if (interaction.customId === 'set_log_channel') {
        await interaction.reply({
            content: 'Please mention the channel where ticket logs should be sent (e.g., `#logs`).',
            ephemeral: true
        });

        const filter = (msg) => msg.author.id === interaction.user.id;
        const collector = interaction.channel.createMessageCollector({ filter, max: 1, time: 30000 });

        collector.on('collect', async (msg) => {
            const logChannel = msg.mentions.channels.first();

            if (!logChannel || logChannel.type !== ChannelType.GuildText) {
                return msg.reply('Invalid channel! Please mention a valid text channel.');
            }

            config.logChannelId = logChannel.id;
            msg.reply(`Log channel set to **${logChannel.name}**.`);
            fs.writeFileSync('./config.json', JSON.stringify(config, null, 4));
        });

        collector.on('end', (collected) => {
            if (!collected.size) {
                interaction.followUp({ content: 'Setup timed out. Please try again.', ephemeral: true });
            }
        });
    }
};
