import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Todo } from './components/Todo/Todo';
import { Logis } from './components/Login/Login';
import { Home } from './components/Home/Home';

import { HOME, LOGIN, TODOLIST } from './routes/paths';
import { AuthProvider } from './context/contextAuth';
import { PublicRoutes } from './components/routes/PublicRoutes';
import { PrivateRoutes } from './components/routes/PrivateRoutes';


function App() {

  return (
    <main className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* rutas publicas */}
            <Route path='/' element={<PublicRoutes />}>
              <Route path={HOME} element={<Home />} />
              <Route path={LOGIN} element={<Logis />} />
            </Route>
            {/* rutas privadas */}
            <Route path={TODOLIST} element={<PrivateRoutes />}>
              <Route index element={<Todo />} />
            </Route>

          </Routes>
        </BrowserRouter>
      </AuthProvider>

    </main>
  );
}

export default App;
