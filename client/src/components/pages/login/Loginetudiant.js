import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import loginImg from "./login.svg";
import "./style.scss";
import { login } from '../../../data/reducers/authetud';
import { Redirect, Link } from 'react-router-dom';

const LoginEtudiant = ({ login, isAuth, isLoading, etudiant }) => {
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = data;

  const handleChange = (name) => (event) => {
    setData({ ...data, [name]: event.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    login({ email, password });
  };

  if (isAuth && etudiant) {
    const { nomutilisateur, role } = etudiant;
    toast.success(`welcome ${nomutilisateur}`);
    if (role === 2) return <Redirect to='/cahierbyetud' />;
    if (role === 0) return <Redirect to='/Home' />;
  }

  
    return (
      <div className="base-container" >
         <form
        onSubmit={onSubmit}
      >
        <div className="header">Connexion</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} />
          </div>
          <div className="form">
            <div className="form-group">
              <label htmlFor="username">Email</label>
              <input type="email" name="email" value={email} placeholder="username" onChange={handleChange('email')} />
            </div>
            <div className="form-group">
              <label htmlFor="password">Mot de passe</label>
              <input type="password" name="password" value={password} placeholder="password" onChange={handleChange('password')} />
            </div>
          </div>
        </div>
        <div className="footer">
          <button type="submit" className="btn">
            Connecter
          </button>
          <Link to={`/modifiermdpetud`}>
          <h5 class="card-header">Modifier mot de passe</h5>
            </Link>
        </div>
        </form>
      </div>
    );
  };
  const mapToStateProps = (state) => ({
    isAuth: state.authetud.isAuthenticated,
    isLoading: state.authetud.loading,
    etudiant: state.authetud.etudiant,
  });
  export default connect(mapToStateProps, { login })(LoginEtudiant);

