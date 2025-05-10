import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8080/api",
});

export const fetchLists = () => api.get("/lists").then((r) => r.data);
export const createList = (body) =>
  api.post("/lists", body).then((r) => r.data);
export const updateList = (id, body) =>
  api.put(`/lists/${id}`, body).then((r) => r.data);
export const deleteList = (id) => api.delete(`/lists/${id}`);

export const fetchItems = (listId) =>
  api.get(`/lists/${listId}/items`).then((r) => r.data);
export const createItem = (listId, body) =>
  api.post(`/lists/${listId}/items`, body).then((r) => r.data);
export const updateItem = (id, body) =>
  api.patch(`/items/${id}`, body).then((r) => r.data);
export const deleteItem = (id) => api.delete(`/items/${id}`);
export const suggestDescriptions = (q) =>
  api.get(`/items/suggestions`, { params: { q } }).then((res) => res.data);
