import axios from "axios";
import { API_URL } from "../config";

const payloadHeader = {
  headers: {
    "Content-Type": "application/json",
  },
};

export async function loginUser(payload) {
  try {
    const res = await axios.post(
      `${API_URL}/users/login`,
      payload,
      payloadHeader
    );
    if (res.data.accessToken) {
      return res.data;
    }
  } catch (err) {
    console.log(err);
  }
}

export async function registerUser(payload) {
  try {
    const res = await axios.post(
      `${API_URL}/users/register`,
      payload,
      payloadHeader
    );
    if (res.data.accessToken) {
      return res.data;
    }
  } catch (err) {
    console.log(err);
  }
}
