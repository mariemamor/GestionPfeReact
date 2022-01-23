import React, { useState } from 'react';
import Axios from 'axios'
import { connect } from 'react-redux';

const ModifiermdpEtud = (etudiant, password) => {
    const [PasswordToUpdate, setPasswordToUpdate] = useState(password)

    const handleUpdatePassword = () => {
        if (etudiant) {
            const {_id} = etudiant
            console.log(etudiant)
          
        updatePassword(_id, PasswordToUpdate)
        }
      }

     const updatePassword = async (_id, password) => {
        //await delay(1000)
        const result = await Axios.put('http://localhost:4000/api/etudiant/password/'+_id, password)
        
      }
    return (
        <div className="base-container" >
        

<div className="form-group">
              <label htmlFor="password">Nouveau Mot de passe</label>
              <input type="password" name="password" value={PasswordToUpdate} placeholder="password" onChange={(e) => setPasswordToUpdate(e.target.value)}  className="formField" />
            </div>
            <button onClick={handleUpdatePassword} className="myButton">Modifier </button>
            </div>
    )
}

const mapToStateProps = (state) => ({
    isAuth: state.authetud.isAuthenticated,
    isLoading: state.authetud.loading,
    etudiant: state.authetud.etudiant,
  });
  export default connect(mapToStateProps, )(ModifiermdpEtud);

