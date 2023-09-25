import { useContext, useRef, useState } from 'react'
import './Share.css'
import { PermMedia,Label,Room,EmojiEmotions } from '@mui/icons-material'
import { AuthContext } from '../../content/AuthContext'
import axios from 'axios';


export default function Share() {
    const {user} = useContext(AuthContext);
    const [file,setFile] = useState(null);
    const desc = useRef();
    const PF = import.meta.env.VITE_PUBLIC_FOLDER;

    const handleClick = async(e)=>{
        e.preventDefault();
        try {
            const post = {
                userId:user._id,
                desc:desc.current.value
            }
            if(file){
                const data = new FormData();
                const filename = Date.now() + file.name
                data.append('name',filename);
                data.append('file',file);
                post.img = filename;
                try {
                    await axios.post('http://localhost:8000/api/upload',data)
                } catch (error) {
                    console.log(error)
                }
            }
            await axios.post("http://localhost:8000/api/post",post);
            window.location.reload();
        } catch (error) {
            console.log(error)
        }
    }
    return (
      <div className="share">
          <div className="shareWrapper">
            <div className="shareTop">
                <img className='shareProfileImg' src={user.profilePicture? PF+user.profilePicture : PF+"person/noAvatar.png"} alt="" />
                <input placeholder={`What's in your mind ${user.username} ?`} className='shareInput' ref={desc}/>
            </div>
            <hr className="shareHr" />
            <form className="shareBottom" onSubmit={handleClick}>
                <div className="shareOptions">
                    <label htmlFor='file' className="shareOption">
                        <PermMedia htmlColor='tomato' className='shareIcon' />
                        <span className='shareOptionText'>Photo Or Video</span>
                        <input type='file' id='file' accept='.png,.jpeg,.jpg' style={{display:"none"}} onChange={(e)=>setFile(e.target.files[0])} />
                    </label>
                    <div className="shareOption">
                        <Label htmlColor='blue' className='shareIcon' />
                        <span className='shareOptionText'>Photo Or Video</span>
                    </div>
                    <div className="shareOption">
                        <Room htmlColor='green' className='shareIcon' />
                        <span className='shareOptionText'>Photo Or Video</span>
                    </div>
                    <div className="shareOption">
                        <EmojiEmotions htmlColor='goldenrod' className='shareIcon' />
                        <span className='shareOptionText'>Photo Or Video</span>
                    </div>
                </div>
                <button type='submit' className="shareButton">Share</button>
            </form>

        </div>
      </div>
    )
}
