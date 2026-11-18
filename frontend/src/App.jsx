import { useState, useEffect } from "react";

function App() {
  const [page, setPage] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rides, setRides] = useState([]);
  const [token, setToken] = useState("");
  const [searchDestination, setSearchDestination] = useState("");
  

  // handleLogin function
  const handleLogin = async () => {
    try {
      const response = await fetch(
        "http://localhost:8081/api/v1/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );
      console.log("Login response status:", response.status);
      if(!response.ok){
        alert("Invalid login. Check your email and password!");
        return;
      }
      const data = await response.json();

      console.log("Logged in as:", data.user.email);

      setToken(data.token);

      setPassword("");
      setPage("passenger");

    } catch (error) {
      console.error("Error: ", error);
    }
  };

// handle logout
const handleLogout = () => {
  setToken("");
  setRides([]);
  setEmail("");
  setPassword("");
  setPage("login");
};

// handleSignup function
const handleSignup = async () => {
  if (!firstName.trim() || !lastName.trim() || !email.trim() || !password || !confirmPassword) {
    alert("Please fill out all fields.");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  if (password.length < 8) {
    alert("Password must be at least 8 characters.");
    return;
  }

  try {
    const response = await fetch(
      "http://localhost:8081/api/v1/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          password: password,
        }),
      }
    );

    if (!response.ok) {
      const message = await response.text();
      console.error("Signup failed:", message);
      alert("Unable to create account. Check the console for details.");
      return;
    }

    const data = await response.json();

    console.log("Account created:", data.user.email);

    setPassword("");
    setConfirmPassword("");
    alert("Account created successfully!");

    setPage("login");

  } catch (error) {
    console.error("Signup error:", error);
    alert("Cannot connect to the backend. Make sure Spring Boot is running.");
  }
};

