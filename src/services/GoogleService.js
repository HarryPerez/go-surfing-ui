import axios from "axios";

const BACKEND_URL = "http://localhost:5000/api/v1";

export const login = async () => axios.get(`${BACKEND_URL}/login/google`);
