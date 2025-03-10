import React, { useEffect, useState } from "react";

function Profile() {
  const [userDetails, setUserDetails] = useState(null);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/auth/profile`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch user details");
        }
        return res.json();
      })
      .then((data) => setUserDetails(data))
      .catch((err) => console.error("Error fetching user details:", err));
  }, []);

  if (!userDetails) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="profile-container">
      <style>
        {`
          /* Profile Container */
          .profile-container {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background: linear-gradient(135deg, #ff7e5f, #feb47b);
            font-family: 'Poppins', sans-serif;
          }

          .profile-card {
            width: 400px;
            background: #fff;
            padding: 20px;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            text-align: center;
            animation: fadeIn 0.8s ease-in-out;
          }

          /* Profile Image */
          .profile-img {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            border: 4px solid #ff7e5f;
            object-fit: cover;
            margin-bottom: 15px;
            transition: transform 0.3s ease;
          }

          .profile-img:hover {
            transform: scale(1.1);
          }

          /* Profile Name */
          .profile-name {
            font-size: 1.8rem;
            font-weight: bold;
            color: #333;
            margin-bottom: 5px;
          }

          /* Profile Details */
          .profile-details {
            background: #f7f7f7;
            padding: 15px;
            border-radius: 10px;
            box-shadow: inset 0 3px 10px rgba(0, 0, 0, 0.1);
          }

          .profile-details p {
            font-size: 1.1rem;
            color: #555;
            margin: 8px 0;
          }

          .profile-details strong {
            color: #ff7e5f;
          }

          /* Loading Animation */
          .loading {
            font-size: 1.5rem;
            font-weight: bold;
            color: #fff;
            text-align: center;
            animation: pulse 1s infinite;
          }

          @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.6; }
            100% { opacity: 1; }
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>

      <div className="profile-card">
        <img
          src={userDetails.profileImage}
          alt="Profile"
          className="profile-img"
        />
        <h2 className="profile-name">{userDetails.name}</h2>
        <div className="profile-details">
          <p><strong>Email:</strong> {userDetails.email}</p>
          <p><strong>Phone:</strong> {userDetails.phone}</p>
          <p><strong>Address:</strong> {userDetails.address}</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;


// import React, { useEffect, useState } from "react";

// function Profile() {
//   const [userDetails, setUserDetails] = useState(null);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetch("http://localhost:5000/api/auth/profile", {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//     })
//       .then((res) => {
//         if (!res.ok) {
//           throw new Error("Failed to fetch user details");
//         }
//         return res.json();
//       })
//       .then((data) => setUserDetails(data))
//       .catch((err) => console.error("Error fetching user details:", err));
//   }, []);

//   const handleFileChange = (e) => {
//     setSelectedFile(e.target.files[0]);
//   };

//   const handleUpload = () => {
//     if (!selectedFile) return;
    
//     setLoading(true);
//     const formData = new FormData();
//     formData.append("profileImage", selectedFile);

//     fetch("http://localhost:5000/api/users/upload-profile-pic", {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//       body: formData,
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         setUserDetails((prev) => ({ ...prev, profileImage: data.imageUrl }));
//         setSelectedFile(null);
//       })
//       .catch((err) => console.error("Error uploading profile picture:", err))
//       .finally(() => setLoading(false));
//   };

//   if (!userDetails) {
//     return <div className="loading">Loading...</div>;
//   }

//   return (
//     <div className="profile-container">
//       <style>
//         {`
//           .profile-container {
//             display: flex;
//             justify-content: center;
//             align-items: center;
//             height: 100vh;
//             background: linear-gradient(135deg, #6a11cb, #2575fc);
//             font-family: 'Poppins', sans-serif;
//           }

//           .profile-card {
//             width: 420px;
//             background: #fff;
//             padding: 20px;
//             border-radius: 12px;
//             box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
//             text-align: center;
//           }

//           .profile-pic {
//             width: 120px;
//             height: 120px;
//             border-radius: 50%;
//             object-fit: cover;
//             border: 4px solid #6a11cb;
//           }

//           .file-input {
//             margin-top: 10px;
//           }

//           .upload-btn {
//             margin-top: 10px;
//             padding: 8px 16px;
//             background: #6a11cb;
//             color: #fff;
//             border: none;
//             border-radius: 5px;
//             cursor: pointer;
//             transition: 0.3s;
//           }

//           .upload-btn:hover {
//             background: #2575fc;
//           }
//         `}
//       </style>

//       <div className="profile-card">
//         <h2>Profile</h2>
//         <img src={userDetails.profileImage} alt="Profile" className="profile-pic" />
//         <p><strong>Name:</strong> {userDetails.name}</p>
//         <p><strong>Email:</strong> {userDetails.email}</p>
//         <p><strong>Phone:</strong> {userDetails.phone}</p>
//         <p><strong>Address:</strong> {userDetails.address}</p>

//         <input type="file" className="file-input" onChange={handleFileChange} />
//         <button className="upload-btn" onClick={handleUpload} disabled={loading}>
//           {loading ? "Uploading..." : "Change Profile Picture"}
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Profile;


// import React, { useEffect, useState } from "react";

// function Profile() {
//   const [userDetails, setUserDetails] = useState(null);

//   // Fetch user details
//   useEffect(() => {
    
//     fetch("http://localhost:5000/api/auth/profile", {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`, // Send the JWT token for authentication
//       },
//     })
//       .then((res) => {
//         if (!res.ok) {
//           throw new Error("Failed to fetch user details");
//         }
//         return res.json();
//       })
//       .then((data) => setUserDetails(data))
//       .catch((err) => console.error("Error fetching user details:", err));
//   }, []);

//   if (!userDetails) {
//     return <div>Loading...</div>;
//   }

//   return (
//       <div className="text-center">
//       <style>
//         {`
//             /* Profile Container */
//             .profile-container {
//               max-width: 800px;
//               margin: 0 auto;
//               padding: 20px;
//               font-family: Arial, sans-serif;
//               background-color:rgb(186, 97, 97);
//               border-radius: 10px;
//               box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//             }

//             /* Profile Header */
//             .profile-header {
//               text-align: center;
//               margin-bottom: 20px;
//             }

//             .profile-header h1 {
//               font-size: 2.5rem;
//               color: #333;
//               margin-bottom: 10px;
//             }

//             /* User Details Section */
//             .user-details {
//               background-color: #fff;
//               padding: 20px;
//               border-radius: 10px;
//               box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//               margin-bottom: 20px;
//             }

//             .user-details h2 {
//               font-size: 1.8rem;
//               color: #555;
//               margin-bottom: 15px;
//             }

//             .user-details p {
//               font-size: 1.1rem;
//               color: #333;
//               margin: 10px 0;
//             }

//             .user-details p strong {
//               color: #007bff;
//             }

//             /* Loerading Message */
//             .loading-message {
//               text-align: center;
//               font-size: 1.2rem;
//               color: #555;
//             }

//             /* Error Message */
//             .error-message {
//               text-align: center;
//               font-size: 1.2rem;
//               color: #ff0000;
//               background-color: #ffe6e6;
//               padding: 10px;
//               border-radius: 5px;
//               margin: 20px 0;
//             }
//         `}
//       </style>
//       <div className="profile-container">
//         <div className="profile-header">
//         <h1>Profile</h1>
//         </div>
//         {/* Display user details */}
//         <div className="user-details">
//           <h2>User Details:</h2>
//           {userDetails.profileImage && (
//             <img
//               src={userDetails.profileImage}
//               alt="Profile"
//               style={{ width: "100px", height: "100px", borderRadius: "50%" }}
//             />
//           )}
//           <p>
//             <strong>Name:</strong> {userDetails.name}
//           </p>
//           <p>
//             <strong>Email:</strong> {userDetails.email}
//           </p>
//           <p>
//             <strong>Phone:</strong> {userDetails.phone}
//           </p>
//           <p>
//             <strong>Address:</strong> {userDetails.address}
//           </p>
//         </div>
//        </div> 
//     </div>
//   );
// }

// export default Profile;