import axios from "axios";
import { API_URL } from "../config";

async function getHeaders() {
  const token = await localStorage.getItem("jwt");
  console.log("1", token);
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
