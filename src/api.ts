import axios from "axios";

const api = axios.create({
  baseURL: "https://restcountries.com/v3.1",
});

export const getData = async (signal: AbortSignal) => {
  try {
    const respose = await api.get("/region/europe", { signal });
    console.log(respose);
    return respose.data;
  } catch (error: any) {
    throw Error(error.message);
  }
};
