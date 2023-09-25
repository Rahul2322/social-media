import { Link } from 'react-router-dom'
import './topbar.css'
import { Search,Person,Chat,Notifications } from '@mui/icons-material'
import {AuthContext} from '../content/AuthContext'
import { useContext } from 'react'

export default function TopBar() {
    const {user} = useContext(AuthContext);
    const PF = import.meta.env.VITE_PUBLIC_FOLDER;
    return (
        <div className="topbarContainer">
            <div className="leftTopBar">
                <Link to="/" style={{textDecoration:"none"}}>
                <span className='logo'>Rahul Social</span>
                </Link>
            </div>
            <div className="centerTopBar">
                <div className='searchbar'>
                    <Search className='searchIcon'/>
                    <input placeholder='search for friend,post or' className='searchInput' />
                </div>
            </div>
            <div className="rightTopBar">
                <div className='topbarLinks'>
                    <span className='topbarLink'>Homepage</span>
                    <span className='topbarLink'>Timeline</span>
                </div>
                <div className='topbarIcons'>
                    <div className="topbarIconItem">
                        <Person/>
                        <span className="topbarIconBadge">1</span>
                    </div>
                    <div className="topbarIconItem">
                        <Chat/>
                        <span className="topbarIconBadge">1</span>
                    </div>
                    <div className="topbarIconItem">
                        <Notifications/>
                        <span className="topbarIconBadge">1</span>
                    </div>
                </div>
                    <Link to={`/profile/${user.username}`}>
                    <img src={user.profilePicture ? `${PF}/person/${user.profilePicture}` :`${PF}/person/noAvatar.png`} alt='' className='topbarImg' />
                    </Link>
            </div>

        </div>
    )
}
