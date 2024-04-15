import axios from "axios";

const API_URL = "http://localhost:5000/api/items"; // Asegúrate de usar la URL correcta de tu API

class ApiService {
  getItems() {
    return axios.get(API_URL);
  }

  getItem(id) {
    return axios.get(`${API_URL}/${id}`);
  }

  addItem(item) {
    return axios.post(API_URL, item);
  }

  updateItem(id, item) {
    return axios.put(`${API_URL}/${id}`, item);
  }

  deleteItem(id) {
    return axios.delete(`${API_URL}/${id}`);
  }

  enviarDatos(datos) {
    return axios.post(API_URL, datos);
  }
}

export default new ApiService();
