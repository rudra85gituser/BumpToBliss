"use client";

import React from "react";
import { StyleSheet, TouchableOpacity, ImageBackground, ImageSourcePropType, View } from "react-native";

interface FeatureCardProps {
  image: ImageSourcePropType;
  onPress: () => void;
}

export default function FeatureCard({ image, onPress }: FeatureCardProps) {
  return (
    <TouchableOpacity style={styles.cardContainer} onPress={onPress} activeOpacity={0.85}>
      <ImageBackground source={image} style={styles.imageBackground} imageStyle={styles.imageStyle}>
        <View style={styles.overlay} />
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 16,
    overflow: "hidden",
    minHeight: 160,
    backgroundColor: "#fff",
  },
  imageBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageStyle: {
    resizeMode: "cover",
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(34, 33, 33, 0.1)",
  },
});
