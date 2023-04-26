import './App.css'
import {Route, Routes } from 'react-router-dom'
import LoginPage from './assets/pages/LoginPage/LoginPage'
import RegisterPage from './assets/pages/RegisterPage/RegisterPage'
import ProfilePage from './assets/pages/ProfilePage'
import axios from 'axios'
import DiscussionPage from './assets/pages/DiscussionPage/DiscussionPage'
import HomeLayout from './assets/Layouts/HomeLayout'
import ThreadLayout from './assets/Layouts/ThreadLayout'
import CreatePostPage from './assets/pages/CreatePostPage/CreatePostPage'
import UserContextProvider from './assets/context/userContextProvider'
import PostContextProvider from './assets/context/PostContextProvider'

axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
axios.defaults.withCredentials = true;

function App() {
  return (
    <div className="App">
      <Routes>

          {/* login and register routes */}
          <Route path='/' element={<LoginPage/>} />
          <Route path='/register' element={<RegisterPage/>} />

          
            <Route path='/home' element={
            <UserContextProvider>
              <HomeLayout/>
            </UserContextProvider>
            }>

              <Route path='profile' element={<ProfilePage/>}/>

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
