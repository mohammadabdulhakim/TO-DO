import './App.css';
import useDarkMode from './hooks/useDarkMode';

function App() {
  const {isDark} = useDarkMode();

  return (
    <div className={`${isDark? "dark":"light"}`}>
      <div className="bg-main-bg dark:bg-main-dark-bg h-screen w-screen">
        
      </div>
    </div>
  );
}

export default App;
