import useAuth from "../hooks/useAuth";
import { getValue, setValue } from "../utills/asyncStorage";
import React, { createContext, useContext, useState, useEffect } from "react";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favoriteIDList, setFavoriteIDList] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const storedFavorites = await getValue(`favorites-${user.uid}`);
        if (storedFavorites) {
          setFavoriteIDList(JSON.parse(storedFavorites));
        }
      } catch (error) {
        console.error("Error loading favorites:", error);
      }
    };

    if (user) {
      loadFavorites();
    }
  }, [user]);

  const onFavorite = async (id) => {
    try {
      const updatedFavorites = favoriteIDList ? [...favoriteIDList, id] : [id];
      setFavoriteIDList(updatedFavorites);
      await setValue(`favorites-${user.uid}`, JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error("Error saving favorite:", error);
    }
  };

  const onRemoveFavorite = async (id) => {
    try {
      const updatedFavorites = favoriteIDList.filter((item) => item !== id);
      setFavoriteIDList(updatedFavorites);
      await setValue(`favorites-${user.uid}`, JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  const ifExists =(id) => {
    return favoriteIDList.includes(id);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favoriteIDList,
        onFavorite,
        onRemoveFavorite,
        ifExists,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
