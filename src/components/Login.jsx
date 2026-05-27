import "./../styles/Login.css";

import {
FaUser,
FaLock,
FaEye,
FaCheck
} from "react-icons/fa";

function Login(){

return(

<div className="login-container">

{/* LEFT */}

<div className="login-left">

<h1>Akreditasi MRMIK</h1>

<p>

Sistem digital rumah sakit
untuk monitoring dokumen
dan upload eviden.

</p>

<div className="feature-list">

<div>
<FaCheck />
Dashboard Realtime
</div>

<div>
<FaCheck />
Upload Eviden
</div>

<div>
<FaCheck />
Monitoring Dokumen
</div>

<div>
<FaCheck />
Dark Mode
</div>

<div>
<FaCheck />
Responsive Mobile
</div>

</div>

</div>

{/* RIGHT */}

<div className="login-right">

<div className="login-box">

<h2>Login Sistem</h2>

<div className="input-group">

<FaUser className="icon" />

<input
type="text"
placeholder="Username"
/>

</div>

<div className="input-group">

<FaLock className="icon" />

<input
type="password"
placeholder="Password"
/>

<FaEye className="eye" />

</div>

<button>

Login Sistem

</button>

<p className="footer-text">

Created by IT Support

</p>

</div>

</div>

</div>

)

}

export default Login;