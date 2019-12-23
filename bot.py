import os
import discord
from dotenv import load_dotenv
from discord.ext import commands
from datetime import datetime
import pytz


load_dotenv()
TOKEN = os.getenv('DISCORD_TOKEN')
GUILD = os.getenv('DISCORD_GUILD')

tz_names = dict([(pytz.timezone(x).localize(datetime.now()).tzname(), x) for x in pytz.all_timezones])

# client = discord.Client()
bot = commands.Bot(command_prefix='ogu ')


@bot.event
async def on_ready():
    await bot.change_presence(status=discord.Status.online, activity=discord.Game(name='with Mona-chan'))
    print(f'{bot.user.name} is connected to Discord :D')


@bot.event
async def on_member_join(member):
    await member.create_dm()
    await member.dm_channel.send(
        f'Hi {member.name}, welcome to {GUILD}'
    )


@bot.command(name='time', help='tells current pst time')
async def time(ctx, *args):
    if len(args) == 0:
        return
    elif len(args) > 0:
        try:
            tz1 = pytz.timezone(tz_names[args[0].upper()])
        except KeyError:
            await ctx.send("Not a valid timezone")
            return
        date_time = datetime.now(tz1)
        if len(args) == 1:
            current_time1 = date_time.strftime("%H:%M:%S")
            await ctx.send(current_time1)
        elif len(args) == 3:
            # convert given time og tz1 to tz2
            try:
                tz2 = pytz.timezone(tz_names[args[1].upper()])
            except KeyError:
                await ctx.send("Not a valid timezone")
            date_time2 = datetime.now(tz2)
            pass
        else:
            return


@bot.event
async def on_message(message):
    await bot.process_commands(message)
    if message.author == bot.user:
        return
    if 'tadaima' in message.content.lower():
        await message.channel.send("Okaeri!")
    elif 'otsu' in message.content.lower():
        await message.channel.send("Otsukare!")

bot.run(TOKEN)
