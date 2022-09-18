import React, { useState } from 'react';
import './style.scss';
import waiters from '../../assets/waiters-animate.svg';

/**
 * @function LoginPage
 * @description Componente que retorna a pagina de Login do sistema.
 * @returns {html} Retorna a pagina de login do sisema.
 */

function LoginPage() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const image = 'image';
  const card = 'card';
  /**
   * funcao que captura o que esta escrito no input
   * @param {event} e
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
  };
  return (
    <div className="mainDiv">
      <div className="leftDiv">
        <img role={image} src={waiters} alt="waiters" />
      </div>
      <div className="rightDiv">
        <form onSubmit={handleSubmit}>
          <div className="cardLogin" role={card}>
            <h2 className="title">Hello!</h2>
            <div className="textfield">
              <div>
                <input
                  className="textInput"
                  placeholder="User"
                  type="text"
                  id="User"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                />
              </div>
              <div>
                <input
                  className="textInput"
                  placeholder="Password"
                  type="password"
                  id="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <button type="submit" className="btn">
                  Login
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
