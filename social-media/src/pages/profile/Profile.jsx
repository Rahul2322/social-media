import './profile.css'
import TopBar from '../../components/TopBar'
import Sidebar from '../../components/sidebar/sidebar'
import Feed from '../../components/feed/feed'
import Rightbar from '../../components/rightbar/rightbar'
import {useState,useEffect} from 'react'
import { useParams } from "react-router";
import axios from 'axios'


export default function Profile() {
  const PF = import.meta.env.VITE_PUBLIC_FOLDER;
  const username = useParams().username;
  const [user,setUser] = useState([]);
 

  useEffect(() => {
   const fetchUser = async()=>{
    const user = await axios.get(`http://localhost:8000/api/user?username=${username}`);
    console.log('res.data.data.message',user.data.data.message)
    setUser(user.data.data.message)
   }
   fetchUser()
  }, [username])
  return (
    <>
      <TopBar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img src={user.coverPicture ? `${PF}person/${user.coverPicture}` : `${PF}person/noCover.png`} alt="" className="profileCoverImg" />
              <img src={user.profilePicture ? `${PF}person/${user.profilePicture}` :  `${PF}person/noAvatar.png`} alt="" className="profileUserImg" />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={user.username}/>
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  )
}
