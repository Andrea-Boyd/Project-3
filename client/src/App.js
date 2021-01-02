import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import Chat from './components/Chat/Chat';
import SignUp from './pages/SignUp';


function App() {
  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <Chat />
        <SignUp/>
      </div>
    </div>
  );
}

export default App;
