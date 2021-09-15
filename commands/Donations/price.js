const { Client, Message, MessageEmbed, Collection } = require('discord.js');
const { number } = require('mathjs');
const formatter = new Intl.NumberFormat('en');
const { db } = require('../../firebase.js');

module.exports = {
	name: 'price',
	aliases: ['price'],
	cooldown: '0',
	usage: '<item>',
	permissions: [],
	category: 'Donations',

	async execute(client, message, cmd, args) {
		const items = [
			{
				name: 'Alcohol',
				amount: 7500,
				aliases: 'alc',
				type: 'shop',
			},
			{
				name: 'Apple',
				amount: 5000,
				aliases: 'app',
				type: 'shop',
			},
			{
				name: 'Cheese',
				amount: 35000,
				aliases: 'chee',
				type: 'shop',
			},
			{
				name: 'Coinbomb',
				amount: 16000,
				aliases: 'coin',
				type: 'shop',
			},
			{
				name: 'PepeCrown',
				amount: 240000000,
				aliases: 'crown',
				type: 'shop',
			},
			{
				name: 'PepeTrophy',
				amount: 35000000,
				aliases: 'trophy',
				type: 'shop',
			},
			{
				name: 'RarePepe',
				amount: 50000,
				aliases: 'pepe',
				type: 'shop',
			},
			{
				name: 'Fakeid',
				amount: 800,
				aliases: 'fake',
				type: 'shop',
			},
			{
				name: 'FishingPole',
				amount: 14000,
				aliases: 'pole',
				type: 'shop',
			},
			{
				name: 'Horseshoe',
				amount: 9000,
				aliases: 'shoe',
				type: 'shop',
			},
			{
				name: 'HuntingRifle',
				amount: 14000,
				aliases: 'rifle',
				type: 'shop',
			},
			{
				name: 'Landmine',
				amount: 6000,
				aliases: 'mine',
				type: 'shop',
			},
			{
				name: 'Laptop',
				amount: 2000,
				aliases: 'lap',
				type: 'shop',
			},
			{
				name: 'Lifesaver',
				amount: 10000,
				aliases: 'life',
				type: 'shop',
			},
			{
				name: 'Padlock',
				amount: 2000,
				aliases: 'pad',
				type: 'shop',
			},
			{
				name: 'PepeCoin',
				amount: 500000,
				aliases: 'pepec',
				type: 'shop',
			},
			{
				name: 'PepeMedal',
				amount: 7000000,
				aliases: 'crown',
				type: 'shop',
			},
			{
				name: 'CellPhone',
				amount: 800,
				aliases: 'cell',
				type: 'shop',
			},
			{
				name: 'PinkPhallic',
				amount: 5,
				aliases: 'pink',
				type: 'shop',
			},
			{
				name: 'PizzaSlice',
				amount: 175000,
				aliases: 'pizza',
				type: 'shop',
			},
			{
				name: 'BoxOfSand',
				amount: 2000,
				aliases: 'sand',
				type: 'shop',
			},
			{
				name: 'Shovel',
				amount: 12000,
				aliases: 'shovel',
				type: 'shop',
			},
			{
				name: 'FidgetSpinner',
				amount: 5000,
				aliases: 'spin',
				type: 'shop',
			},
			{
				name: 'RobbersWishlist',
				amount: 20000,
				aliases: 'wishlist',
				type: 'shop',
			},
			{
				name: 'Tidepod',
				amount: 10000,
				aliases: 'tide',
				type: 'shop',
			},
			{
				name: 'BanHammer',
				amount: 1000000,
				aliases: 'hammer',
				type: 'work',
			},
			{
				name: 'Baby',
				amount: 5000000,
				aliases: 'baby',
				type: 'work',
			},
			{
				name: 'CrunchyTaco',
				amount: 5000000,
				aliases: 'taco',
				type: 'work',
			},
			{
				name: 'UsedDiaper',
				amount: 3000000,
				aliases: 'diaper',
				type: 'work',
			},
			{
				name: 'TipJar',
				amount: 7000000,
				aliases: 'tip',
				type: 'work',
			},
			{
				name: 'LikeButton',
				amount: 2000000,
				aliases: 'like',
				type: 'work',
			},
			{
				name: 'Ammo',
				amount: 4000000,
				aliases: 'ammo',
				type: 'work',
			},
			{
				name: 'FishingBait',
				amount: 4000000,
				aliases: 'bait',
				type: 'work',
			},
			{
				name: 'BottleOfWhiskey',
				amount: 4000000,
				aliases: 'whisk',
				type: 'work',
			},
			{
				name: 'RobbersMask',
				amount: 4000000,
				aliases: 'mask',
				type: 'work',
			},
			{
				name: 'PoliceBadge',
				amount: 7000000,
				aliases: 'badge',
				type: 'work',
			},
			
			{
				name: 'Aplus',
				amount: 5000000,
				aliases: 'plus',
				type: 'work',
			},

			{
				name: 'MusicalNote',
				amount: 10000000,
				aliases: 'note',
				type: 'work',
			},

			{
				name: 'ShopCoupon',
				amount: 10000000,
				aliases: 'coupon',
				type: 'work',
			},

			{
				name: 'EnergyDrink',
				amount: 5000000,
				aliases: 'drink',
				type: 'work',
			},

			{
				name: 'MotivationalPoster',
				amount: 4000000,
				aliases: 'poster',
				type: 'work',
			},

			{
				name: 'Binary',
				amount: 10000000,
				aliases: 'binary',
				type: 'work',
			},

			{
				name: 'StonkMachine',
				amount: 20000000,
				aliases: 'stonk',
				type: 'work',
			},

			{
				name: 'SantasBag',
				amount: 50000000,
				aliases: 'sbag',
				type: 'work',
			},

			{
				name: 'StackOfCash',
				amount: 10000000,
				aliases: 'stack',
				type: 'work',
			},

			{
				name: 'PetCollar',
				amount: 10000000,
				aliases: 'collar',
				type: 'work',
			},

			{
				name: 'MemePills',
				amount: 10000000,
				aliases: 'memepill',
				type: 'work',
			},

			{
				name: 'LawDegree',
				amount: 8000000,
				aliases: 'law',
				type: 'work',
			},

			{
				name: 'BeakerOfSusFluid',
				amount: 12000000,
				aliases: 'beaker',
				type: 'work',
			},

			{
				name: 'Vaccine',
				amount: 12000000,
				aliases: 'vaccine',
				type: 'work',
			},

			{
				name: 'Ectoplasm',
				amount: 5000000,
				aliases: 'ecto',
				type: 'work',
			},
			
{
	name: 'AetheryxFlower',
	amount: 15000000,
	aliases: 'flow',
	type: 'nonpurchasable',
},
{
	name: 'Banknote',
	amount: 100000,
	aliases: 'note',
	type: 'nonpurchasable',
},

{
	name: 'BluePhallicObject',
	amount: 15000,
	aliases: 'bluephal',
	type: 'nonpurchasable',
},
{
	name: 'Blob',
	amount: 2000000000,
	aliases: 'blob',
	type: 'nonpurchasable',
},

{
	name: 'BoltCutters',
	amount: 175000000,
	aliases: 'bolt',
	type: 'nonpurchasable',
},
{
	name: 'Bread',
	amount: 10000,
	aliases: 'bread',
	type: 'nonpurchasable',
},

{
	name: 'BadoszCard',
	amount: 15000000,
	aliases: 'card',
	type: 'nonpurchasable',
},
{
	name: 'Candy',
	amount: 20000,
	aliases: 'candy',
	type: 'nonpurchasable',
},
{
	name: 'ChillPill',
	amount: 10000,
	aliases: 'chill',
	type: 'nonpurchasable',
},

{
	name: 'Cookie',
	amount: 2000,
	aliases: 'cook',
	type: 'nonpurchasable',
},

{
	name: 'CupidToe',
	amount: 30000,
	aliases: 'toe',
	type: 'nonpurchasable',
},

{
	name: 'FoolsNotif',
	amount: 30000,
	aliases: 'fools',
	type: 'nonpurchasable',
},

{
	name: 'JackoLanty',
	amount: 4500000,
	aliases: 'jacky',
	type: 'nonpurchasable',
},

{
	name: 'MemlsiesBeard',
	amount: 45000000,
	aliases: 'beard',
	type: 'nonpurchasable',
},
{
	name: 'WinningLotteryTicket',
	amount: 35000000,
	aliases: 'lot',
	type: 'nonpurchasable',
},

{
	name: 'PepeStatue',
	amount: 750000,
	aliases: 'stat',
	type: 'nonpurchasable',
},

{
	name: 'Potato',
	amount: 275000,
	aliases: 'pot',
	type: 'nonpurchasable',
},

{
	name: 'SantasHat',
	amount: 50000,
	aliases: 'hat',
	type: 'nonpurchasable',
},

{
	name: 'Snowball',
	amount: 25000,
	aliases: 'snow',
	type: 'nonpurchasable',
},

{
	name: 'GoldenPhallicObject',
	amount: 100000,
	aliases: 'gold',
	type: 'nonpurchasable',
},

{
	name: 'Reversal',
	amount: 3000000,
	aliases: 'rev',
	type: 'nonpurchasable',
},


{
	name: 'MulticoloredPhallicObject',
	amount: 7000000,
	aliases: 'multi',
	type: 'nonpurchasable',
},

{
	name: 'OrangePhallicObject',
	amount: 50000,
	aliases: 'orange',
	type: 'nonpurchasable',
},

{
	name: 'PurplePhallicObject',
	amount: 50000,
	aliases: 'purple',
	type: 'nonpurchasable',
},

{
	name: 'DailyBox',
	amount: 100000,
	aliases: 'daily',
	type: 'nonpurchasable',
},

{
	name: 'NormieBox',
	amount: 75000,
	aliases: 'norm',
	type: 'nonpurchasable',
},

{
	name: 'MemeBox',
	amount: 120000,
	aliases: 'meme',
	type: 'nonpurchasable',
},

{
	name: 'DankBox',
	amount: 300000,
	aliases: 'dank',
	type: 'nonpurchasable',
},

{
	name: 'GodBox',
	amount: 5000000,
	aliases: 'god',
	type: 'nonpurchasable',
},
		];
		let data =
			(await db
				.ref(`Donations/Info/${message.guild.id}/List`)
				.once('value')
				.then((snapshot) => snapshot.val())) || [];
	
		db.ref(`Donations/Info/${message.guild.id}/List`)
		
		let item =
			data.find((item) => item.name.toUpperCase() === args[0].toUpperCase()) ||
			data.find((item) => item.aliases.toUpperCase() === args[0].toUpperCase());
		if (!item)
			return message.reply({ content: `Could not find that item!` });
		let str = ``
		if(!isNaN(item.amount)) str = `⏣ ${formatter.format(
			item.amount
		)}`
		else str = item.amount
		let embed = new MessageEmbed()
			.setTitle(`**Elite's Item List**`)
			.setAuthor(`${item.name}`)
			.setDescription(
				`**<:dott:878752973587615776>Amount**<a:im5:859288337280925746> \`${str}\`\n**<:dott:878752973587615776>Aliases**<a:im5:859288337280925746> \`${
					item.aliases
				}\`\n**<:dott:878752973587615776>Item Type**<a:im5:859288337280925746> \`${
					item.type
				}\``
			)
			.setColor('RANDOM')
			.setFooter(
				`Elite Empire`,
				`https://cdn.discordapp.com/icons/764885367160700958/a_38503e9dec18ac442fecaad24a3d07c0.gif?size=1024`
			);
		message.channel.send({ embeds: [embed] });
	},
};
