"use client";

import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { ChevronLeft, X } from "lucide-react-native";
import { useState } from "react";
import {
  Dimensions,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

interface GalleryImage {
  id: string;
  uri: string;
  size?: "small" | "large";
}

type CollageLayout = "grid" | "masonry" | "single";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function BumpyGallery() {
  const router = useRouter();
  const [photos, setPhotos] = useState<GalleryImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [collageLayout, setCollageLayout] = useState<CollageLayout>("grid");

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      selectionLimit: 9,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      const newImages: GalleryImage[] = result.assets.map((asset, index) => {
        // Automatic collage arrangement: make every 3rd image large
        const isLarge = index % 3 === 0 && result.assets.length > 2;
        return {
          id: `${Date.now()}-${index}`,
          uri: asset.uri,
          size: isLarge ? "large" : "small",
        };
      });
      setPhotos([...photos, ...newImages]);
    }
  };

  const renderGridLayout = () => (
    <View style={styles.gridContainer}>
      {photos.map((image) => (
        <Pressable
          key={image.id}
          style={[
            styles.gridItem,
            image.size === "large" && styles.gridItemLarge,
          ]}
          onPress={() => setSelectedImage(image)}
        >
          <Image source={{ uri: image.uri }} style={styles.gridImage} />
        </Pressable>
      ))}
    </View>
  );

  const renderMasonryLayout = () => (
    <View style={styles.masonryContainer}>
      <View style={styles.masonryColumn}>
        {photos
          .filter((_, i) => i % 2 === 0)
          .map((image) => (
            <Pressable
              key={image.id}
              style={[
                styles.masonryItem,
                image.size === "large" && styles.masonryItemLarge,
              ]}
              onPress={() => setSelectedImage(image)}
            >
              <Image source={{ uri: image.uri }} style={styles.masonryImage} />
            </Pressable>
          ))}
      </View>
      <View style={styles.masonryColumn}>
        {photos
          .filter((_, i) => i % 2 === 1)
          .map((image) => (
            <Pressable
              key={image.id}
              style={[
                styles.masonryItem,
                image.size === "large" && styles.masonryItemLarge,
              ]}
              onPress={() => setSelectedImage(image)}
            >
              <Image source={{ uri: image.uri }} style={styles.masonryImage} />
            </Pressable>
          ))}
      </View>
    </View>
  );

  const renderSingleLayout = () => (
    <View style={styles.singleContainer}>
      {photos.map((image) => (
        <Pressable
          key={image.id}
          style={styles.singleItem}
          onPress={() => setSelectedImage(image)}
        >
          <Image source={{ uri: image.uri }} style={styles.singleImage} />
        </Pressable>
      ))}
    </View>
  );

  const renderGallery = () => {
    switch (collageLayout) {
      case "grid":
        return renderGridLayout();
      case "masonry":
        return renderMasonryLayout();
      case "single":
        return renderSingleLayout();
      default:
        return renderGridLayout();
    }
  };

  return (
    <SafeAreaProvider style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bumpy Gallery</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.infoCard}>
          <Text style={styles.infoText}>Capture and store your pregnancy journey photos</Text>
        </View>

        {/* Collage Layout Options */}
        <View style={styles.layoutOptions}>
          <TouchableOpacity
            style={[
              styles.layoutButton,
              collageLayout === "grid" && styles.layoutButtonActive,
            ]}
            onPress={() => setCollageLayout("grid")}
          >
            <Text
              style={[
                styles.layoutButtonText,
                collageLayout === "grid" && styles.layoutButtonTextActive,
              ]}
            >
              Grid
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.layoutButton,
              collageLayout === "masonry" && styles.layoutButtonActive,
            ]}
            onPress={() => setCollageLayout("masonry")}
          >
            <Text
              style={[
                styles.layoutButtonText,
                collageLayout === "masonry" && styles.layoutButtonTextActive,
              ]}
            >
              Masonry
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.layoutButton,
              collageLayout === "single" && styles.layoutButtonActive,
            ]}
            onPress={() => setCollageLayout("single")}
          >
            <Text
              style={[
                styles.layoutButtonText,
                collageLayout === "single" && styles.layoutButtonTextActive,
              ]}
            >
              Single
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.addPhotoButton} onPress={pickImage}>
          <Text style={styles.addPhotoButtonText}>+ Add Photo</Text>
        </TouchableOpacity>

        {photos.length > 0 ? (
          renderGallery()
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No photos yet</Text>
            <Text style={styles.emptyStateSubtext}>Start capturing your pregnancy journey</Text>
          </View>
        )}
      </ScrollView>

      {/* Image Modal */}
      <Modal
        visible={!!selectedImage}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedImage(null)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setSelectedImage(null)}>
          {selectedImage && (
            <View style={styles.modalContent}>
              <Image source={{ uri: selectedImage.uri }} style={styles.modalImage} resizeMode="contain" />
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setSelectedImage(null)}
              >
                <X size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          )}
        </Pressable>
      </Modal>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F6F7FB" },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, paddingVertical: 12, backgroundColor: "#ffffff" },
  backButton: { width: 24, height: 24, justifyContent: "center", alignItems: "center" },
  headerTitle: { fontSize: 18, fontWeight: "600", color: "#000" },
  headerSpacer: { width: 24 },
  contentContainer: { padding: 16 },
  infoCard: { backgroundColor: "#ffffff", borderRadius: 12, padding: 16, marginBottom: 16 },
  infoText: { fontSize: 14, color: "#6b7280", lineHeight: 20 },
  layoutOptions: { flexDirection: "row", gap: 8, marginBottom: 16 },
  layoutButton: { flex: 1, paddingVertical: 12, borderRadius: 8, backgroundColor: "#f3f4f6", alignItems: "center" },
  layoutButtonActive: { backgroundColor: "#20094D" },
  layoutButtonText: { fontSize: 14, fontWeight: "600", color: "#1f2937" },
  layoutButtonTextActive: { color: "#ffffff" },
  addPhotoButton: { backgroundColor: "#20094D", borderRadius: 12, paddingVertical: 16, alignItems: "center", marginBottom: 16 },
  addPhotoButtonText: { fontSize: 16, fontWeight: "600", color: "#ffffff" },
  emptyState: { backgroundColor: "#ffffff", borderRadius: 12, padding: 48, alignItems: "center" },
  emptyStateText: { fontSize: 18, fontWeight: "600", color: "#6b7280", marginBottom: 8 },
  emptyStateSubtext: { fontSize: 14, color: "#9ca3af" },
  // Grid Layout
  gridContainer: { flexDirection: "row", flexWrap: "wrap", marginHorizontal: -4 },
  gridItem: { width: (SCREEN_WIDTH - 32) / 3 - 8, height: (SCREEN_WIDTH - 32) / 3 - 8, margin: 4, borderRadius: 8, overflow: "hidden" },
  gridItemLarge: { width: (SCREEN_WIDTH - 32) / 3 * 2 - 4, height: (SCREEN_WIDTH - 32) / 3 * 2 - 4 },
  gridImage: { width: "100%", height: "100%", resizeMode: "cover" },
  // Masonry Layout
  masonryContainer: { flexDirection: "row", gap: 8 },
  masonryColumn: { flex: 1, gap: 8 },
  masonryItem: { borderRadius: 8, overflow: "hidden", backgroundColor: "#f3f4f6" },
  masonryItemLarge: { aspectRatio: 1 },
  masonryImage: { width: "100%", height: 150, resizeMode: "cover" },
  // Single Layout
  singleContainer: { gap: 16 },
  singleItem: { borderRadius: 12, overflow: "hidden" },
  singleImage: { width: "100%", height: 250, resizeMode: "cover" },
  // Modal
  modalOverlay: { flex: 1, backgroundColor: "rgba(0, 0, 0, 0.8)", justifyContent: "center", alignItems: "center" },
  modalContent: { width: "90%", maxHeight: "80%", position: "relative" },
  modalImage: { width: "100%", height: "100%" },
  closeButton: { position: "absolute", top: 16, right: 16, backgroundColor: "rgba(255, 255, 255, 0.2)", borderRadius: 20, padding: 8 },
});
