import axios from "axios";
import { API_URL } from "../config";
import jwtManager from "../services/jwtManager";

async function getHeaders() {
  const token = jwtManager.getToken();
  console.log("header token", token);
  const payloadHeader = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  return payloadHeader;
}

export async function getResource(url) {
  const payloadHeader = await getHeaders();
  console.log(payloadHeader);
  try {
    const res = await axios.get(`${API_URL}/${url}`, payloadHeader);
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

export async function postResource(url, payload) {
  const payloadHeader = await getHeaders();
  try {
    const res = await axios.post(`${API_URL}/${url}`, payloadHeader, payload);
    return res.data;
  } catch (err) {
    console.log(err);
  }
}
