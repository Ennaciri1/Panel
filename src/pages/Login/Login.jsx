

// src/pages/Login/Login.jsx
import React from "react";
import "./Login.css";


export default function Login(){
return (
<div className="login-shell">
{/* Colonne gauche (branding) */}
<aside className="brand-side">
<div className="brand-inner">
<img className="logo" src="/assets/logos/Vertical logo 1.png" alt="AJIAPP logo"/>

<p className="sub">Designed so your business can thrive</p>
</div>
<footer className="copy">2025 by AJIAPP</footer>
</aside>


{/* Colonne droite (formulaire) */}
<main className="form-side">
<div className="form-wrap">
<h1 className="title">Welcome</h1>
<h3 className="subtitle">Sign in to your account</h3>


<form className="form" onSubmit={(e)=>e.preventDefault()}>
<label htmlFor="email">E-mail</label>
<input id="email" type="email" placeholder="you@example.com" />


<label htmlFor="password">Password</label>
<input id="password" type="password" placeholder="••••••••" />


<div className="remember">
<input id="remember" type="checkbox"/>
<label htmlFor="remember">Remember me</label>
</div>


<button type="submit" className="btn">Sign in</button>
</form>
</div>
</main>
</div>
);
}