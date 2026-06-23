import { useRef, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import Header from "./Header";
import { validateData } from "../utils/validate";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { DEFAULT_PROFILE_IMAGE } from "../utils/constants";

const Login = () => {
  const dispatch = useDispatch();
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const toggleForm = () => {
    setIsSignInForm(!isSignInForm);
    setErrorMessage(null);
  };
  const emailRef = useRef(null);
  const nameRef = useRef(null);
  const passwordRef = useRef(null);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const hasErrorMessage = validateData(
      emailRef.current.value,
      passwordRef.current.value,
    );
    setErrorMessage(hasErrorMessage);
    if (hasErrorMessage) return;

    if (isSignInForm) {
      signInWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value,
      ).catch((error) => {
        setErrorMessage(error.message + "-" + error.code);
      });
    } else {
      createUserWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value,
      )
        .then(() => {
          updateProfile(auth.currentUser, {
            displayName: nameRef.current.value,
            photoURL: DEFAULT_PROFILE_IMAGE,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(addUser({ uid, email, displayName, photoURL }));
            })
            .catch((error) => {
              console.error("Error updating profile:", error);
            });
        })
        .catch((error) => {
          setErrorMessage(error.message + "-" + error.code);
        });
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <Header />
      <div className="fixed inset-0 -z-10">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/77c412a9-62ea-48a0-a5ee-466e11e851d5/web/IN-en-20260511-TRIFECTA-perspective_f0af4f75-4cc5-42bd-b0c5-2b65b8b50e03_large.jpg"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 sm:bg-black/40" />
      </div>
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-20 sm:px-6 sm:py-24">
        <form
          onSubmit={handleFormSubmit}
          className="w-full max-w-[450px] rounded-md bg-black/80 px-4 py-8 sm:px-12 sm:py-14"
        >
          <h1 className="mb-5 text-2xl font-bold text-white sm:mb-6 sm:text-3xl">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>
          {!isSignInForm ? (
            <input
              ref={nameRef}
              type="text"
              placeholder="Full Name"
              className="mb-3 w-full rounded-md bg-gray-800 p-3.5 text-base text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 sm:mb-4"
            />
          ) : null}
          <input
            ref={emailRef}
            type="email"
            placeholder="Email or phone number"
            autoComplete="email"
            className="mb-3 w-full rounded-md bg-gray-800 p-3.5 text-base text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 sm:mb-4"
          />
          <input
            ref={passwordRef}
            type="password"
            placeholder="Password"
            autoComplete={isSignInForm ? "current-password" : "new-password"}
            className="mb-3 w-full rounded-md bg-gray-800 p-3.5 text-base text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 sm:mb-4"
          />
          {errorMessage ? (
            <p className="mb-3 wrap-break-word text-sm font-semibold text-red-500 sm:text-base">
              {errorMessage}
            </p>
          ) : null}
          <button
            type="submit"
            className="mt-2 w-full cursor-pointer rounded bg-red-600 py-3 text-base font-medium text-white transition hover:bg-red-700 sm:py-3.5"
          >
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>
          <p className="mt-6 text-sm text-white sm:mt-8 sm:text-base">
            {isSignInForm ? "New to Netflix?" : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={toggleForm}
              className="cursor-pointer text-white underline-offset-2 hover:underline"
            >
              {isSignInForm ? "Sign up now" : "Sign in now"}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
