import axios from "axios";

const api = axios.create({
  baseURL: "https://restcountries.com/v3.1",
});

export enum SearchType {
  Region = "region",
  Name = "name",
  Code = "alpha",
}

export const getData = async (
  signal: AbortSignal,
  type: SearchType,
  param: string
) => {
  try {
    const respose = await api.get(`/${type}/${param}`, { signal });
    return respose.data;
  } catch (error: any) {
    throw Error(error.message);
  }
};
