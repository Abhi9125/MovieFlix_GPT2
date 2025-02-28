import React, { useRef, useState } from "react";
import Header from "./Header";
import { auth } from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
const Login = () => {
  const [isSignInPage, setIsSignInPage] = useState(true);
  const [validationMessage, setValidationMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const toggleSignInSignUpPage = () => setIsSignInPage(!isSignInPage);

  // Form Validation
  const validateForm = (emailValue, passwordValue) => {
    const emailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);
    const passwordCheck = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/.test(passwordValue);

    if (!emailCheck) return "Invalid Email";
    if (!passwordCheck)
      return "Password must include 1 letter, 1 digit, and be at least 6 characters long";

    return ""; // No errors
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = validateForm(email.current.value, password.current.value);

    if (message != "") setValidationMessage(message);

    if (!isSignInPage) {
      // sign up
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          console.log(user);
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: "https://avatars.githubusercontent.com/u/38842501?v=4",
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
              navigate("/browse");
            })
            .catch((error) => {
              // An error occurred
              // ...
            });
          setValidationMessage("Account created successfully!");
          navigate("/browse");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setValidationMessage(errorCode + "-" + errorMessage);
        });
    } else {
      // Sign In
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          navigate("/browse");
          setValidationMessage("Signed in successfully!");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setValidationMessage(errorCode + "-" + errorMessage);
        });
    }
  };

  return (
    <div className="relative min-h-screen bg-black">
      <Header />
      <div className="absolute inset-0">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/2f5a878d-bbce-451b-836a-398227a34fbf/web/IN-en-20241230-TRIFECTA-perspective_5ab944a5-1a71-4f6d-b341-8699d0491edd_large.jpg"
          alt="Background"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center h-screen">
        <form
          onSubmit={handleSubmit}
          className="w-80 bg-black bg-opacity-75 p-8 rounded-lg shadow-lg"
        >
          <h1 className="text-white text-2xl font-semibold mb-6">
            {isSignInPage ? "Sign In" : "Sign Up"}
          </h1>
          {!isSignInPage && (
            <div className="mb-4">
              <input
                ref={name}
                type="text"
                placeholder="Name"
                className="w-full px-4 py-2 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          )}
          <div className="mb-4">
            <input
              ref={email}
              type="text"
              placeholder="Enter Email"
              className="w-full px-4 py-2 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div className="mb-4">
            <input
              ref={password}
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          {validationMessage && (
            <p className="text-red-700 py-4">{validationMessage}</p>
          )}
          <button
            type="submit"
            className="w-full py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            {isSignInPage ? "Sign In" : "Sign Up"}
          </button>
          <p
            className="text-white font-semibold mt-5 cursor-pointer"
            onClick={toggleSignInSignUpPage}
          >
            {isSignInPage
              ? "New to Netflix? Sign up now."
              : "Already a user? Sign In now."}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
