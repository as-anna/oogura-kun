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

    if len(args) == 1 or len(args) == 3:
        try:
            tz1 = pytz.timezone(tz_names[args[0].upper()])
        except KeyError:
            await ctx.send("Not a valid timezone")
            return
        date_time1 = datetime.now(tz1)
        if len(args) == 1:
            current_time = date_time1.strftime("%H:%M:%S")
            await ctx.send(current_time)
        elif len(args) == 3:
            # convert given time of tz1 to tz2
            try:
                tz2 = pytz.timezone(tz_names[args[1].upper()])
            except KeyError:
                await ctx.send("Not a valid timezone")
                return
            # TODO: Only works for converting for current time, will fix later to generalize for specified time
            to_convert = datetime.now(tz1)
            to_convert = to_convert.replace(hour=int(args[2].split(':')[0]), minute=int(args[2].split(':')[1]))
            utc_time = to_convert.astimezone(pytz.utc)
            utc_time = utc_time.replace(tzinfo=None)

            date_time2 = pytz.utc.localize(utc_time, is_dst=None).astimezone(tz2)
            converted = date_time2.strftime("%H:%M")
            await ctx.send(converted)
    else:
        await ctx.send("<:ogu_sed:640641724968075284>")
        await ctx.send("You have to give me either 1 timezone `ogu time pst`\n"
                       "or 2 timezones and a time(hour:minute) `ogu time pst jst 15:00`")
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
