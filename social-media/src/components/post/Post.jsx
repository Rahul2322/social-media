import './post.css'
import { MoreVert} from '@mui/icons-material'
import {Users} from '../../../dummyData'
import {useState,useEffect, useContext} from 'react';
import axios from 'axios';
import {format} from 'timeago.js'
import { Link } from 'react-router-dom';
import { AuthContext } from '../../content/AuthContext';

export default function Post({post}) {
const [like,setLike] = useState(post.likes.length);
const [isLiked,setIsLiked] = useState(false);
const [user,setUser] = useState([]);
const {user:currentUser} = useContext(AuthContext)

const PF = import.meta.env.VITE_PUBLIC_FOLDER;
const handleLike = async()=>{
     try {
        await axios.put(`http://localhost:8000/api/post/${post._id}/like`,{userId:currentUser._id})
     } catch (error) {
        console.log(error)
     }

    setLike(isLiked ? like - 1 : like + 1)
    setIsLiked(!isLiked)
}

useEffect(()=>{
   const fetchUser = async()=>{
    const user = await axios.get(`http://localhost:8000/api/user?userId=${post.userId}`);   
     setUser(user.data.data.message)
   }
   fetchUser()
},[post.userId])

useEffect(() => {
  setIsLiked(post.likes.includes(currentUser._id))
}, [post.likes,currentUser._id])

  return (
    <div className='post'>
        <div className="postWrapper">
            <div className="postTop">
                <div className="postTopLeft">
                <Link to={`profile/${user.username}`}>
                <img className='postProfileImg' src={user.profilePicture ? `${PF}${user.profilePicture}` : `${PF}person/noAvatar.png` } alt="" />
                </Link>
                 <span className='postusername'>{user.username}</span>
                 <span className='postuserdate'>{format(post.createdAt)}</span>
                </div>
                <div className="postTopRight">
                 <MoreVert className='postIcon'/>
                </div>
            </div>
            <div className="postCenter">
                <span className="postText">
                    {post?.desc}
                </span>
                <img src={PF+post.img} alt=""  className='postImg'/>
            </div>
            <div className="postBottom">
                <div className="postBottomLeft">
                    <img src={`${PF}like.png`} alt="" className='likeIcon' onClick={handleLike}/>
                    <img src={`${PF}heart.png`} alt="" className='likeIcon' onClick={handleLike}/>
                    <span className="postLikeCounter">{like}  people like it</span>
                </div>
                <div className="postBottomRight">
                 <span className="postCommentText">{post.comment} comments</span>
                </div>
            </div>
        </div>
    </div>
  )
}
