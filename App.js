import { useEvent } from "expo";
import { VideoView, useVideoPlayer } from "expo-video";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

const videoURI =
  "https://stream.mux.com/39027PnoaVkt7qpHEHr9OHYSqDpyGPjYmnfDVHKkaUaY.m3u8";

export default function App() {
  const player = useVideoPlayer(videoURI, (initialPlayer) => {
    initialPlayer.play();
  });

  const { availableSubtitleTracks } = useEvent(
    player,
    "availableSubtitleTracksChange",
    { availableSubtitleTracks: player.availableSubtitleTracks }
  );

  useEffect(() => {
    const swedishSubtitleTrack = availableSubtitleTracks.find(
      (track) => track.language === "sv"
    );

    if (swedishSubtitleTrack) {
      player.subtitleTrack = swedishSubtitleTrack;
    } else {
      player.subtitleTrack = null;
    }
  }, [availableSubtitleTracks, player]);

  return (
    <View style={styles.container}>
      <VideoView player={player} style={styles.video} contentFit={"contain"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  video: {
    width: "100%",
    height: "100%",
  },
});
