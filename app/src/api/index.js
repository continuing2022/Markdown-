import request from "./request";

export const getNotes=()=>{
  return request.get("/notes");
}

export const getNoteById = (id) => {
  return request.get(`/notes/${id}`);
}

export const createNote = (data) => {
  return request.post("/notes", data);
};

export const updateNote = (id, data) => {
  return request.put(`/notes/${id}`, data);
};

export const deleteNote = (id) => {
  return request.delete(`/notes/${id}`);
};