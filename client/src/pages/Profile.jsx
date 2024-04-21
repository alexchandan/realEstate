import React from "react";
import { useSelector } from "react-redux";

function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <img
          src={currentUser.avatar}
          className="rounded-full self-center h-24 w-24 object-cover cursor-pointer "
          alt="profile"
        />
        <input
          type="text"
          id="username"
          className="border p-3 rounded-lg focus:outline-none"
          placeholder="Username"
        />
        <input
          type="email"
          id="email"
          className="border p-3 rounded-lg focus:outline-none"
          placeholder="Email"
        />
        <input
          type="password"
          id="password"
          className="border p-3 rounded-lg focus:outline-none"
          placeholder="Password"
        />
        <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">
          Update
        </button>
      </form>
      <div className="flex flex-row justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Logout</span>
      </div>
    </div>
  );
}

export default Profile;
