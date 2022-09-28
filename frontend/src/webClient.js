import axios from "axios"


const LOCAL_SERVER_URI = "http://localhost:3000/"

export const MESSAGE_CODES={
  OK:"ok", 
  ERROR: "error",
}


export const axiosInstance = axios.create({
  baseURL: LOCAL_SERVER_URI,
 // withCredentials:true,
  responseType:"json",
  timeout: 1000,
});


