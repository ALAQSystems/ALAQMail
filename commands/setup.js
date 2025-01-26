const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    name: 'setup',
    description: 'Interactive setup for the ticketing system.',
    async execute(client, message, args) {
        try {
            // Embed for setup options
            const embed = new EmbedBuilder()
                .setColor(0x5865F2)
                .setTitle('Modmail Setup')
                .setDescription(
                    'Please select the system you want to use for managing tickets:\n\n' +
                    '**DM-Based System**: Users will DM the bot directly to create a ticket.\n' +
                    '**Channel-Based System**: Users will create tickets in a specific channel.'
                )
                .setFooter({ text: 'You can change this later using the setup command.' });

            // Buttons for selection
            const row = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setCustomId('dm_system')
                    .setLabel('DM-Based System')
                    .setStyle(ButtonStyle.Primary),

                new ButtonBuilder()
                    .setCustomId('channel_system')
                    .setLabel('Channel-Based System')
                    .setStyle(ButtonStyle.Secondary)
            );

            // Send the setup embed
            await message.channel.send({ embeds: [embed], components: [row] });
        } catch (error) {
            console.error('Error executing the setup command:', error);
            message.reply('There was an error while executing the setup command.');
        }
    }
};
