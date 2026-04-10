import axios from "axios";

export const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

export const getTopCharacters = async () => {
  const response = await api.get("top-characters/");
  return response.data;
};

export const getGenderDistribution = async () => {
  const response = await api.get("gender-distribution/");
  return response.data;
};

export const getStatusDistribution = async () => {
  const response = await api.get("status-distribution/");
  return response.data;
};

export const getTopEpisodes = async () => {
  const response = await api.get("top-episodes/");
  return response.data;
};
