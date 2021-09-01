const { Client, Message, MessageEmbed, Collection } = require('discord.js');
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
				name: 'alcohol',
				amount: 7500,
				aliases: 'alc',
				type: 'shop',
			},
			{
				name: 'apple',
				amount: 5000,
				aliases: 'app',
				type: 'shop',
			},
			{
				name: 'cheese',
				amount: 35000,
				aliases: 'chee',
				type: 'shop',
			},
			{
				name: 'coinbomb',
				amount: 16000,
				aliases: 'coin',
				type: 'shop',
			},
			{
				name: 'pepecrown',
				amount: 240000000,
				aliases: 'crown',
				type: 'shop',
			},
			{
				name: 'pepetrophy',
				amount: 35000000,
				aliases: 'trophy',
				type: 'shop',
			},
			{
				name: 'rarepepe',
				amount: 50000,
				aliases: 'pepe',
				type: 'shop',
			},
			{
				name: 'fakeid',
				amount: 800,
				aliases: 'fake',
				type: 'shop',
			},
			{
				name: 'fishingpole',
				amount: 14000,
				aliases: 'pole',
				type: 'shop',
			},
			{
				name: 'horseshoe',
				amount: 9000,
				aliases: 'shoe',
				type: 'shop',
			},
			{
				name: 'huntingrifle',
				amount: 14000,
				aliases: 'rifle',
				type: 'shop',
			},
			{
				name: 'landmine',
				amount: 6000,
				aliases: 'mine',
				type: 'shop',
			},
			{
				name: 'laptop',
				amount: 2000,
				aliases: 'lap',
				type: 'shop',
			},
			{
				name: 'lifesaver',
				amount: 10000,
				aliases: 'life',
				type: 'shop',
			},
			{
				name: 'padlock',
				amount: 2000,
				aliases: 'pad',
				type: 'shop',
			},
			{
				name: 'pepecoin',
				amount: 500000,
				aliases: 'pepec',
				type: 'shop',
			},
			{
				name: 'pepemedal',
				amount: 7000000,
				aliases: 'crown',
				type: 'shop',
			},
			{
				name: 'cellphone',
				amount: 800,
				aliases: 'cell',
				type: 'shop',
			},
			{
				name: 'pinkphallic',
				amount: 5,
				aliases: 'pink',
				type: 'shop',
			},
			{
				name: 'pizzaslice',
				amount: 175000,
				aliases: 'pizza',
				type: 'shop',
			},
			{
				name: 'boxofsand',
				amount: 2000,
				aliases: 'sand',
				type: 'shop',
			},
			{
				name: 'shovel',
				amount: 12000,
				aliases: 'shovel',
				type: 'shop',
			},
			{
				name: 'fidgetspinner',
				amount: 5000,
				aliases: 'spin',
				type: 'shop',
			},
			{
				name: 'robberswishlist',
				amount: 20000,
				aliases: 'wishlist',
				type: 'shop',
			},
			{
				name: 'tidepod',
				amount: 10000,
				aliases: 'tide',
				type: 'shop',
			},
			{
				name: 'banhammer',
				amount: 1000000,
				alias: 'hammer',
				type: 'work',
			},
			{
				name: 'baby',
				amount: 5000000,
				alias: 'baby',
				type: 'work',
			},
			{
				name: 'crunchytaco',
				amount: 5000000,
				alias: 'taco',
				type: 'work',
			},
			{
				name: 'useddiaper',
				amount: 3000000,
				alias: 'diaper',
				type: 'work',
			},
			{
				name: 'tipjar',
				amount: 7000000,
				alias: 'tip',
				type: 'work',
			},
			{
				name: 'likebutton',
				amount: 2000000,
				alias: 'like',
				type: 'work',
			},
			{
				name: 'ammo',
				amount: 4000000,
				alias: 'ammo',
				type: 'work',
			},
			{
				name: 'fishingbait',
				amount: 4000000,
				alias: 'bait',
				type: 'work',
			},
			{
				name: 'bottleofwhiskey',
				amount: 4000000,
				alias: 'whisk',
				type: 'work',
			},
			{
				name: 'robbermask',
				amount: 4000000,
				alias: 'mask',
				type: 'work',
			},
			{
				name: 'policebadge',
				amount: 7000000,
				aliases: 'badge',
				type: 'work',
			},
			{
				name: 'policebadge',
				amount: 7000000,
				aliases: 'badge',
				type: 'work',
			},
			{
				name: 'aplus',
				amount: 5000000,
				aliases: 'plus',
				type: 'work',
			},

			{
				name: 'musicalnote',
				amount: 10000000,
				aliases: 'note',
				type: 'work',
			},

			{
				name: 'shopcoupon',
				amount: 10000000,
				aliases: 'coupon',
				type: 'work',
			},

			{
				name: 'energydrink',
				amount: 5000000,
				aliases: 'drink',
				type: 'work',
			},

			{
				name: 'motivationalposter',
				amount: 4000000,
				aliases: 'poster',
				type: 'work',
			},

			{
				name: 'binary',
				amount: 10000000,
				aliases: 'binary',
				type: 'work',
			},

			{
				name: 'stonkmachine',
				amount: 20000000,
				aliases: 'stonk',
				type: 'work',
			},

			{
				name: 'santasbag',
				amount: 50000000,
				aliases: 'sbag',
				type: 'work',
			},

			{
				name: 'stackofcash',
				amount: 10000000,
				aliases: 'stack',
				type: 'work',
			},

			{
				name: 'petcollar',
				amount: 10000000,
				aliases: 'collar',
				type: 'work',
			},

			{
				name: 'memepills',
				amount: 10000000,
				aliases: 'memepill',
				type: 'work',
			},

			{
				name: 'lawdegree',
				amount: 8000000,
				aliases: 'law',
				type: 'work',
			},

			{
				name: 'beakerofsusfluid',
				amount: 12000000,
				aliases: 'beaker',
				type: 'work',
			},

			{
				name: 'vaccine',
				amount: 12000000,
				aliases: 'vaccine',
				type: 'work',
			},

			{
				name: 'ectoplasm',
				amount: 5000000,
				aliases: 'ecto',
				type: 'work',
			},
			
