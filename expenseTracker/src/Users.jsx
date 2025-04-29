// import React, {useState} from "react"
// import {auth } from "./firebase.js";
// import {createUserWithEmailAndPassword,signInWithEmailAndPassword} from "firebase/auth";



// const Users=()=>{

//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState('');
//     const [isRegistering, setIsRegistering] = useState(false);
//     const [Username, setUserName] = useState("")


//     const handleAuth= async(e)=>{
//         e.preventDefault();
//          try{
//         if(isRegistering){
//             await createUserWithEmailAndPassword(auth,email, password);
//             alert("user created")
//         }else{
//             await signInWithEmailAndPassword(auth, email,password)
//         }}catch{
//             console.error("authentication error")
//         }
//     }

//     return (
//         <>
//            <h1>{isRegistering ? "Register" : "Login" } </h1>
//            <form onSubmit= {handleAuth}>
//            <input type="input" 
//                 className="input validator" 
//                 value={Username}
//                 onChange={(e)=>{
//                     setUserName(e.target.value)
//                 }}
//                 required placeholder="Username" 
//                 pattern="[A-Za-z][A-Za-z0-9\-]*" minlength="3" maxlength="30" title="Only letters, numbers or dash" />
//                 <p className="validator-hint">
//                 Must be 3 to 30 characters
//                 <br/>containing only letters, numbers or dash
//                 </p>
//            <input className="input validator" 
//            type="email" value={email}
//            onChange={(e)=>{
//             setEmail(e.target.value)
//         }}
//            required placeholder="email@site.com" />
//            <input type="password" className="input validator"
//             required placeholder="Password" minlength="8" 
//             value={password}
//             onChange={(e)=>{
//                 setPassword(e.target.value)
//             }}
//                 pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
//                 title="Must be more than 8 characters, including number, lowercase letter, uppercase letter" />
//                 <p className="validator-hint">
//                 Must be more than 8 characters, including
//                 <br/>At least one number
//                 <br/>At least one lowercase letter
//                 <br/>At least one uppercase letter
//                 </p>
            



//            </form>
//            <button className= "btn btn-wide" type="submit"
//            onClick={()=>setIsRegistering(!isRegistering)}>
//             {isRegistering ? "Login" :" SignUp"}
            
//             </button>

        
        
//         </>
//     )
// }

// export default Users;