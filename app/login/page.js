import NavBar from "../Components/NavbarSecond";
export default function Login() {
    return (
      <div>
        <NavBar/>
        <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>Login Page</h1>
        <form>
          <input type="text" placeholder="Username" style={{ margin: "10px" }} />
          <br />
          <input type="password" placeholder="Password" style={{ margin: "10px" }} />
          <br />
          <button type="submit">Login</button>
        </form>
      </div>

      </div>
      
    );
  }
  