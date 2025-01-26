module.exports = {
    name: 'close',
    description: 'Close an open ticket.',
    async execute(client, message, args) {
        if (!message.channel.name.startsWith('ticket-')) {
            return message.reply('This command can only be used inside a ticket channel.');
        }

        const logChannel = client.channels.cache.get(require('../config.json').logChannelId);
        if (logChannel) {
            await logChannel.send(`Ticket closed by ${message.author.tag}: ${message.channel.name}`);
        }

        await message.channel.delete();
    }
};
