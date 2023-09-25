import './closeFriend.css'

export default function CloseFriend({user}) {
  const PF = import.meta.env.VITE_PUBLIC_FOLDER;
  return (
    <li className="sidebarFriend">
    {/* <img src="/assets/person/2.jpeg" alt="" className="sidebarFriendImg" /> */}
    <img src={user.profilePicture ? `${PF}person/${user.profilePicture}` :  `${PF}/person/noAvatar.png`} alt='' className='topbarImg' />
    <span className="sidebarFriendName">
        {user.username}
    </span>
</li>
  )
}
