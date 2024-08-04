import AsyncStorage from "@react-native-async-storage/async-storage";

export const getValue = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (error) {
    console.error("Error getting item:", error);
  }
};

export const setValue = async (key, value) => {
  try {
   
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.error("Error setting item:", error);
  }
};

export const removeValue = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing item:", error);
  }
};
