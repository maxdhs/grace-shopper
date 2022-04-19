import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../api";

const Register = ({ setToken }) => {
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirm, setConfirm] = useState("");
	const [error, setError] = useState("");
	const history = useNavigate();

	const handleSubmit = async (event) => {
		event.preventDefault();
		setError("");
		console.log(`usernaem: ${username}`);
		console.log(`email: ${email}`);
		console.log(`password: ${password}`);

		setError("");
		if (password !== confirm) {
			setError("Confirm password does not match");
			return;
		}

		try {
			const response = await register(email, username, password);
			console.log("response", response);

			if (response.message) {
				return setError(response.message);
			}

			setToken(response.token);
			localStorage.setItem("token", response.token);
			setEmail("");
			setUsername("");
			setPassword("");
			history("/");
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<h2> Register</h2>

			<form className="register-form" onSubmit={handleSubmit}>
				<div className="register-form-grp">
					<label>Email</label>
					<input
						required
						type="text"
						placeholder="Enter email.. "
						value={email}
						onChange={(e) => {
							setEmail(e.target.value);
						}}
					></input>
				</div>

				<div className="register-form-grp">
					<label>Name</label>
					<input
						required
						type="text"
						placeholder="Enter username.."
						value={username}
						onChange={(e) => {
							setUsername(e.target.value);
						}}
					></input>
				</div>

				<div className="register-form-grp">
					<label>Password</label>
					<input
						required
						type="password"
						// minLength="8"
						placeholder="Enter password.."
						value={password}
						onChange={(e) => {
							setPassword(e.target.value);
						}}
					></input>
				</div>

				<div className="register-form-grp">
					<label>Confirm Password</label>
					<input
						required
						type="password"
						// minLength="8"
						placeholder="Confirm password.."
						value={confirm}
						onChange={(e) => {
							setConfirm(e.target.value);
						}}
					></input>
				</div>

				<button type="submit">Register</button>
			</form>

			<div className="goto-login ">
				<Link to="/login">Already have an account? Click here to log in</Link>
			</div>

			{error && <div> {error}!</div>}
		</>
	);
};
export default Register;
