# ModMail Bot Instructions (Self-Hosting)
## Introduction
ModMail is an open-source bot that helps server moderators manage user issues and requests. It allows users to create tickets either by sending messages in a designated channel or by DMing the bot directly. All tickets are private and can be addressed by the server’s moderation team.

This guide will walk you through the steps to self-host the ModMail bot on your server. You will download the repository from GitHub, set it up, and customize it according to your server's needs. The bot does not require a database, so it stores ticket data temporarily in memory.

## Features
Two Ticket Creation Methods: Users can create tickets either by sending a message in a specific channel or by DMing the bot directly.
Private Ticketing System: Tickets are private between the user and the moderators.
Ticket Management: Moderators can view, manage, and resolve tickets as needed.
Customizable Ticket Categories: Ticket categories (such as "Support", "Bug Report", or "Suggestions") can be configured to organize tickets.

## Prerequisites
To run the ModMail bot, you will need the following:

Node.js (v14.0 or higher): The bot requires Node.js to run.
Discord Bot Token: You need a Discord bot token, which can be obtained by registering a bot at the Discord Developer Portal.
Git: Git is required to clone the repository, but you can also download the ZIP file from GitHub if preferred.

## Step-by-Step Setup
Step 1: Download the GitHub Repository
To download the ModMail bot repository, you can either clone it using Git or download the ZIP file directly from GitHub.

If you're using Git:

Clone the repository with the following command:
git clone https://github.com/your-repo/modmail.git
Navigate into the project directory:
cd modmail
Alternatively, you can download the ZIP file from the ModMail GitHub repository page and extract it to a folder on your system.

## Step 2: Install Dependencies
Once you've downloaded the repository, you need to install the required dependencies.

Navigate to the ModMail project folder and run the following command to install all dependencies:

Run: npm install
This will install the necessary libraries and packages for the bot to function properly.

## Step 3: Configure the Bot
Next, you will need to configure the bot to match your server’s setup.

In the project folder, you’ll find a file named config.example.json. Make a copy of this file and rename it config.json.
Open config.json in a text editor and configure the following settings:
TOKEN: This is your bot’s Discord token, which you can obtain from the Discord Developer Portal.
PREFIX: The bot's command prefix (for example, ! or $).
CHANNEL_ID: The ID of the channel where users can create tickets (leave this empty if you do not want to enable ticket creation via a channel).
DM_ENABLED: Set this to true if you want users to create tickets via DM.
You can also adjust settings for ticket categories, logging, and roles within the config.json file. Categories like "Support", "Bug Reports", or "Suggestions" can be customized here.

## Step 4: Running the Bot
Once the configuration is complete, you can start the bot.

Simply run the following command in your project folder:
npm start
The bot will connect to Discord and begin monitoring for tickets. It will listen for messages in the designated channel and DMs to create tickets.

## Step 5: Ticket Management
As the bot runs, moderators will be able to manage tickets through the built-in features. Tickets are created when users message the bot in the designated channel or DM it directly. All tickets are kept private between the user and the moderators.

Moderators can:

View ticket details.
Close tickets once they are resolved.
Assign moderators to tickets if needed.
Since the bot does not use a database, all ticket data will be stored temporarily in memory and will be lost if the bot is restarted.

Customizing Ticket Categories
If you'd like to have specific categories for your tickets (such as "Support", "Bug Report", or "Suggestions"), you can modify these categories directly in the config.json file. Simply add the categories that suit your needs. This allows for better organization of incoming tickets.

## Conclusion
Once you have completed the setup, the ModMail bot will be up and running on your server. You can manage and resolve tickets without the need for a database, as all ticket data is stored in memory.

If you have any issues or need further customization, feel free to open an issue on the GitHub repository or seek help from the community.

Enjoy managing your server’s tickets smoothly with the ModMail bot!