// import { useState } from "react";
// import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
// import { Link } from "react-router-dom";
// import {
//   getAuth,
//   createUserWithEmailAndPassword,
//   updateProfile,
// } from "firebase/auth";
// import {
//   getStorage,
//   ref,
//   uploadBytesResumable,
//   getDownloadURL,
// } from "firebase/storage";

// import { v4 as uuidv4 } from "uuid";
// import { addDoc, collection, serverTimestamp } from "firebase/firestore";

// import logo from "../assets/favicon.png";
// import { db } from "../firebase";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// export default function SignUp() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     about: "",
//     position: "",
//     location: "",
//     date:"",
//     phone:"",
//     images: {},
//   });
//   const { name, email, password, about, position, instagram, linkedin, location, date, phone,images} = formData;
//   const navigate = useNavigate();
//   function onChange(e) {
//     let boolean = null;
//     if (e.target.value === "true") {
//       boolean = true;
//     }
//     if (e.target.value === "false") {
//       boolean = false;
//     }
//     if (e.target.files) {
//       setFormData((prevState) => ({
//         ...prevState,
//         images: e.target.files,
//       }));
//     }
//     if (!e.target.files) {
//       setFormData((prevState) => ({
//         ...prevState,
//         [e.target.id]: boolean ?? e.target.value,
//       }));
//     }
//   }
//   async function onSubmit(e) {
//     e.preventDefault();
    
//     try {
//       const auth = getAuth();
//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );

//       updateProfile(auth.currentUser, {
//         displayName: name,
//       });
//       const user = userCredential.user;
//       async function storeImage(image) {
//         return new Promise((resolve, reject) => {
//           const storage = getStorage();
//           const filename = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;
//           const storageRef = ref(storage, filename);
//           const uploadTask = uploadBytesResumable(storageRef, image);
//           uploadTask.on(
//             "state_changed",
//             (snapshot) => {
//               // Observe state change events such as progress, pause, and resume
//               // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
//               const progress =
//                 (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//               console.log("Upload is " + progress + "% done");
//               switch (snapshot.state) {
//                 case "paused":
//                   toast.info("Upload is paused");
//                   break;
//                 case "running":
//                   toast.info("Upload is running");
//                   break;
//                 default:
//                   break;  
//               }
//             },
//             (error) => {
//               // Handle unsuccessful uploads
//               reject(error);
//             },
//             () => {
//               // Handle successful uploads on complete
//               // For instance, get the download URL: https://firebasestorage.googleapis.com/...
//               getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//                 resolve(downloadURL);
//               });
//             }
//           );
//         });
//       }
//       const imgUrls = await Promise.all(
//         [...images].map((image) => storeImage(image))
//       ).catch((error) => {
        
//         toast.error("Images not uploaded");
//         return;
//       });
//       const formDataCopy = { ...formData,images:imgUrls,
        
//         timestamp: serverTimestamp(),
//         userRef: auth.currentUser.uid,
//    };
//       delete formDataCopy.password;
//       const docRef = await addDoc(collection(db, "users"), formDataCopy);
//       toast.success("Sign up was successful");
//       navigate("/profile");
//     } catch (error) {
//       toast.error(error.message);
//     }
//   }
//   return (
//     <section className="w-full">
//       <div className="lg:flex">
//         <div className="lg:w-1/2 xl:max-w-screen-sm">
//           <div className="py-6 bg-pink-100 lg:bg-white flex justify-between lg:justify-start lg:px-12">
//             <div className="cursor-pointer flex items-center">
//               <div>
//                 <img
//                   src={logo}
//                   alt="logo"
//                   className="w-10 h-10 object-contain"
//                 />
//               </div>
//               <div className="text-2xl text-pink-800 tracking-wide ml-2 font-semibold">
//                 BID OUT
//               </div>
//             </div>
//           </div>
//           <div className="py-2 px-4 sm:px-16 md:px-32 lg:px-12 lg:mt-1 xl:px-24 xl:max-w-2xl">
//             <h2
//               className="text-center text-2xl text-pink-900 font-display font-semibold lg:text-left xl:text-3xl
//                     xl:text-bold"
//             >
//               Sign Up
//             </h2>
//             <div className="mt-6">
//               <form onSubmit={onSubmit}>
//                 <div className="flex flex-row gap-2 w-full items-center justify-between">
//                 <div className="w-1/2">
//                   <div className="text-xs font-bold text-gray-700 tracking-wide px-4 py-2">
//                     Name
//                   </div>
//                   <input
//                     className="w-full text-sm border-b border-gray-300 focus:outline-none focus:border-pink-500 rounded-full py-2 px-4"
//                     id="name"
//                     type="text"
//                     value={name}
//                     onChange={onChange}
//                     required
//                     placeholder="Enter your name"
//                   />
//                 </div>
//                 <div className="w-1/2">
//                   <div className="text-xs font-bold text-gray-700 tracking-wide px-2 py-2">
//                     Email Address
//                   </div>
//                   <input
//                     className="w-full text-sm border-b border-gray-300 focus:outline-none focus:border-pink-500 rounded-full py-2 px-4"
//                     id="email"
//                     type="email"
//                     value={email}
//                     onChange={onChange}
//                     required
//                     placeholder="email@gmail.com"
//                   />
//                 </div>
//                 </div>
//                 <div className="flex flex-row gap-2 w-full items-center justify-between mt-2">
//                 <div className="w-1/2">
//                   <div className="flex justify-between items-center px-2 py-2">
//                     <div className="text-xs font-bold text-gray-700 tracking-wide">
//                       Profile Photo
//                     </div>
                   
