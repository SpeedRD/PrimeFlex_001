import { Routes, Route, Navigate } from 'react-router-dom';
import { TaskContextProvider } from './TaskDashboard/TaskContext';
import { TaskDashboard } from './TaskDashboard/TaskDashboard';
import { AppLayout } from './components/AppLayout/AppLayout';
import { TaskDetail } from './TaskDashboard/TaskDetail/TaskDetail';


function App() {
  return (
    <TaskContextProvider>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<TaskDashboard />} />
          <Route path="/dashboard/:idTask" element={<TaskDetail />} />
        </Routes>
      </AppLayout>
    </TaskContextProvider>
  );
}

export default App;