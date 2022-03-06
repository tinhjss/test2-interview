import type { NextPage } from 'next'
import Head from 'next/head'
import { useContext, useState } from 'react'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import firebase from '../database/index'
import { useRouter } from 'next/router'
import { GlobalContext } from '../contexts/GlobalContext';

const Login: NextPage = () => {
	const [email, setEmail] = useState("")
  const { setUser } = useContext(GlobalContext)
	const [password, setPassword] = useState("")
	const router = useRouter()

	const handleSubmitRegister = () => {
		const auth = getAuth();
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in 
				const user = userCredential.user;
        if(user){
          setUser(user)
          router.push('/')
        }
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				// ..
			});
	}
	return (
		<div>
			<Head>
				<title>Login</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
      <div style={{display: 'flex', height: "100vh"}}>
        <div className='container-form'>
          <h1>Login</h1>
          <div>email</div>
          <input type="email" onChange={(e: any) => setEmail(e.target.value)} />
          <div>password</div>
          <input type="password" onChange={(e: any) => setPassword(e.target.value)} />
          <div>
            <button onClick={handleSubmitRegister}>Submit</button>
          </div>
          <div style={{fontSize: 12, marginTop: 10, cursor: 'pointer'}} onClick={()=>router.push('register')}>
            Register
          </div>
        </div>
      </div>
			
		</div>

	)
}

export default Login