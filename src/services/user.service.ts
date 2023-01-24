import axios from "axios";
import authHeader from "./auth-header";

export const API_URL = 'http://127.0.0.1:5000/api'

export const getPublicContent = () => {
  return axios.get(API_URL + 'all');
}

export const getUserBoard = () => {
  return axios.get(API_URL + 'user', { headers: authHeader() });
}

export const getModeratorBoard = () => {
  return axios.get(API_URL + 'mod', { headers: authHeader() });
}

export const getAdminBoard = () => {
  return axios.get(API_URL + 'admin', { headers: authHeader() });
}