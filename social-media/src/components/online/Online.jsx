import './online.css'

export default function Online({user}) {
  const PF = import.meta.env.VITE_PUBLIC_FOLDER;
  return (
    <li className="rightbarFriend">
    <div className="rightbarProfileImgContainer">
        <img src={user.profilePicture ? PF+user.profilePicture : PF+'person/noAvatar.png'} alt="" className="rightbarProfileImg" />
        <span className="rightbarOnline"></span>
    </div>
    <span className='rightbarusername'>{user.username}</span>
</li>
  )
}
