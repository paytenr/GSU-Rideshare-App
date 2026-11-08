import { useState } from "react";

function App() {
  const [page, setPage] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

        <input placeholder="First Name" />
        <br /><br />

        <input placeholder="Last Name" />
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
        />
        <br /><br />

        <button onClick={() => setPage("authentication")}>
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

      <button
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
          style={{
            width: "300px",
            padding: "10px",
            borderRadius: "5px",
            border: "none",
          }}
        />

        <br /><br />

        <div
          style={{
            backgroundColor: "white",
            color: "black",
            padding: "15px",
            borderRadius: "10px",
            marginBottom: "10px",
          }}
        >
          <h3>Statesboro → Savannah</h3>
          <p>Driver: Sarah</p>
          <button>Join Ride</button>
        </div>

        <div
          style={{
            backgroundColor: "white",
            color: "black",
            padding: "15px",
            borderRadius: "10px",
          }}
        >
          <h3>Statesboro → Atlanta</h3>
          <p>Driver: James</p>
          <button>Join Ride</button>
        </div>

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

      <input placeholder="Username" />

      <br /><br />

      <input
        type="password"
        placeholder="Password"
      />

      <br /><br />

      <button
        onClick={() => setPage("authentication")}
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