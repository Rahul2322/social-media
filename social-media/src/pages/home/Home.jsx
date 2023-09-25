import './Home.css'
import TopBar from '../../components/TopBar'
import Sidebar from '../../components/sidebar/sidebar'
import Feed from '../../components/feed/feed'
import Rightbar from '../../components/rightbar/rightbar'
import Profile from '../profile/Profile'

export default function Home() {
    return (
        <>
        <TopBar />
        <div className="homeContainer">
          <Sidebar />
          <Feed/>
          <Rightbar/>
        </div>
        {/* <Profile/> */}
      </>


    )
}
