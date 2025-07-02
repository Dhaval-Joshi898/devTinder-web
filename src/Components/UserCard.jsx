import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import BASE_URL from "../utils/constants";
import { removeFeed } from "../utils/feedSlice";

const UserCard = ({ userData }) => {
  // const feed=useSelector((store)=>store?.feed)
  const dispatch=useDispatch()
  const { _id,firstName, lastName, age, gender, photoUrl, about, skills } =
    userData;
    console.log("ABOUT ins card"+about)
    console.log("ABOUT ins card"+gender)

    const handleSend=async (status,_id)=>{
      // /send/interested/685c01a09710077cb223c995
      const response= await axios.post(BASE_URL+"/request/send/"+status+"/"+_id,{},{withCredentials:true})
      dispatch(removeFeed(_id))

    }

  return (
    <div className="card bg-base-300 w-96 shadow-xl">
      <figure className="h-72 bg-base-200 flex items-center justify-center">
        {/* <figure className="h-72 overflow-hidden "> */}
        <img src={photoUrl} alt="user img" className="h-full  object-contain" />
      </figure>

      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        
        {age && gender && <p>{age + "," + gender}</p>}
        <p>{about}</p>
        {skills && <p>{"Best in:" + " " + skills.join(", ")}</p>}
        <div className="card-actions justify-center my-3">
          <button className="btn btn-primary mx-2" onClick={()=>handleSend("ignored",_id)}>Ignore</button>
          <button className="btn btn-secondary" onClick={()=>handleSend("interested",_id)}>Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
