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

		/*const items = [
			{
				name: 'Alcohol',
				amount: 7500,
				id: 'alc',
				type: 'shop',
			},
			{
				name: 'Apple',
				amount: 5000,
				id: 'app',
				type: 'shop',
			},
			{
				name: 'Cheese',
				amount: 35000,
				id: 'chee',
				type: 'shop',
			},
			{
				name: 'Coin bomb',
				amount: 16000,
				id: 'coin',
				type: 'shop',
			},
			{
				name: 'Pepe Crown',
				amount: 240000000,
				id: 'crown',
				type: 'shop',
			},
			{
				name: 'Pepe Trophy',
				amount: 40000000,
				id: 'trophy',
				type: 'shop',
			},
			{
				name: 'Rare Pepe',
				amount: 50000,
				id: 'pepe',
				type: 'shop',
			},
			{
				name: 'Fake id',
				amount: 800,
				id: 'fake',
				type: 'shop',
			},
			{
				name: 'Fishing Pole',
				amount: 14000,
				id: 'pole',
				type: 'shop',
			},
			{
				name: 'Horseshoe',
				amount: 9000,
				id: 'shoe',
				type: 'shop',
			},
			{
				name: 'Hunting Rifle',
				amount: 14000,
				id: 'rifle',
				type: 'shop',
			},
			{
				name: 'Landmine',
				amount: 6000,
				id: 'mine',
				type: 'shop',
			},
			{
				name: 'Laptop',
				amount: 2000,
				id: 'lap',
				type: 'shop',
			},
			{
				name: 'Lifesaver',
				amount: 10000,
				id: 'life',
				type: 'shop',
			},
			{
				name: 'Padlock',
				amount: 2000,
				id: 'pad',
				type: 'shop',
			},
			{
				name: 'Pepe Coin',
				amount: 300000,
				id: 'pepec',
				type: 'shop',
			},
			{
				name: 'Pepe Medal',
				amount: 5000000,
				id: 'crown',
				type: 'shop',
			},
			{
				name: 'Cell Phone',
				amount: 800,
				id: 'cell',
				type: 'shop',
			},
			{
				name: 'Pink Phallic Object',
				amount: 5,
				id: 'pink',
				type: 'shop',
			},
			{
				name: 'Pizza Slice',
				amount: 175000,
				id: 'pizza',
				type: 'shop',
			},
			{
				name: 'Box Of Sand',
				amount: 2000,
				id: 'sand',
				type: 'shop',
			},
			{
				name: 'Shovel',
				amount: 12000,
				id: 'shovel',
				type: 'shop',
			},
			{
				name: 'Fidget Spinner',
				amount: 5000,
				id: 'spin',
				type: 'shop',
			},
			{
				name: 'Robbers Wishlist',
				amount: 20000,
				id: 'wishlist',
				type: 'shop',
			},
			{
				name: 'Tidepod',
				amount: 10000,
				id: 'tide',
				type: 'shop',
			},
			{
				name: 'Ban Hammer',
				amount: 1000000,
				id: 'hammer',
				type: 'work',
			},
			{
				name: 'Baby',
				amount: 5000000,
				id: 'baby',
				type: 'work',
			},
			{
				name: 'Crunchy Taco',
				amount: 5000000,
				id: 'taco',
				type: 'work',
			},
			{
				name: 'Used Diaper',
				amount: 3000000,
				id: 'diaper',
				type: 'work',
			},
			{
				name: 'Tip Jar',
				amount: 7000000,
				id: 'tip',
				type: 'work',
			},
			{
				name: 'Like Button',
				amount: 2000000,
				id: 'like',
				type: 'work',
			},
			{
				name: 'Ammo',
				amount: 4000000,
				id: 'ammo',
				type: 'work',
			},
			{
				name: 'Fishing Bait',
				amount: 4000000,
				id: 'bait',
				type: 'work',
			},
			{
				name: 'Bottle Of Whiskey',
				amount: 4000000,
				id: 'whisk',
				type: 'work',
			},
			{
				name: 'Robbers Mask',
				amount: 4000000,
				id: 'mask',
				type: 'work',
			},
			{
				name: 'Police Badge',
				amount: 7000000,
				id: 'badge',
				type: 'work',
			},
			
			{
				name: 'A Plus',
				amount: 5000000,
				id: 'plus',
				type: 'work',
			},
		
			{
				name: 'Musical Note',
				amount: 10000000,
				id: 'musical',
				type: 'work',
			},
		
			{
				name: 'Shop Coupon',
				amount: 10000000,
				id: 'coupon',
				type: 'work',
			},
		
			{
				name: 'Energy Drink',
				amount: 5000000,
				id: 'drink',
				type: 'work',
			},
		
			{
				name: 'Motivational Poster',
				amount: 4000000,
				id: 'poster',
				type: 'work',
			},
		
			{
				name: 'Binary',
				amount: 10000000,
				id: 'binary',
				type: 'work',
			},
		
			{
				name: 'Stonk Machine',
				amount: 20000000,
				id: 'stonk',
				type: 'work',
			},
		
			{
				name: 'Santas Bag',
				amount: 50000000,
				id: 'sbag',
				type: 'work',
			},
		
			{
				name: 'Stack Of Cash',
				amount: 10000000,
				id: 'stack',
				type: 'work',
			},
		
			{
				name: 'Pet Collar',
				amount: 10000000,
				id: 'collar',
				type: 'work',
			},
		
			{
				name: 'Meme Pills',
				amount: 10000000,
				id: 'memepill',
				type: 'work',
			},
		
			{
				name: 'Law Degree',
				amount: 8000000,
				id: 'law',
				type: 'work',
			},
		
			{
				name: 'Beaker Of Sus Fluid',
				amount: 12000000,
				id: 'beaker',
				type: 'work',
			},
		
			{
				name: 'Vaccine',
				amount: 12000000,
				id: 'vaccine',
				type: 'work',
			},
		
			{
				name: 'Ectoplasm',
				amount: 5000000,
				id: 'ecto',
				type: 'work',
			},
			
		{
		name: 'Aetheryx Flower',
		amount: 15000000,
		id: 'flower',
		type: 'nonpurchasable',
		},
		{
		name: 'Banknote',
		amount: 100000,
		id: 'bank',
		type: 'nonpurchasable',
		},
		
		{
		name: 'Blue Phallic Object',
		amount: 15000,
		id: 'bluephal',
		type: 'nonpurchasable',
		},
		{
		name: 'Blob',
		amount: 2000000000,
		id: 'blob',
		type: 'nonpurchasable',
		},
		
		{
		name: 'Bolt Cutters',
		amount: 175000000,
		id: 'bolt',
		type: 'nonpurchasable',
		},
		{
		name: 'Bread',
		amount: 10000,
		id: 'bread',
		type: 'nonpurchasable',
		},
		
		{
		name: 'Badosz Card',
		amount: 15000000,
		id: 'card',
		type: 'nonpurchasable',
		},
		{
		name: 'Candy',
		amount: 20000,
		id: 'candy',
		type: 'nonpurchasable',
		},
		{
		name: 'Chill Pill',
		amount: 10000,
		id: 'chill',
		type: 'nonpurchasable',
		},
		
		{
		name: 'Cookie',
		amount: 2000,
		id: 'cook',
		type: 'nonpurchasable',
		},
		
		{
		name: 'Cupid Toe',
		amount: 30000,
		id: 'toe',
		type: 'nonpurchasable',
		},
		
		{
		name: 'Fools Notif',
		amount: 30000,
		id: 'fools',
		type: 'nonpurchasable',
		},
		
		{
		name: 'Jack o Lanty',
		amount: 4500000,
		id: 'jacky',
		type: 'nonpurchasable',
		},
		
		{
		name: 'Memlsies Beard',
		amount: 45000000,
		id: 'beard',
		type: 'nonpurchasable',
		},
		{
		name: 'Winning Lottery Ticket',
		amount: 35000000,
		id: 'lot',
		type: 'nonpurchasable',
		},
		
		{
		name: 'Pepe Statue',
		amount: 750000,
		id: 'stat',
		type: 'nonpurchasable',
		},
		
		{
		name: 'Potato',
		amount: 275000,
		id: 'potato',
		type: 'nonpurchasable',
		},
		
		{
		name: 'Santas Hat',
		amount: 50000,
		id: 'hat',
		type: 'nonpurchasable',
		},
		
		{
		name: 'Snowball',
		amount: 25000,
		id: 'snow',
		type: 'nonpurchasable',
		},
		
		{
		name: 'Golden Phallic Object',
		amount: 100000,
		id: 'gold',
		type: 'nonpurchasable',
		},
		
		{
		name: 'Reversal',
		amount: 3000000,
		id: 'rev',
		type: 'nonpurchasable',
		},
		
		
		{
		name: 'Multicolored Phallic Object',
		amount: 7000000,
		id: 'multi',
		type: 'nonpurchasable',
		},
		
		{
		name: 'Orange Phallic Object',
		amount: 50000,
		id: 'orange',
		type: 'nonpurchasable',
		},
		
		{
		name: 'Purple Phallic Object',
		amount: 50000,
		id: 'purple',
		type: 'nonpurchasable',
		},
		
		{
		name: 'Daily Box',
		amount: 100000,
		id: 'daily',
		type: 'nonpurchasable',
		},
		
		{
		name: 'Normie Box',
		amount: 75000,
		id: 'norm',
		type: 'nonpurchasable',
		},
		
		{
		name: 'Meme Box',
		amount: 120000,
		id: 'meme',
		type: 'nonpurchasable',
		},
		
		{
		name: 'Dank Box',
		amount: 300000,
		id: 'dank',
		type: 'nonpurchasable',
		},
		
		{
		name: 'God Box',
		amount: 5000000,
		id: 'god',
		type: 'nonpurchasable',
		},
	];*/
	let items =
	(await db
		.ref(`Donations/Info/${message.guild.id}/List`)
		.once('value')
		.then((snapshot) => snapshot.val())) || [];
		function similarityBetween(s1, s2) {
			let longer = s1;
			let shorter = s2;
			if (s1.length < s2.length) {
				longer = s2;
				shorter = s1;
			}
			const longerLength = longer.length;
			if (longerLength === 0) {
				return 1.0;
			}
			return (
				(longerLength - editDistance(longer, shorter)) /
				parseFloat(longerLength)
			);
		}
	
		function editDistance(s1, s2) {
			s1 = s1.toLowerCase();
			s2 = s2.toLowerCase();
	
			const costs = [];
			for (let i = 0; i <= s1.length; i++) {
				let lastValue = i;
				for (let j = 0; j <= s2.length; j++) {
					if (i === 0) {
						costs[j] = j;
					} else {
						if (j > 0) {
							let newValue = costs[j - 1];
							if (s1.charAt(i - 1) !== s2.charAt(j - 1)) {
								newValue =
									Math.min(
										Math.min(newValue, lastValue),
										costs[j]
									) + 1;
							}
							costs[j - 1] = lastValue;
							lastValue = newValue;
						}
					}
				}
				if (i > 0) {
					costs[s2.length] = lastValue;
				}
			}
			return costs[s2.length];
		}
	
		function search(query) {
			query = query.toLowerCase();
	
			const target = items;
			const candidates = [];
	
			for (const item in target) {
				const candidate = {
					item: target[item],
					similarity: 0,
				};
	
				if (candidate.item.id.toLowerCase() === query) {
					candidate.similarity = 1;
				} else if (candidate.item.name.toLowerCase() === query) {
					candidate.similarity = 0.999;
				} else if (
					candidate.item.name.toLowerCase().includes(" " + query + " ") ||
					candidate.item.id.includes(" " + query + " ")
				) {
					candidate.similarity = 0.998;
				} else if (
					candidate.item.name.toLowerCase().includes(query + " ") ||
					candidate.item.id.includes(query + " ")
				) {
					candidate.similarity = 0.997;
				} else if (
					candidate.item.name.toLowerCase().includes(" " + query) ||
					candidate.item.id.includes(" " + query)
				) {
					candidate.similarity = 0.997;
				} else if (
					candidate.item.name.toLowerCase().includes(query) ||
					candidate.item.id.includes(query)
				) {
					candidate.similarity = 0.996;
				} else {
					const similarity = similarityBetween(
						query,
						candidate.item.name
					);
					candidate.similarity = similarity;
				}
	
				candidates.push(candidate);
			}
			return candidates.sort((a, b) => b.similarity - a.similarity)[0]
		
		}
	
	
		
	
		//db.ref(`Donations/Info/${message.guild.id}/List`).set(items);
		
		let tem =
			search(args.slice(0).join(" "))
		
		if (tem.similarity <= 0.6)
			return message.reply({ content: `Could not find that item!` });
		
		const item = tem.item
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
					item.id
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
	
