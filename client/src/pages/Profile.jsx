import { useSelector } from "react-redux";
import { useRef, useState } from "react";

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const [image, setImage] = useState(currentUser?.avatar || "");
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null); // Track upload status

  // Function to handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setImage(URL.createObjectURL(selectedFile)); // Show preview
    }
  };

  // Function to upload image to backend
  const uploadImage = async () => {
    if (!file) return alert("Please select an image!");
    
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:3000/api/upload", {
        method: "POST",
        body: formData
      });

      const data = await response.json();
      if (data.success) {
        setImage(`http://localhost:3000${data.fileUrl}`); // Set new profile picture
        setUploadStatus("success");  // ✅ Set success status
      } else {
        setUploadStatus("error");  // ❌ Set error status
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      setUploadStatus("error");  // ❌ Set error status
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <input 
          type="file" 
          ref={fileRef} 
          hidden 
          accept="image/*" 
          onChange={handleFileChange} 
        />
        <img 
          onClick={() => fileRef.current.click()} 
          src={image} 
          alt="Profile" 
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2" 
        />
        
        {/* Show Upload Status */}
        <p className="text-center mt-2">
          {uploadStatus === "success" && (
            <span className="text-green-500">Upload successfully!</span>
          )}
          {uploadStatus === "error" && (
            <span className="text-red-600">Error uploading image</span>
          )}
        </p>

        <button 
          type="button" 
          onClick={uploadImage} 
          className="bg-blue-500 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80"
        >
          Upload Image
        </button>

        <input 
          type="text" 
          placeholder="Username" 
          className="border p-3 rounded-lg bg-slate-50" 
          id="username" 
        />
        <input 
          type="email" 
          placeholder="Email" 
          className="border p-3 rounded-lg bg-slate-50" 
          id="email" 
        />
        <input 
          type="password" 
          placeholder="Password" 
          className="border p-3 rounded-lg bg-slate-50" 
          id="password" 
        />
        <button 
          className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80"
        >
          Update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-rose-700 cursor-pointer">Delete account</span>
        <span className="text-rose-700 cursor-pointer">Sign out</span>
      </div>
    </div>
  );
}
