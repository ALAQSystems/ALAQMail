module.exports = {
    name: 'help',
    description: 'Display available commands.',
    execute(client, message, args) {
        const commands = client.commands.map(cmd => `**${cmd.name}**: ${cmd.description}`).join('\n');
        message.reply(`Here are the available commands:\n${commands}`);
    }
};