//                   </div>
//                   <div className="w-full">
//                   <input
//             type="file"
//             onChange={onChange}
//             id="images"
//             accept=".jpg,.png,.jpeg,.gif"
            
//             required
//             className="w-full text-sm border-b border-gray-300 focus:outline-none focus:border-pink-500 rounded-full py-2 px-4"
//           />
//                   </div>
//                 </div>
//                 <div className="w-1/2">
//                   <div className="flex justify-between items-center px-2 py-2">
//                     <div className="text-xs font-bold text-gray-700 tracking-wide">
//                       Password
//                     </div>
                   
//                   </div>
//                   <div className="relative flex w-full">
//                     <input
//                       className="w-full text-sm py-2 px-4 border-b border-gray-300 focus:outline-none focus:border-pink-500 rounded-full"
//                       id="password"
//                       type={showPassword ? "text" : "password"}
//                       placeholder="Password"
//                       value={password}
//                       onChange={onChange}
//                       required
//                     />
//                     {showPassword ? (
//                       <AiFillEyeInvisible
//                         className="absolute right-4 top-2 text-xl cursor-pointer"
//                         onClick={() =>
//                           setShowPassword((prevState) => !prevState)
//                         }
//                       />
//                     ) : (
//                       <AiFillEye
//                         className="absolute right-4 top-2 text-xl cursor-pointer"
//                         onClick={() =>
//                           setShowPassword((prevState) => !prevState)
//                         }
//                       />
//                     )}
//                   </div>
//                 </div>
//                 </div>
//                 <div className="mt-2">
//                   <div className="text-xs font-bold text-gray-700 tracking-wide px-2 py-2">
//                     About
//                   </div>
//                   <textarea
//                     className="w-full text-sm border-b border-gray-300 focus:outline-none focus:border-pink-500 rounded-full py-2 px-4"
//                     id="about"
//                     type="text"
//                     value={about}
//                     row={5}
//                     onChange={onChange}
//                     required
//                     placeholder="Tell us bout Yourselsf and your fields of Intrests."
//                   />
//                 </div>
//                 <div className="flex flex-row gap-2 w-full items-center justify-between mt-2">
//                 <div className="w-1/2">
//                   <div className="text-xs font-bold text-gray-700 tracking-wide px-2 py-2">
//                     Position 
//                   </div>
//                   <select
//                     className="w-full text-sm border-b border-gray-300 focus:outline-none focus:border-pink-500 rounded-full py-2 px-4"
//                     id="position"
//                     type="text"
//                     value={position}
//                     onChange={onChange}
//                     required
//                     placeholder="Select an option"
//                   >
//                     <option value="">Select an option</option>
//                     <option value="Seller">Seller</option>
//                     <option value="Buyer">Buyer</option>
//                     </select>
//                 </div>
//                 <div className="w-1/2">
//                   <div className="text-xs font-bold text-gray-700 tracking-wide px-2 py-2">
//                     Location
//                   </div>
//                   <input
//                     className="w-full text-sm border-b border-gray-300 focus:outline-none focus:border-pink-500 rounded-full py-2 px-4"
//                     id="location"
//                     type="text"
//                     value={location}
//                     onChange={onChange}
//                     required
//                     placeholder="City,State"
//                   />
//                 </div>
//                 </div>
//                 <div className="flex flex-row gap-2 w-full items-center justify-between mt-2">
//                 <div className="w-1/2">
//                   <div className="text-xs font-bold text-gray-700 tracking-wide px-2 py-2">
//                     Date Of Birth
//                   </div>
//                   <input
//                     className="w-full text-sm border-b border-gray-300 focus:outline-none focus:border-pink-500 rounded-full py-2 px-4"
//                     id="date"
//                     type="date"
//                     value={date}
//                     onChange={onChange}
//                     required
//                     placeholder="Dec 22, 2003"
//                   />
//                 </div>
//                 <div className="w-1/2">
//                   <div className="text-xs font-bold text-gray-700 tracking-wide px-2 py-2">
//                    Phone Number
//                   </div>
//                   <input
//                     className="w-full text-sm border-b border-gray-300 focus:outline-none focus:border-pink-500 rounded-full py-2 px-4"
//                     id="phone"
//                     type="tel"
//                     value={phone}
//                     onChange={onChange}
//                     required
//                     placeholder="+91 9416XXXXXX"
//                   />
//                 </div>
//                 </div>
//                 <div className="flex flex-row gap-2 w-full items-center justify-between mt-2">
//                 </div>
//                 <div className="mt-2">
//                   <button
//                     className="bg-pink-500 text-gray-100 p-2 w-full rounded-full tracking-wide
//                                 font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-black-600
//                                 shadow-lg"
//                   >
//                     Sign Up
//                   </button>
//                 </div>
                
