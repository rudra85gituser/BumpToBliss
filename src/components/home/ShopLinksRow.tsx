import { Star } from "lucide-react-native";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

import pillowProductImage from "@/src/assets/home/photos/pillow-product.png";

export type ShopProduct = {
  id: string;
  name: string;
  price: string;
  rating: number;
};

type ShopLinksRowProps = {
  products: ShopProduct[];
};

/**
 * Presentational product row. Product data passes through from the Home
 * screen.
 */
export function ShopLinksRow({ products }: ShopLinksRowProps) {
  return (
    <View>
      <Text style={styles.heading}>Shop Links</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.row}
      >
        {products.map((product) => (
          <View key={product.id} style={styles.card}>
            <Image
              source={pillowProductImage}
              style={styles.image}
              resizeMode="cover"
            />
            <View style={styles.footer}>
              <View style={styles.footerRow}>
                <Text style={styles.name}>{product.name}</Text>
                <Text style={styles.price}>{product.price}</Text>
              </View>
              <View style={styles.ratingRow}>
                <Star size={12} color="#FFB770" fill="#FFB770" />
                <Text style={styles.rating}>{product.rating}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 14,
    fontWeight: "500",
    color: "#373737",
    marginBottom: 12,
  },
  row: {
    gap: 12,
  },
  card: {
    width: 150,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.12)",
    overflow: "hidden",
  },
  image: {
    width: 150,
    height: 112,
  },
  footer: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 13,
    paddingVertical: 9,
    gap: 8,
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontSize: 12,
    fontWeight: "500",
    color: "#373737",
  },
  price: {
    fontSize: 12,
    fontWeight: "600",
    color: "#4CA2A3",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  rating: {
    fontSize: 10,
    fontWeight: "400",
    color: "#919191",
  },
});
