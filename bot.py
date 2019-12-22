import os
import discord
from dotenv import load_dotenv
from discord.ext import commands
from datetime import datetime


load_dotenv()
TOKEN = os.getenv('DISCORD_TOKEN')
GUILD = os.getenv('DISCORD_GUILD')

client = discord.Client()
bot = commands.Bot(command_prefix='ogu ')


@bot.event
async def on_ready():
    print(f'{bot.user.name} is connected to Discord :D')


@client.event
async def on_member_join(member):
    await member.create_dm()
    await member.dm_channel.send(
        f'Hi {member.name}, welcome to {GUILD}'
    )


@client.event
async def on_message(message):
    if message.author == client.user:
        return
    if 'tadaima' in message.content.lower():
        await message.channel.send("Okaeri!")


@bot.command(name='time', help='tells current pst time')
async def time(ctx):
    current_time = datetime.now().strftime("%H:%M:%S")
    await ctx.send(current_time)

bot.run(TOKEN)
