module.exports = {
    name: 'reopen',
    description: 'Reopen a closed ticket.',
    async execute(client, message, args) {
        const logChannel = client.channels.cache.get(require('../config.json').logChannelId);
        if (logChannel) {
            await logChannel.send(`Ticket reopened by ${message.author.tag}`);
        }

        // Add your reopen logic here (if stored tickets are saved somewhere)
        message.reply('This feature is under development.');
    }
};
