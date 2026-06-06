import { LISTA_TAREAS } from '../COMPONENTES/LISTA_TAREAS'
import { Link } from 'react-router-dom'

export function INVENTARIO() {
  return(
    <div><Link to="/L"
    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-500 mb-4 inline-block">añadir</Link>
    <LISTA_TAREAS />
    </div>
);}


