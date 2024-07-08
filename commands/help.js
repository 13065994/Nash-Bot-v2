module.exports = {
    name: "help",
    description: "Beginner's Guide To All Bot Commands",
    nashPrefix: false,
    version: "1.0.2",
    role: 0,
    cooldowns: 7,
    aliases: ["help"],
    execute(api, event, args, prefix) {
        const commands = global.NashBoT.commands;
        const events = global.NashBoT.events;
        const { threadID, messageID } = event;
        
        let commandList = "🟩⬜🟩\n𝗖𝗼𝗺𝗺𝗮𝗻𝗱 𝗟𝗶𝘀𝘁:\n\n";
        let i = 0;
        commands.forEach((cmd, name) => {
            commandList += `『 ${++i} 』. ➢ ${prefix}${name}\n`;
        });
        
        let eventList = "𝗘𝘃𝗲𝗻𝘁 𝗟𝗶𝘀𝘁:\n\n";
        let j = 0;
        events.forEach((evnt, name) => {
            eventList += `✪ ${++j}. ➢『 ${name}』\n`;
        });
        
        let message = commandList + "\n" + eventList;

        api.sendMessage(message, threadID, messageID);
    }
};
