import React, { useContext, useState } from 'react';
import './style.scss';
import { useNavigate } from 'react-router-dom';
import waiters from '../../assets/waiters-animate.svg';
import MyNavBar from '../../components/navBar';
import restaurantApi from '../../api';
import UserContext from '../../context/user.context';

/**
 * @function LoginPage
 * @description Componente que retorna a pagina de Login do sistema.
 * @returns {html} Retorna a pagina de login do sisema.
 */

function LoginPage() {
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const image = 'image';
  const card = 'card';
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  if (user) navigate('/');

  /**
   * funcao que captura o que esta escrito no input
   * @param {event} e
   */
  const handleSubmit = (event) => {
    event.preventDefault();

    const newUser = {
      email: newEmail,
      password: newPassword,
    };
    if (newEmail && newPassword) {
      restaurantApi
        .post(`/users/login`, newUser)
        .then((response) => {
          setUser(response.data[0]);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };
  return (
    <div>
      <MyNavBar />
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
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                  />
                </div>
                <div>
                  <input
                    className="textInput"
                    placeholder="Password"
                    type="password"
                    id="Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div>
                  <button type="submit" className="btn2">
                    Login
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
