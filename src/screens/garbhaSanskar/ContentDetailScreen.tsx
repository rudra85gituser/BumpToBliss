import { router, useLocalSearchParams } from "expo-router";
import { useMemo } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Video from "react-native-video";

import { useGarbhaAllData } from "../../hooks/useGarbhaAllData";

export default function ContentDetailScreen() {
  const { contentId, pregnancyDay, pregnancyWeek } = useLocalSearchParams();

  const { content, loading } = useGarbhaAllData(
    Number(pregnancyDay),
    Number(pregnancyWeek)
  );

  const selectedContent = useMemo(() => {
    return content?.find((item) => item.id.toString() === String(contentId));
  }, [content, contentId]);

  const relatedVideos = useMemo(() => {
    if (!selectedContent || !content) return [];
    return content.filter(
      (item) =>
        item.id !== selectedContent.id &&
        item.garbha_sanskar_section?.id === selectedContent.garbha_sanskar_section?.id
    );
  }, [content, selectedContent]);

  if (loading) {
    return (
      <SafeAreaView style={styles.safe} edges={["top"]}>
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#20094D" />
        </View>
      </SafeAreaView>
    );
  }

  if (!selectedContent) {
    return (
      <SafeAreaView style={styles.safe} edges={["top"]}>
        <View style={styles.loader}>
          <Text>Content not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

        {/* Back Button */}
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>

        {/* VIDEO / THUMBNAIL */}
        {selectedContent.media?.url ? (
          <Video
            source={{ uri: selectedContent.media.url }}
            style={styles.video}
            controls
            paused={false}
            resizeMode="cover"
          />
        ) : (
          <Image
            source={{ uri: selectedContent.thumbnail?.url }}
            style={styles.video}
            resizeMode="cover"
          />
        )}

        {/* BODY */}
        <View style={styles.contentContainer}>

          {/* Title + Duration */}
          <Text style={styles.title}>{selectedContent.title}</Text>
          <Text style={styles.duration}>{selectedContent.duration ?? 0} min</Text>

          {/* Description */}
          <Text style={styles.sectionTitle}>Details</Text>
          <Text style={styles.description}>
            {selectedContent.description || "No description available"}
          </Text>

          {/* Related Videos */}
          <View style={styles.relatedHeader}>
            <Text style={styles.relatedTitle}>Related Videos</Text>
            <Text style={styles.viewAll}>View All</Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {relatedVideos.map((video) => (
              <TouchableOpacity
                key={video.id}
                style={styles.relatedCard}
                onPress={() =>
                  router.replace({
                    pathname: "/garbhaSanskar/contentDetail",
                    params: {
                      contentId: video.id,
                      pregnancyDay,
                      pregnancyWeek,
                    },
                  })
                }
              >
                <Image
                  source={{
                    uri: video.thumbnail?.url || "https://via.placeholder.com/150",
                  }}
                  style={styles.relatedImage}
                />
                <Text numberOfLines={2} style={styles.relatedText}>
                  {video.title}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  backBtn: {
    marginTop: 12,
  marginLeft: 14,
    position: "absolute",
    top: 12,
    left: 14,
    zIndex: 10,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.88)",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  },
  backIcon: {
    fontSize: 24,
    color: "#1F1F1F",
    lineHeight: 28,
    marginTop: -1,
  },
  video: {
    width: "100%",
    height: 260,
    
  },
  contentContainer: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1F1F1F",
  },
  duration: {
    marginTop: 6,
    color: "#6B7280",
    fontSize: 13,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },
  description: {
    lineHeight: 24,
    color: "#444",
    fontSize: 14,
    marginBottom: 8,
  },
  relatedHeader: {
    marginTop: 28,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  relatedTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  viewAll: {
    color: "#20094D",
    fontWeight: "600",
  },
  relatedCard: {
    width: 180,
    marginRight: 12,
    backgroundColor: "#fff",
    borderRadius: 14,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#EFEFEF",
  },
  relatedImage: {
    width: "100%",
    height: 120,
  },
  relatedText: {
    padding: 10,
    fontSize: 13,
    fontWeight: "500",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});