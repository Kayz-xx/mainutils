const {MessageEmbed } = require("discord.js");
const discordTTS = require("discord-tts");
const {
  AudioPlayer,
  createAudioResource,
  StreamType,
  entersState,
  VoiceConnectionStatus,
  joinVoiceChannel,
} = require("@discordjs/voice");
module.exports = {
  name: "tts",
  aliases: ["texttospeech"],
  cooldown: "2",
  permissions: [],
  category: "Misc",

  async execute(client, message, cmd, args) {
    if (message.author.id !== "491933949686448138")
      return message.channel.send({ content: "Coming Soon!" });

    let voiceConnection;
    let audioPlayer = new AudioPlayer();
    const voiceChannel = message.member.voice.channel;
    const say = args.join(" ");

    if (!voiceChannel)
      return message.channel.send(
        "Join to a voice channel and try it **again**."
      );
    if (!say) {
      let a = new MessageEmbed()
        .setTitle("**What do you want the bot to say?**")
        .setColor("RED");
      return message.channel.send(a);
    }
    const stream = discordTTS.getVoiceStream(say, { lang: "en" });
    const audioResource = createAudioResource(stream, {
      inputType: StreamType.Arbitrary,
      inlineVolume: true,
    });
    if (
      !voiceConnection ||
      voiceConnection?.status === VoiceConnectionStatus.Disconnected
    ) {
      voiceConnection = joinVoiceChannel({
        channelId: message.member.voice.channelId,
        guildId: message.guildId,
        adapterCreator: message.guild.voiceAdapterCreator,
      });
      voiceConnection = await entersState(
        voiceConnection,
        VoiceConnectionStatus.Connecting,
        5_000
      );
    }

    if (voiceConnection.status === VoiceConnectionStatus.Connected) {
      voiceConnection.subscribe(audioPlayer);
      audioPlayer.play(audioResource);
    }
  },
};