// handling ride request
const handleJoinRide = async (rideId) => {
  if (!token) {
    alert("Please log in before joining a ride.");
    return;
  }

  const pickupAddress = prompt("Where would you like to be picked up?");

  if (pickupAddress === null) return;

  if (!pickupAddress.trim()) {
    alert("Please enter a pickup location.");
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:8081/api/v1/rides/${rideId}/requests`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          seatsRequested: 1,
          pickupAddress: pickupAddress.trim(),
        }),
      }
    );

    if (!response.ok) {
      const message = await response.text();
      console.error("Ride request failed:", response.status, message);
      alert("Unable to request this ride. Check the console for details.");
      return;
    }

    alert("Ride request submitted! Waiting for driver approval.");

  } catch (error) {
    console.error("Error joining ride:", error);
    alert("Cannot connect to the backend.");
  }
};

// load available rides
useEffect(() => {
  if (page !== "passenger" || !token) return;

  const loadRides = async () => {
    try {
      const response = await fetch(
        "http://localhost:8081/api/v1/rides",
        {
          headers:{
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Unable to load rides");
      }

      const data = await response.json();

      console.log("Available rides:", data);
      setRides(data);

    } catch (error) {
      console.error("Error loading rides:", error);
    }
  };

  loadRides();
}, [page, token]);

  const navBar = (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: "#FFC72C",
        display: "flex",
        gap: "15px",
        padding: "10px 20px",
        borderRadius: "20px",
      }}
    >
      <button onClick={() => setPage("passenger")}>
        🏠 Home
      </button>

      <button onClick={() => setPage("settings")}>
        ⚙️ Settings
      </button>

      <button onClick={() => setPage("help")}>
        ❓ Help
      </button>
    </div>
  );

  if (page === "signup") {
    return (
      <div
        style={{
          backgroundColor: "#0039A6",
          minHeight: "100vh",
          textAlign: "center",
          paddingTop: "50px",
          color: "white",
        }}
      >
        <h1 style={{ color: "#FFC72C" }}>Sign Up</h1>

        <input placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)} />
        <br /><br />

        <input placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)} />
        <br /><br />

        <input placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}/>
        <br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br /><br />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <br /><br />

        <button onClick={handleSignup}>
          Create Account
        </button>

        <br /><br />

        <button onClick={() => setPage("login")}>
          Back
        </button>
      </div>
    );
  }

  if (page === "authentication") {
    return (
      <div
        style={{
          backgroundColor: "#0039A6",
          minHeight: "100vh",
          textAlign: "center",
          paddingTop: "100px",
          color: "white",
        }}
      >
        <h1 style={{ color: "#FFC72C" }}>
          Eagle ID Authentication
        </h1>

        <p>Enter your Eagle ID to continue</p>

        <input placeholder="Eagle ID" />

        <br /><br />

        <button onClick={() => setPage("passenger")}>
          Verify
        </button>
      </div>
    );
  }

if (page === "settings") {
  return (
    <div
      style={{
        backgroundColor: "#0039A6",
        minHeight: "100vh",
        color: "white",
        padding: "20px",
      }}
    >
      <h1 style={{ color: "#FFC72C" }}>
        Settings
      </h1>

      <button
        style={{
          width: "100%",
          padding: "15px",
          marginBottom: "10px",
          borderRadius: "10px",
          border: "none",
          fontSize: "16px",
        }}
      >
        👤 Edit Profile
      </button>

      <button
        style={{
          width: "100%",
          padding: "15px",
          marginBottom: "10px",
          borderRadius: "10px",
          border: "none",
          fontSize: "16px",
        }}
      >
        📍 Saved Locations
      </button>

      <button
        style={{
          width: "100%",
          padding: "15px",
          marginBottom: "10px",
          borderRadius: "10px",
          border: "none",
          fontSize: "16px",
        }}
      >
        🔔 Notification Preferences
      </button>

      <button
        style={{
          width: "100%",
          padding: "15px",
          marginBottom: "10px",
          borderRadius: "10px",
          border: "none",
          fontSize: "16px",
        }}
      >
        🚗 Driver Preferences
      </button>

      <button
        style={{
          width: "100%",
          padding: "15px",
          marginBottom: "10px",
          borderRadius: "10px",
          border: "none",
          fontSize: "16px",
        }}
      >
        🔒 Privacy & Safety
      </button>

      <button
        style={{
          width: "100%",
          padding: "15px",
          marginBottom: "10px",
          borderRadius: "10px",
          border: "none",
          fontSize: "16px",
        }}
      >
        ⭐ Rate the App
      </button>

      <button
        style={{
          width: "100%",
          padding: "15px",
          marginBottom: "10px",
          borderRadius: "10px",
          border: "none",
          fontSize: "16px",
        }}
      >
        🚑 Emergency Contacts
      </button>

      <button
        style={{
          width: "100%",
          padding: "15px",
          marginBottom: "10px",
          borderRadius: "10px",
          border: "none",
          fontSize: "16px",
        }}
      >
        📄 Terms & Conditions
      </button>

      <button onClick={handleLogout}
        style={{
          width: "100%",
          padding: "15px",
          marginBottom: "10px",
          borderRadius: "10px",
          border: "none",
          fontSize: "16px",
          backgroundColor: "#ff4d4d",
          color: "white",
        }}
      >
        🚪 Log Out
      </button>

      {navBar}
    </div>
  );
}
  if (page === "help") {
    return (
      <div
        style={{
          backgroundColor: "#0039A6",
          minHeight: "100vh",
          color: "white",
          padding: "20px",
        }}
      >
        <h1 style={{ color: "#FFC72C" }}>
          Help Center
        </h1>

        <div
          style={{
            backgroundColor: "white",
            color: "black",
            padding: "15px",
            borderRadius: "10px",
            marginBottom: "10px",
          }}
        >
          <h3>How do I request a ride?</h3>
          <p>
            Search for your destination and
            choose an available driver.
          </p>
        </div>

        <div
          style={{
            backgroundColor: "white",
            color: "black",
            padding: "15px",
            borderRadius: "10px",
            marginBottom: "10px",
          }}
        >
          <h3>How do I become a driver?</h3>
          <p>
            Verify your Eagle ID and
            create ride postings.
          </p>
        </div>

        <div
          style={{
            backgroundColor: "white",
            color: "black",
            padding: "15px",
            borderRadius: "10px",
            marginBottom: "10px",
          }}
        >
          <h3>Campus Safety Tips</h3>
          <p>
            Meet in well-lit public areas and
            verify ride details before departure.
          </p>
        </div>

        <div
          style={{
            backgroundColor: "white",
            color: "black",
            padding: "15px",
            borderRadius: "10px",
          }}
        >
          <h3>Contact Support</h3>
          <p>support@gsurideshare.edu</p>
          <p>Response Time: Within 24 Hours</p>
        </div>

        {navBar}
      </div>
    );
  }

  if (page === "passenger") {
    return (
      <div
        style={{
          backgroundColor: "#0039A6",
          minHeight: "100vh",
          padding: "20px",
          color: "white",
        }}
      >
        <h1 style={{ color: "#FFC72C" }}>
          Passenger Home
        </h1>

        <input
          placeholder="Search Destination"
          value={searchDestination}
          onChange={(e) => setSearchDestination(e.target.value)}
          style={{
            width: "300px",
            padding: "10px",
            borderRadius: "5px",
            border: "none",
          }}
        />

        <br /><br />

        {rides.length === 0 && (
          <p>No available rides.</p>
        )}

        {rides.filter((ride) =>
        ride.destinationAddress.toLowerCase().includes(searchDestination.toLowerCase().trim())
      ).map((ride) => (
          <div key={ride.id}
          style={{
            backgroundColor: "white",
            color: "black",
            padding: "15px",
            borderRadius: "10px",
            marginBottom: "10px",
          }}>

            <h3>
              {ride.originAddress} to {ride.destinationAddress}
            </h3>

            <p>Driver: {ride.driverName}</p>

            <button onClick={() => handleJoinRide(ride.id)}>Join Ride</button>
          </div>
        ))}



        {navBar}
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: "#0039A6",
        minHeight: "100vh",
        textAlign: "center",
        paddingTop: "100px",
      }}
    >
      <h1 style={{ color: "#FFC72C" }}>
        GSU Rideshare
      </h1>

      <h2 style={{ color: "white" }}>
        Welcome Back!
      </h2>

      <input placeholder="Email"
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)} />

      <br /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button
        onClick={handleLogin}
      >
        Login
      </button>

      <br /><br />

      <button
        onClick={() => setPage("signup")}
      >
        Sign Up
      </button>
    </div>
  );
}

export default App;