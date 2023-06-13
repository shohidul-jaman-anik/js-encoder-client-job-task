import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddApi from './Pages/Dashboard/AddApi/AddApi';
import LoadApi from './Pages/Dashboard/LoadApi/LoadApi';
import UpdateUser from './Pages/Dashboard/UpdateUser/UpdateUser';
import Login from './Pages/Form/Login/Login';
import SignUP from './Pages/Form/SignUp/SignUP';
import UpdateProfile from './Pages/Form/UpdateProfile/UpdateProfile';
import Header from './Pages/Header/Header';


function App() {
  return (
    <div >
      <Header></Header>
      <Routes>
        <Route path='/' element={
          <LoadApi></LoadApi>
        }></Route>
        <Route path='/addApi' element={
          <AddApi></AddApi>
        }></Route>
        <Route path='/updateUser/:id' element={<UpdateUser></UpdateUser>}></Route>
        <Route path='/updateProfile' element={<UpdateProfile></UpdateProfile>}></Route>

        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/SignUp' element={<SignUP></SignUP>}></Route>

      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
