import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

function Profile() {
  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  console.log(formData);
  console.log(filePerc);
  console.log(fileUploadError);
  // console.log(file);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  function handleFileUpload() {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // console.log("upload is : " + Math.round(progress + "% done.");
        setFilePerc(Math.round(progress));
        // console.log(progress);
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          ref={fileRef}
          accept="image/*"
          hidden
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          className="rounded-full self-center h-24 w-24 object-cover cursor-pointer "
          alt="profile"
        />

        <p className="text-sm text-center">
          {fileUploadError ? (
            <span className="text-red-700">Error image upload</span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text slate-700">{`Uploading ${filePerc}%`}</span>
          ) : filePerc == 100 ? (
            <span className="text-green-700">
              Image uploaded successfully..!
            </span>
          ) : (
            ""
          )}
        </p>

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
