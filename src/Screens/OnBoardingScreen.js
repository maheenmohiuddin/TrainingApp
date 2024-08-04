import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Image,
  StatusBar
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, onboardingData } from "../utills/Constants";
import { setValue } from "../utills/asyncStorage";
const { width, height } = Dimensions.get("window");

export default function OnBoardingScreen({ navigation }) {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const renderDots = () => {
    return (
      <View style={styles.dotContainer}>
        {onboardingData.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, currentIndex === index && styles.activeDot]}
          />
        ))}
      </View>
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image
        source={item?.image}
        style={{ height: "75%", width, resizeMode: "contain" }}
      />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      flatListRef.current.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleSkip = () => {
    flatListRef.current.scrollToIndex({
      index: onboardingData.length - 1,
      animated: true,
    });
    setCurrentIndex(onboardingData.length - 1);
  };

  const handleGetStarted = () => {
      navigation.replace("login"); // Navigate to Home screen or any other screen
      setValue('isOnboarded','true')
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <FlatList
        ref={flatListRef}
        contentContainerStyle={{
          height: height * 0.75,
          // backgroundColor: "grey",
        }}
        keyExtractor={(item) => item.key}
        data={onboardingData}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
      />
      {/* <Footer /> */}
      {renderDots()}

      <View style={styles.buttonContainer}>
        {currentIndex < onboardingData.length - 1 ? (
          <>
            <TouchableOpacity
              onPress={handleSkip}
              style={[
                styles.button,
                {
                  borderColor: COLORS.textColor,
                  borderWidth: 2,
                  backgroundColor: "transparent",
                },
              ]}
            >
              <Text
                style={[
                  styles.buttonText,
                  {
                    color: "white",
                  },
                ]}
              >
                Skip
              </Text>
            </TouchableOpacity>
            <View style={{ width: 10 }} />
            <TouchableOpacity onPress={handleNext} style={styles.button}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity onPress={handleGetStarted} style={styles.button}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
  },
  itemContainer: {
    width: width,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.textColor,
  },
  description: {
    fontSize: 16,
    width: "95%",
    marginTop: 10,
    textAlign: "center",
    color: COLORS.textColor,
  },
  dotContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 160,
  },
  dot: {
    height: 4,
    width: 10,
    backgroundColor: "grey",
    marginHorizontal: 3,
    marginTop: 20,
    borderRadius: 2,
  },
  activeDot: {
    backgroundColor: COLORS.textColor,
    width: 30,
  },
  buttonContainer: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginBottom: 20,
    justifyContent: "space-between",

    // position: "absolute",
    // bottom: 40,
  },
  button: {
    flex: 1,
    height: 50,
    borderRadius: 5,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 15,
  },
});
