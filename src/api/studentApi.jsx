import axios from "axios";
const API_URL = "http://localhost:3000/students";
export const getStudents = () => axios.get(API_URL);
export const createStudent = (data) => axios.post(API_URL, data);
export const removeStudent = (id) => axios.delete(`${API_URL}/${id}`);