//               </form>
//             </div>
//           </div>
//         </div>
//         <div className="hidden lg:flex items-center justify-center bg-pink-100 flex-1 h-screen">
//           <div className="max-w-xs transform duration-200 hover:scale-110 cursor-pointer">
//             <svg
//               className="w-5/6 mx-auto"
//               xmlns="http://www.w3.org/2000/svg"
//               id="f080dbb7-9b2b-439b-a118-60b91c514f72"
//               data-name="Layer 1"
//               viewBox="0 0 528.71721 699.76785"
//             >
//               <title>Login</title>
//               <rect y="17.06342" width="444" height="657" fill="#535461" />
//               <polygon
//                 points="323 691.063 0 674.063 0 17.063 323 0.063 323 691.063"
//                 fill="#7f9cf5"
//               />
//               <circle cx="296" cy="377.06342" r="4" fill="#535461" />
//               <polygon
//                 points="296 377.66 298.773 382.463 301.545 387.265 296 387.265 290.455 387.265 293.227 382.463 296 377.66"
//                 fill="#535461"
//               />
//               <polygon
//                 points="337 691.063 317.217 691 318 0.063 337 0.063 337 691.063"
//                 fill="#7f9cf5"
//               />
//               <g opacity="0.1">
//                 <polygon
//                   points="337.217 691 317.217 691 318.217 0 337.217 0 337.217 691"
//                   fill="#fff"
//                 />
//               </g>
//               <circle cx="296" cy="348.06342" r="13" opacity="0.1" />
//               <circle cx="296" cy="346.06342" r="13" fill="#535461" />
//               <line
//                 x1="52.81943"
//                 y1="16.10799"
//                 x2="52.81943"
//                 y2="677.15616"
//                 fill="none"
//                 stroke="#000"
//                 stroke-miterlimit="10"
//                 stroke-width="2"
//                 opacity="0.1"
//               />
//               <line
//                 x1="109.81943"
//                 y1="12.10799"
//                 x2="109.81943"
//                 y2="679.15616"
//                 fill="none"
//                 stroke="#000"
//                 stroke-miterlimit="10"
//                 stroke-width="2"
//                 opacity="0.1"
//               />
//               <line
//                 x1="166.81943"
//                 y1="9.10799"
//                 x2="166.81943"
//                 y2="683"
//                 fill="none"
//                 stroke="#000"
//                 stroke-miterlimit="10"
//                 stroke-width="2"
//                 opacity="0.1"
//               />
//               <line
//                 x1="223.81943"
//                 y1="6.10799"
//                 x2="223.81943"
//                 y2="687.15616"
//                 fill="none"
//                 stroke="#000"
//                 stroke-miterlimit="10"
//                 stroke-width="2"
//                 opacity="0.1"
//               />
//               <line
//                 x1="280.81943"
//                 y1="3.10799"
//                 x2="280.81943"
//                 y2="688"
//                 fill="none"
//                 stroke="#000"
//                 stroke-miterlimit="10"
//                 stroke-width="2"
//                 opacity="0.1"
//               />
//               <ellipse
//                 cx="463.21721"
//                 cy="95.32341"
//                 rx="39.5"
//                 ry="37"
//                 fill="#2f2e41"
//               />
//               <path
//                 d="M683.8586,425.93948l-10,14s-48,10-30,25,44-14,44-14l14-18Z"
//                 transform="translate(-335.6414 -100.11607)"
//                 fill="#ffb8b8"
//               />
//               <path
//                 d="M735.8586,266.93948s-13,0-16,18-6,78-6,78-42,55-35,62,15,20,20,18,48-61,48-61Z"
//                 transform="translate(-335.6414 -100.11607)"
//                 fill="#7f9cf5"
//               />
//               <path
//                 d="M735.8586,266.93948s-13,0-16,18-6,78-6,78-42,55-35,62,15,20,20,18,48-61,48-61Z"
//                 transform="translate(-335.6414 -100.11607)"
//                 opacity="0.1"
//               />
//               <path
//                 d="M775.8586,215.93948s-1,39-13,41-8,15-8,15,39,23,65,0l5-12s-18-13-10-31Z"
//                 transform="translate(-335.6414 -100.11607)"
//                 fill="#ffb8b8"
//               />
//               <path
//                 d="M708.8586,455.93948s-59,110-37,144,55,104,60,104,33-14,31-23-32-76-40-82-4-22-3-23,34-54,34-54-1,84,3,97-1,106,4,110,28,11,32,5,16-97,8-118l15-144Z"
//                 transform="translate(-335.6414 -100.11607)"
//                 fill="#2f2e41"
//               />
//               <path
//                 d="M762.8586,722.93948l-25,46s-36,26-11,30,40-6,40-6l22-16v-46Z"
//                 transform="translate(-335.6414 -100.11607)"
//                 fill="#2f2e41"
//               />
//               <path
//                 d="M728.8586,696.93948l13,31s5,13,0,16-19,21-10,23a29.29979,29.29979,0,0,0,5.49538.5463,55.56592,55.56592,0,0,0,40.39768-16.43936l8.10694-8.10694s-27.77007-63.94827-27.385-63.47414S728.8586,696.93948,728.8586,696.93948Z"
//                 transform="translate(-335.6414 -100.11607)"
//                 fill="#2f2e41"
//               />
//               <circle cx="465.21721" cy="105.82341" r="34" fill="#ffb8b8" />
//               <path
//                 d="M820.3586,253.43948l-10.5,10.5s-32,12-47,0c0,0,5.5-11.5,5.5-10.5s-43.5,7.5-47.5,25.5,3,49,3,49-28,132-17,135,114,28,113,9,8-97,8-97l35-67s-5-22-17-29S820.3586,253.43948,820.3586,253.43948Z"
//                 transform="translate(-335.6414 -100.11607)"
//                 fill="#7f9cf5"
//               />
//               <path
//                 d="M775.8586,448.93948l-13,8s-50,34-24,40,41-24,41-24l10-12Z"
//                 transform="translate(-335.6414 -100.11607)"
//                 fill="#ffb8b8"
//               />
//               <path
//                 d="M849.8586,301.93948l9,9s6,84-6,101-67,63-70,60-22-18-18-20,57.18287-57.56942,57.18287-57.56942l-4.18287-77.43058Z"
//                 transform="translate(-335.6414 -100.11607)"
//                 opacity="0.1"
//               />
//               <path
//                 d="M853.8586,298.93948l9,9s6,84-6,101-67,63-70,60-22-18-18-20,57.18287-57.56942,57.18287-57.56942l-4.18287-77.43058Z"
//                 transform="translate(-335.6414 -100.11607)"
//                 fill="#7f9cf5"
//               />
//               <path
//                 d="M786.797,157.64461s-11.5575-4.20273-27.31774,4.72807l8.40546,2.10136s-12.60819,1.05068-14.18421,17.8616h5.77875s-3.67739,14.70955,0,18.91228l2.364-4.4654,6.82943,13.65887,1.576-6.82944,3.15205,1.05069,2.10137-11.03217s5.25341,7.88012,9.45614,8.40546V195.2065s11.5575,13.13352,15.23489,12.60818l-5.25341-7.35477,7.35477,1.576-3.152-5.25341,18.91228,5.25341-4.20273-5.25341,13.13352,4.20273,6.3041,2.6267s8.9308-20.4883-3.67739-34.67251S798.61712,151.60318,786.797,157.64461Z"
//                 transform="translate(-335.6414 -100.11607)"
//                 fill="#2f2e41"
//               />
//             </svg>
//           </div>
//         </div>
//       </div>
//     </section>
    
//   );
// }
