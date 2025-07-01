import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import BASE_URL from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [showUpdatedMessage, setShowUpdatedMessage] = useState(false);
  const dispatch = useDispatch();

  const handleSaveClick = async() => {
    const response = await axios.patch(
      BASE_URL + "/profile/edit",
      { firstName, lastName, age, gender, about, photoUrl },
      { withCredentials: true }
    );
    console.log(response)
    dispatch(addUser(response?.data?.data));
    setShowUpdatedMessage(true)
    
    setTimeout(()=>{
        setShowUpdatedMessage(false)
    },5000)
  };
  return (
    <div className="flex flex-col-reverse lg:flex-row justify-center items-start mt-10 gap-10 px-4">

  {/* ✅ UserCard: Shows on top in mobile, right in desktop */}
  <div className="w-full lg:w-[30%] mt-28  flex justify-center h-full sticky top-36 ">
    <div className="h-80 ">
      <UserCard userData={{ firstName, lastName, age, gender, photoUrl, about }} />
    </div>
  </div>

  {/* ✅ Form: Shows below on mobile, left in desktop */}
  <div className="w-full lg:w-[40%] mt-24 flex justify-center overflow-hidden">
    <div className="card bg-base-300 w-full max-w-md shadow-sm">
      <div className="card-body">
        <h2 className="card-title justify-center text-2xl mb-2">Profile</h2>

        <fieldset className="fieldset">
          <legend className="fieldset-legend text-sm font-normal">First Name</legend>
          <input
            type="text"
            value={firstName}
            className="input mb-1"
            placeholder="Enter your first name"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend text-sm font-normal">Last Name</legend>
          <input
            type="text"
            value={lastName}
            className="input mb-1"
            placeholder="Enter your last name"
            onChange={(e) => setLastName(e.target.value)}
          />
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend text-sm font-normal">Age</legend>
          <input
            type="text"
            value={age}
            className="input mb-1"
            placeholder="Enter your age"
            onChange={(e) => setAge(e.target.value)}
          />
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend text-sm font-normal">Photo URL</legend>
          <input
            type="text"
            value={photoUrl}
            className="input mb-1"
            placeholder="Enter photo URL"
            onChange={(e) => setPhotoUrl(e.target.value)}
          />
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend text-sm font-normal">Gender</legend>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="select select-bordered w-[95%] mb-1"
          >
            <option value="">Select your gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend text-sm font-normal">About</legend>
          <textarea
            type="text"
            value={about}
            className="input mb-1"
            placeholder="Enter about"
            onChange={(e) => setAbout(e.target.value)}
          />
        </fieldset>

        <div className="card-actions justify-center p-2">
          <button className="btn btn-primary px-9" onClick={handleSaveClick}>
            Save
          </button>
        </div>
      </div>
    </div>
  </div>

  {/* ✅ Toast message */}
  {showUpdatedMessage && (
    <div className="toast toast-top toast-center">
      <div className="alert alert-success">
        <span className="text-gray-700 font-semibold">
          Information Updated Successfully
        </span>
      </div>
    </div>
  )}
</div>

//     <div className="  flex justify-center mt-10">
//       <div className="flex justify-center mx-10 ">
//         <div className="card bg-base-300 w-96 shadow-sm ">
//           <div className="card-body">
//             <h2 className="card-title justify-center text-2xl mb-2">Profile</h2>
//             <fieldset className="fieldset">
//               <legend className="fieldset-legend text-sm font-normal">
//                 First Name
//               </legend>
//               <input
//                 type="text"
//                 value={firstName}
//                 className="input mb-1"
//                 placeholder="Enter your email"
//                 onChange={(e) => setFirstName(e.target.value)}
//               />
//             </fieldset>
//             <fieldset className="fieldset">
//               <legend className="fieldset-legend text-sm font-normal">
//                 Last Name
//               </legend>
//               <input
//                 type="text"
//                 value={lastName}
//                 className="input mb-1"
//                 placeholder="Enter your password"
//                 onChange={(e) => setLastName(e.target.value)}
//               />
//             </fieldset>
//             <fieldset className="fieldset">
//               <legend className="fieldset-legend text-sm font-normal">
//                 Age
//               </legend>
//               <input
//                 type="text"
//                 value={age}
//                 className="input mb-1"
//                 placeholder="Enter your password"
//                 onChange={(e) => setAge(e.target.value)}
//               />
//             </fieldset>
//             <fieldset className="fieldset">
//               <legend className="fieldset-legend text-sm font-normal">
//                 Photo Url
//               </legend>
//               <input
//                 type="text"
//                 value={photoUrl}
//                 className="input mb-1"
//                 placeholder="Enter your password"
//                 onChange={(e) => setPhotoUrl(e.target.value)}
//               />
//             </fieldset>
//             <fieldset className="fieldset">
//               <legend className="fieldset-legend text-sm font-normal">
//                 Gender
//               </legend>
//               <select
//                 value={gender}
//                 onChange={(e) => setGender(e.target.value)}
//                 className="select select-bordered w-{95%} mb-1"
//               >
//                 <option value="">Select your gender</option>
//                 <option value="Male">Male</option>
//                 <option value="Female">Female</option>
//                 <option value="Other">Other</option>
//               </select>
//             </fieldset>
//             <fieldset className="fieldset">
//               <legend className="fieldset-legend text-sm font-normal">
//                 About
//               </legend>
//               <textarea
//                 type="text"
//                 value={about}
//                 className="input mb-1"
//                 placeholder="Enter about"
//                 onChange={(e) => setAbout(e.target.value)}
//               />
//             </fieldset>
//             {/* <p className="text-red-500">{errorMessage}</p> */}
//             <div className="card-actions justify-center p-2 ">
//               <button
//                 className="btn btn-primary px-9"
//                 onClick={handleSaveClick}
//               >
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="h-80 mt-14 ml-20">
//         <UserCard userData={{ firstName, lastName, age, gender, photoUrl ,about}} />
//         {/* This line means:"Pass a prop called userData into UserCard, and set its value to a new object that contains these 5 variables from local state." */}
//         {/* same as this const userData = {firstName: firstName,lastName: lastName,age: age,gender: gender,photoUrl: photoUrl}; */}
//       </div>

//       {showUpdatedMessage &&
//       <div className="toast toast-top toast-center">
//         <div className="alert alert-success">
//           <span className="text-gray-700 font-semibold">Information Updated Successfully</span>
//         </div>
//       </div>
// }
//     </div>
  );
};

export default EditProfile;
