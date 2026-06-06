import { LISTA_MONINA } from "../COMPONENTES/LISTA_TAREAS"
import { Link } from 'react-router-dom'

export function NOMINA() {
  return (
    <div className="p-4">
        <Link 
            to="/n_añadir" 
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-500 mb-4 inline-block"
        >
            Añadir Empleado
        </Link>
        <LISTA_MONINA /> 
    </div>
  )
}