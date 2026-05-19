import Header from "./Header"

const Login = () => {
  return (
    <div className="relative h-screen w-screen">
      <Header/>
      <div className="size-full absolute top-0 left-0 right-0 bottom-0 -z-10">
        <img src="https://assets.nflxext.com/ffe/siteui/vlv3/77c412a9-62ea-48a0-a5ee-466e11e851d5/web/IN-en-20260511-TRIFECTA-perspective_f0af4f75-4cc5-42bd-b0c5-2b65b8b50e03_large.jpg" alt="" />
      </div>
      <div className="z-10 flex items-center justify-center size-full max-w-md mx-auto">
        
        <div className="bg-black/80 p-8 rounded-md">
          <h1 className="text-4xl font-bold text-white mb-4">Sign in</h1>
          <input type="text" placeholder="Email or phone number" className="w-full p-3 mb-4 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-600"/>
          <input type="password" placeholder="Password" className="w-full p-3 mb-4 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-600"/>
          <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 w-full rounded">
            Sign In
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login