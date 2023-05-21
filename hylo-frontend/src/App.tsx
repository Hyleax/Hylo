import './App.css'
import axios from 'axios'
import {Route, Routes } from 'react-router-dom'
import UserContextProvider from './assets/context/userContextProvider'
import PostContextProvider from './assets/context/PostContextProvider'
import HomeLayout from './assets/Layouts/HomeLayout'
import ThreadLayout from './assets/Layouts/ThreadLayout'
import LoginPage from './assets/pages/LoginPage/LoginPage'
import RegisterPage from './assets/pages/RegisterPage/RegisterPage'
import ProfilePage from './assets/pages/ProfilePage'
import CreatePostPage from './assets/pages/CreatePostPage/CreatePostPage'
import DiscussionPage from './assets/pages/DiscussionPage/DiscussionPage'
import InstructorApplicationPage from './assets/pages/InstructorApplicationPage/InstructorApplicationPage'
import ForgetPasswordPage from './assets/pages/ForgetPasswordPage/ForgetPasswordPage'
import ChangePasswordPage from './assets/pages/ChangePasswordPage/ChangePasswordPage'

axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
axios.defaults.withCredentials = true;

function App() {
  return (
    <div className="App">
      <Routes>

          {/* login and register routes */}
          <Route path='/' element={<LoginPage/>} />
          <Route path='/register' element={<RegisterPage/>} />
          <Route path='/forgot-password' element={<ForgetPasswordPage/>}/>
          <Route path='/change-password' element={<ChangePasswordPage/>}/>

            <Route path='/home' element={
            <UserContextProvider>
              <HomeLayout/>
            </UserContextProvider>
            }>

              <Route path='profile' element={<ProfilePage/>}/>
              <Route path='bookmarked' element={<ProfilePage/>}/>
              <Route path='instructor-application' element={<InstructorApplicationPage/>}/>
              
              {/* all following pages have the sidebar */}
              <Route path='thread' element = {
              <PostContextProvider>
                <ThreadLayout/>
              </PostContextProvider>
              }>
                <Route path='view' element={<DiscussionPage/>}/>
                <Route path='view/:id' element={<DiscussionPage/>}/>
                <Route path='create' element={<CreatePostPage/>}/>
              </Route>
            </Route>
      </Routes>
    </div>
  )
}

export default App
