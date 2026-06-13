import { useState } from "react"
import Header from "./Header"

const Login = () => {
  const [isSignInForm,setIsSignInForm] = useState(true)
  const toggleForm = () => {
    setIsSignInForm(!isSignInForm)
  }
  return (
    <div className="relative h-screen w-screen">
      <Header/>
      <div className="size-full absolute top-0 left-0 right-0 bottom-0 -z-10">
        <img src="https://assets.nflxext.com/ffe/siteui/vlv3/77c412a9-62ea-48a0-a5ee-466e11e851d5/web/IN-en-20260511-TRIFECTA-perspective_f0af4f75-4cc5-42bd-b0c5-2b65b8b50e03_large.jpg" alt="" />
      </div>
      <div className="z-10 flex items-center justify-center size-full max-w-md mx-auto">
        <div className="bg-black/80 px-8 py-12 rounded-md">
          <h1 className="text-4xl font-bold text-white mb-4">
            {isSignInForm ? 'Sign In' : 'Sign Up'}
          </h1>
          {!isSignInForm ? (
            <input type="text" placeholder="Full Name" className="w-full p-3 mb-4 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-600"/>
          ) : null}
          <input type="text" placeholder="Email or phone number" className="w-full p-3 mb-4 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-600"/>
          <input type="password" placeholder="Password" className="w-full p-3 mb-4 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-600"/>
          <button className="bg-red-600 cursor-pointer hover:bg-red-700 text-white font-bold py-2 px-4 w-full rounded">
            {isSignInForm ? 'Sign In' : 'Sign Up'}
          </button>
          <p className="text-white mt-10">
            {isSignInForm ? 'New to Netflix?' : 'Already have an account?'}{' '}
            <button onClick={toggleForm} className="text-white hover:underline cursor-pointer transition-all">
              {isSignInForm ? 'Sign up now' : 'Sign in now'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login