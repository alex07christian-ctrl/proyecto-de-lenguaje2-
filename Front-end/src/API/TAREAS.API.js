import axios from 'axios'

const tareasapi = axios.create({
    baseURL:"http://localhost:8000/tareas/api/v1/tareas/"
});

export const leertareas = () => tareasapi.get("/");
export const leertareaUnica = (id) => tareasapi.get(`/${id}/`); 
export const creartarea = (tareas) => tareasapi.post("/", tareas);
export const borrartarea = (id) => tareasapi.delete(`/${id}/`);
export const editartarea = (id, tareas) => tareasapi.put(`/${id}/`,tareas);

const nominaapi = axios.create({
    baseURL:"http://localhost:8000/tareas/api/v1/nomina/"
});

export const leernomina = () => nominaapi.get("/");
export const crearnomina = (nomina) => nominaapi.post("/", nomina);
export const leernominaUnica = (id) => nominaapi.get(`/${id}/`); 
export const borrarnomina = (id) => nominaapi.delete(`/${id}/`);
export const editarnomina = (id, nomina) => nominaapi.put(`/${id}/`, nomina);

export const loginContrasenaMaestra = (password) => 
    axios.post("http://localhost:8000/tareas/api/v1/auth/login/", { password });

export const configurarContrasenaMaestra = (password) => 
    axios.post("http://localhost:8000/tareas/api/v1/auth/setup/", { password });