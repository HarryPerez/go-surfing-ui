import axios from "axios";

export const login = async () =>
  axios.get(`${process.env.REACT_APP_BACKEND_URL}/login/google`);
