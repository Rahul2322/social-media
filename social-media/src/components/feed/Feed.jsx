import Post from '../post/post'
import Share from '../share/Share'
import './feed.css'
// import {Posts} from '../../../dummyData'
import { useState,useEffect, useContext } from 'react'
import axios from 'axios'
import {AuthContext} from '../../content/AuthContext'

export default function Feed({username}) {
  const [posts,setPosts] = useState([]);
  const {user} = useContext(AuthContext)
  useEffect(()=>{
    const fetchPost = async()=>{
      try {
        const res = username ? await axios.get('http://localhost:8000/api/post/profile/'+ username) :   await axios.get('http://localhost:8000/api/post/timeline/'+user._id);
      setPosts(res.data.data.message.sort((p1,p2)=>new Date(p2.createdAt) - new Date(p1.createdAt)))
      } catch (error) {
        console.log(error)
      }
    }
    fetchPost()
  },[username,user._id])
  return (
    <div className='feedContainer'>
        <div className="feedWrapper">
           {username === user.username && <Share/>}
           {posts.map((p)=>(
             <Post key={p._id} post={p}/>
           ))}
            
        </div>
    </div>
  )
}
