import { useSelector } from "react-redux";

const UserCard = ({ userData }) => {
  // const feed=useSelector((store)=>store?.feed)
  const { firstName, lastName, age, gender, photoUrl, about, skills } =
    userData;
    console.log("ABOUT ins card"+about)
    console.log("ABOUT ins card"+gender)

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
          <button className="btn btn-primary mx-2">Ignore</button>
          <button className="btn btn-secondary">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
