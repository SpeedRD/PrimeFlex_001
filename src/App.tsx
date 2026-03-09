import { Routes, Route, Navigate } from 'react-router-dom';
import { TaskContextProvider } from './TaskDashboard/TaskContext';
import { TaskDashboard } from './TaskDashboard/TaskDashboard';
import { AppLayout } from './components/AppLayout/AppLayout';
import { TaskDetail } from './TaskDashboard/TaskDetail/TaskDetail';

function App() {
  return (
    // El Provider envuelve todas las rutas para que compartan el mismo estado
    <AppLayout>
      <TaskContextProvider>
      <Routes>
        {/* Redirigir la raíz al dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* Ruta principal: lista de tareas */}
        <Route path="/dashboard" element={<TaskDashboard />} />

        {/* Ruta de detalle: muestra una tarea por su id */}
        <Route path="/dashboard/:idTask" element={<TaskDetail />} />
      </Routes>
    </TaskContextProvider>
    </AppLayout>
  );
}

export default App;