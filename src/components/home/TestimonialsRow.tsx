import { LinearGradient } from "expo-linear-gradient";
import { Star, User } from "lucide-react-native";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  rating: number;
};

type TestimonialsRowProps = {
  testimonials: Testimonial[];
};

/**
 * Presentational testimonial row. Content passes through from the Home
 * screen. Exact Figma CSS for this section wasn't provided yet, so sizing
 * and the gradient are approximated from the reference screenshot.
 */
export function TestimonialsRow({ testimonials }: TestimonialsRowProps) {
  return (
    <View>
      <Text style={styles.heading}>Testimonials</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.row}
      >
        {testimonials.map((testimonial) => (
          <LinearGradient
            key={testimonial.id}
            colors={["#D9E8FF", "#F0E4FF"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.card}
          >
            <Text style={styles.quote}>{`"${testimonial.quote}"`}</Text>
            <View style={styles.footer}>
              <View style={styles.avatar}>
                <User size={16} color="#9CA3AF" />
              </View>
              <View style={styles.footerText}>
                <Text style={styles.name}>{testimonial.name}</Text>
                <View style={styles.stars}>
                  {Array.from({ length: testimonial.rating }).map((_, index) => (
                    <Star key={index} size={12} color="#FFB770" fill="#FFB770" />
                  ))}
                </View>
              </View>
            </View>
          </LinearGradient>
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
    width: 300,
    borderRadius: 16,
    padding: 16,
  },
  quote: {
    fontSize: 12,
    fontStyle: "italic",
    color: "#373737",
    lineHeight: 18,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 16,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  footerText: {
    gap: 2,
  },
  name: {
    fontSize: 12,
    fontWeight: "500",
    color: "#292D32",
  },
  stars: {
    flexDirection: "row",
    gap: 2,
  },
});