{
	name: 'aetheryxflower',
	amount: 15000000,
	aliases: 'flow',
	type: 'nonpurchasable',
},
{
	name: 'banknote',
	amount: 100000,
	aliases: 'note',
	type: 'nonpurchasable',
},

{
	name: 'bluephallicobject',
	amount: 15000,
	aliases: 'bluephal',
	type: 'nonpurchasable',
},
{
	name: 'blob',
	amount: 2000000000,
	aliases: 'blob',
	type: 'nonpurchasable',
},

{
	name: 'boltcutters',
	amount: 175000000,
	aliases: 'bolt',
	type: 'nonpurchasable',
},
{
	name: 'bread',
	amount: 10000,
	aliases: 'bread',
	type: 'nonpurchasable',
},

{
	name: 'badoszcard',
	amount: 15000000,
	aliases: 'card',
	type: 'nonpurchasable',
},
{
	name: 'candy',
	amount: 20000,
	aliases: 'candy',
	type: 'nonpurchasable',
},
{
	name: 'chillpill',
	amount: 10000,
	aliases: 'chill',
	type: 'nonpurchasable',
},

{
	name: 'cookie',
	amount: 2000,
	aliases: 'cook',
	type: 'nonpurchasable',
},

{
	name: 'cupidtoe',
	amount: 30000,
	aliases: 'toe',
	type: 'nonpurchasable',
},

{
	name: 'foolsnotif',
	amount: 30000,
	aliases: 'fools',
	type: 'nonpurchasable',
},

{
	name: 'jackolanty',
	amount: 4500000,
	aliases: 'jacky',
	type: 'nonpurchasable',
},

{
	name: 'memlsiesbeard',
	amount: 45000000,
	aliases: 'beard',
	type: 'nonpurchasable',
},
{
	name: 'winninglotteryticket',
	amount: 35000000,
	aliases: 'lot',
	type: 'nonpurchasable',
},

{
	name: 'pepestatue',
	amount: 750000,
	aliases: 'stat',
	type: 'nonpurchasable',
},

{
	name: 'potato',
	amount: 275000,
	aliases: 'pot',
	type: 'nonpurchasable',
},

{
	name: 'santashat',
	amount: 50000,
	aliases: 'hat',
	type: 'nonpurchasable',
},

{
	name: 'snowball',
	amount: 25000,
	aliases: 'snow',
	type: 'nonpurchasable',
},

{
	name: 'goldenphallicobject',
	amount: 100000,
	aliases: 'gold',
	type: 'nonpurchasable',
},

{
	name: 'reversal',
	amount: 3000000,
	aliases: 'rev',
	type: 'nonpurchasable',
},


{
	name: 'multicoloredphallicobject',
	amount: 7000000,
	aliases: 'multi',
	type: 'nonpurchasable',
},

{
	name: 'orangephallicobject',
	amount: 50000,
	aliases: 'orange',
	type: 'nonpurchasable',
},

{
	name: 'purplephallicobject',
	amount: 50000,
	aliases: 'purple',
	type: 'nonpurchasable',
},

{
	name: 'dailybox',
	amount: 100000,
	aliases: 'daily',
	type: 'nonpurchasable',
},

{
	name: 'normiebox',
	amount: 75000,
	aliases: 'norm',
	type: 'nonpurchasable',
},

{
	name: 'memebox',
	amount: 120000,
	aliases: 'meme',
	type: 'nonpurchasable',
},

{
	name: 'dankbox',
	amount: 300000,
	aliases: 'dank',
	type: 'nonpurchasable',
},

{
	name: 'godbox',
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
		if(data.length > 0) {
		db.ref(`Donations/Info/${message.guild.id}/List`)
		} else {
		db.ref(`Donations/Info/${message.guild.id}/List`).set(items);
		}
		let item =
			data.find((item) => item.name === args[0]) ||
			data.find((item) => item.aliases === args[0]);
		if (!item)
			return message.reply({ content: `Could not find that item!` });
		let embed = new MessageEmbed()
			.setTitle(`**Elite's Item List**`)
			.setAuthor(`${item.name}`)
			.setDescription(
				`**<:dott:878752973587615776>Amount**<a:im5:859288337280925746> \`⏣ ${formatter.format(
					item.amount
				)}\`\n**<:dott:878752973587615776>Aliases**<a:im5:859288337280925746> \`${
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
