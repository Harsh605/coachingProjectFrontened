import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Home from './Components/Home';
import Layout from './Layout/Layout';
import Contact from './Components/Contact/Contact';
import Courses from './Components/Courses/Courses';
import Register from './Components/Auth/Register';
import Login from './Components/Auth/LogIn';
import AuthLayout from './Layout/Auth';
import { useDispatch, useSelector } from 'react-redux';
import CourseDetails from './Components/Courses/CourseDetails';
import EnrollDetails from './Components/Courses/EnrollDetails';
import ConfirmOrder from './Components/Courses/ConfirmOrder';
import Payment from './Components/Courses/Payment';
import PaymentSuccess from './Components/Courses/PaymentSuccess';
import { loadUser } from './slices/userSlice';
import { useEffect } from 'react';
import Dashboard from './Admin/Pages/Dashboard';
import Users from './Admin/Pages/Users';
import CoursesAdmin from './Admin/Pages/Courses';
import AddCourse from './Admin/Pages/AddCourse';
import PanelLayout from './Layout/PanelLayout';
import SingleUser from './Admin/Pages/SingleUser';
import MyProfile from './Admin/Pages/MyProfile';
import UpdateCourse from './Admin/Pages/UpdateCourse';
import NewCategory from './Admin/Pages/NewCategory';
import Scholarship from './Admin/Pages/Scholarship';
import ProfileUser from './User/ProfileUser';
import ScholarshipUser from './User/ScholarshipUser';
import CourseUser from './User/CourseUser';
import About from './Components/About/About';
import Rewards from './Components/Home/Rewards';
import RewardPage from './Components/Rewards/RewardPage';



const App = () => {
  const dispatch = useDispatch()
  const { isAuthenticated, error, isLoading, userData } = useSelector((state) => state.custom2)

  useEffect(() => {
    dispatch(loadUser())
  }, [])

  useEffect(()=>{
    window.scrollTo(0,0)
  },[])
  return (
    <>
      <Router>
        <Routes>
          <Route></Route>
          <Route exact path="/*" element={<Layout />  }>
            <Route exact path="" element={<Home />} />
            <Route exact path="about" element={<About />} />
            <Route exact path="course" element={<Courses />} />
            <Route exact path="contact" element={<Contact />} />
            <Route exact path="course/:id" element={<CourseDetails />} />
            <Route exact path="course/:id/enroll" element={isAuthenticated ? <EnrollDetails /> : <Navigate to="/login" replace />} />
            <Route exact path="course/:id/enroll/order/confirm" element={isAuthenticated ? <ConfirmOrder /> : <Navigate to="/login" replace />} />
            <Route exact path="course/:id/enroll/order/confirm/payment" element={isAuthenticated ? <Payment />: <Navigate to="/login" replace />} />
            <Route exact path="rewards" element={<RewardPage/>} />

          </Route>
          <Route exact path="/*" element={<AuthLayout userData={userData} />}>
            <Route exact path='register' element={!isAuthenticated ? <Register /> : <Navigate to="/" replace />} />
            <Route exact path='login' element={!isAuthenticated ? <Login /> : <Navigate to="/" replace />} />
            <Route path='paymentsuccess' element={<PaymentSuccess />} />
          </Route>

          {
            userData && userData.role ==="admin" ?
            <Route exact path={`/admin/*`} element={<PanelLayout />}>
              <Route exact path="dashboard" element={<Dashboard />} />
              <Route exact path="users" element={<Users />} />
              <Route exact path="users/:id" element={<SingleUser />} />
              <Route exact path="courses" element={<CoursesAdmin />} />
              <Route exact path="courses/add" element={<AddCourse />} />
              <Route exact path="courses/update/:id" element={<UpdateCourse />} />
              <Route exact path="courses/category/add" element={<NewCategory />} />
              <Route exact path="profile" element={<MyProfile userData={userData}/>} />
              <Route exact path="scholarship" element={<Scholarship/>} />
            </Route>
            : 
            <Route exact path={`/user/*`} element={<PanelLayout />}>
            <Route exact path="courses" element={<CourseUser />} />
            <Route exact path="profile" element={<ProfileUser userData={userData}/>} />
            <Route exact path="scholarship" element={<ScholarshipUser />} />
          
          </Route>
          }

        </Routes>
      </Router>
    </>
  );
}

export default App;
