import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';

import './App.css';
import Navbar from './components/Navbar';
import Modals from './components/modals/Modals';
import useDarkMode from './hooks/useDarkMode';
import ToDoPage from './pages/ToDoPage';
import Weather from './pages/Weather';

function App() {
  const {isDark} = useDarkMode();

  return (
    <div className={`${isDark? "dark":"light"}`}>
      <div className="bg-main-bg dark:bg-main-dark-bg text-slate-900 dark:text-slate-100 h-screen w-screen">
        <Navbar />
        <Routes>
          <Route path='/' element={<ToDoPage/>} />
          <Route path='/weather' element={<Weather/>} />
        </Routes>
        <>
          <Modals />
          <Toaster />
        </>
      </div>
    </div>
  );
}

export default App;
