import { Button, StyleSheet, Text, View } from 'react-native'
import { useVideoPlayer, VideoView } from 'expo-video'
import { useCallback, useState } from 'react'

const SAFIE_API_KEY = 'xxxxxxxx'

const videoSources = [
  {
    uri: 'https://openapi.safie.link/v2/devices/XfAZzjYAephPkbnUcCRI/live/playlist.m3u8',
    headers: { 'Safie-API-Key': SAFIE_API_KEY },
  },
  {
    uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/CastVideos/hls/BigBuckBunny.m3u8',
  },
  {
    uri: 'http://devimages.apple.com/iphone/samples/bipbop/bipbopall.m3u8',
  },
  {
    uri: 'https://videos.pexels.com/video-files/3970778/3970778-sd_640_360_25fps.mp4',
  },
]

export default function VideoScreen() {
  const players = [
    useVideoPlayer(videoSources[0], (player) => {
      player.play()
    }),
    useVideoPlayer(videoSources[1]),
    useVideoPlayer(videoSources[2]),
    useVideoPlayer(videoSources[3]),
  ]

  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0)

  const currentPlayer = players[currentPlayerIndex]

  console.log('currentPlayerIndex', currentPlayerIndex)

  return (
    <View style={styles.screen}>
      <View style={styles.meta}>
        <Text selectable style={styles.urlText}>
          {currentPlayerIndex + 1}.{videoSources[currentPlayerIndex].uri}
        </Text>
      </View>
      <VideoView
        style={styles.video}
        player={currentPlayer}
        allowsFullscreen
        allowsPictureInPicture
      />
      <Button
        title="Switch"
        onPress={useCallback(() => {
          const nextIndex = (currentPlayerIndex + 1) % videoSources.length
          currentPlayer.pause()
          setCurrentPlayerIndex(nextIndex)
          const nextPlayer = players[nextIndex]
          nextPlayer.play()
        }, [currentPlayerIndex])}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: { flex: 1, justifyContent: 'center' },
  meta: { marginBottom: 8, paddingHorizontal: 8 },
  urlText: { fontSize: 10 },
  video: {
    width: '100%',
    height: 300,
  },
  switchButton: { alignSelf: 'center' },
})
