const { prefix } = require('../config.json');

module.exports = async (client, message) => {
    if (message.author.bot) return;

    if (message.channel.type === 'DM') {
        // Handle DM-based ticket creation
        const guild = client.guilds.cache.get(require('../config.json').guildId);
        const ticketCategory = guild.channels.cache.get(require('../config.json').ticketCategoryId);

        const existingTicket = guild.channels.cache.find(channel => channel.name === `ticket-${message.author.id}`);
        if (existingTicket) {
            return existingTicket.send(`${message.author.tag}: ${message.content}`);
        }

        const newChannel = await guild.channels.create(`ticket-${message.author.id}`, {
            type: 'GUILD_TEXT',
            parent: ticketCategory,
            permissionOverwrites: [
                {
                    id: guild.id,
                    deny: ['VIEW_CHANNEL']
                },
                {
                    id: message.author.id,
                    allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']
                }
            ]
        });

        newChannel.send(`Ticket created for ${message.author.tag}.`);
        return;
    }

    if (!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName);
    if (!command) return;

    try {
        await command.execute(client, message, args);
    } catch (error) {
        console.error(error);
        message.reply('There was an error executing that command.');
    }
};
