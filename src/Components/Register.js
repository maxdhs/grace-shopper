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
		<div className="login_container">
			<div className="login_main">
				<form onSubmit={handleSubmit}>
					<h2>Thanks for joining!</h2>
					<label>Email:</label>
					<input
						required
						type="text"
						placeholder="Enter email.. "
						value={email}
						onChange={(e) => {
							setEmail(e.target.value);
						}}
					/>
					<label>Username:</label>
					<input
						required
						type="text"
						placeholder="Enter username.."
						value={username}
						onChange={(e) => {
							setUsername(e.target.value);
						}}
					/>
					<label>Password:</label>
					<input
						required
						type="password"
						// minLength="8"
						placeholder="Enter password.."
						value={password}
						onChange={(e) => {
							setPassword(e.target.value);
						}}
					/>
					{password.length !== 0 && 
						<>
						<label>Confirm Password:</label>
						<input
							required
							type="password"
							// minLength="8"
							placeholder="Confirm password.."
							value={confirm}
							onChange={(e) => {
								setConfirm(e.target.value);
							}}
						/>
						</>
					}
					<button type="submit">Register</button>
					<p>
						Already have an account?
						<Link to="/login">
							Log in
						</Link>
					</p>
				</form>
				{error && <p> {error}!</p>}
			</div>
		</div>
	);
};
export default Register;