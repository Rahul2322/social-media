import './rightbar.css'
import { Users } from "../../../dummyData";
import Online from '../online/Online'
import axios from 'axios';
import { useState ,useEffect,useContext} from 'react';
import {Link} from 'react-router-dom';
import { AuthContext } from "../../content/AuthContext";
import {Add,Remove} from '@mui/icons-material'




export default function Rightbar({ user }) {
  const PF = import.meta.env.VITE_PUBLIC_FOLDER;
  const [friends,setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(
    currentUser.followings.includes(user?.id)
  );

  useEffect(() => {
  console.log(user,'user')
    const getFriends = async()=>{
      try {
       const res =  await axios.get("http://localhost:8000/api/user/friends/" + user._id);
       setFriends(res.data.data.message)
      } catch (error) {
        console.log(error)
      }
    }
    getFriends();
   
  }, [user])

  const handleClick = async()=>{
    try {
      if (followed) {
        await axios.put(`/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(`/users/${user._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      setFollowed(!followed);
    } catch (err) {
    }
  }
  
  const HomeRightBar = () => {
    return <>
   
      <div className="birthdayContainer">
        <img src={PF+"gift.png"} alt="" className='birthdayImg' />
        <span className="birthdayText">
          <b>Rahul</b> and <b>20 other friends</b> have a birthday today.
        </span>
      </div>
      <img src={PF+"ad.png"} alt="" className='rightbarAd' />
      <h4 className="rightbarTitle">Online Friends</h4>
      <ul className="rightbarFriendList">
        {Users.map((u) => (
          <Online key={u.id} user={u} />
        ))}

      </ul>
    </>
  }

  const ProfileRightBar = () => {
    return <>
     {currentUser.username !== user.username && (
      <button className='rightbarFollowButton' onClick={handleClick}>
         {followed ? "Unfollow" : "Follow"}
         {followed ? <Remove /> : <Add />}
      </button>
    )}
      <h4 className="rightbarTitle">User Information</h4>
      <div className="rightbarInfo">
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">
            City:
          </span>
          <span className="rightbarInfoValue">{user.city}</span>
        </div>
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">
            From
          </span>
          <span className="rightbarInfoValue">{user.from}</span>
        </div>
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">
            Relationship:
          </span>
          <span className="rightbarInfoValue">{user.relationship === 1 ? 'Single' : user.relationship === 2 ? "Married" : "-"}</span>
        </div>
      </div>
      <h4 className="rightbarTitle">Users Friends</h4>
      <div className="rightbarFollowings">
     {friends.map(friend=>(
      <Link to={`/profile/${friend.username}`} key={friend._id} style={{textDecoration:"none"}}>
       <div className="rightbarFollowing" >
       <img src={friend.profilePicture ? PF+friend.profilePicture : PF+'person/noAvatar.png'} alt="" className="rightbarFollowingImg" />
       <span className="rightbarFollowingName">{friend.username}</span>
     </div>
      </Link>
     ))}
      </div>
    </>
  }
  return (
    <div className='rightbarContainer'>
      <div className="rightbarWrapper">
        {user ? <ProfileRightBar /> : <HomeRightBar />}
      </div>

    </div>
  )
}
