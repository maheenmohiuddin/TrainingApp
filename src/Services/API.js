import { API_KEY, BASE_URL } from "../config";
import axios from "axios";

const searchMovieEndPoint = `${BASE_URL}/search/movie?api_key=${API_KEY}`;

export const GET = async (url) => {
  const API_URL = `${BASE_URL}${url}?api_key=${API_KEY}`;

  let response = await fetch(API_URL, { method: "GET" });    //using fetch
  response = response.json();
  return response;
};

const apiCall = async (endpoint, param) => {   //using axios
  const options = {
    method: "GET",
    url: endpoint,
    params: param ? param : {},
  };
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const searchMovie = (params) => {
  return apiCall(searchMovieEndPoint, params);
};
