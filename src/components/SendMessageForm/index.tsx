import { FormEvent, useContext, useState } from 'react';
import { VscGithubInverted, VscSignOut } from 'react-icons/vsc';
import { AuthContext } from '../../contexts/auth';
import { api } from '../../services/api';
import { toast, ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import styles from './styles.module.scss';

export function SendMessageForm() {
  const { user, signOut } = useContext(AuthContext);
  const [message, setMessage] = useState('');  

  async function handleSendMessage(event: FormEvent) {
    event.preventDefault();

    if(!message.trim()) {  
      toastWarn();

      return;
    }

    try {
      await api.post('messages', { message });

      toastSuccess();  
      setMessage('');
    } catch (error) {
      console.log(error);
      toastError();
    }
  }  

  function toastSuccess() {
    toast.success("Mensagem enviada!", {      
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark"
    });
  }

  function toastWarn() {
    toast.warn('Digite a sua mensagem!', {
      autoClose: 5000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark"        
    }); 
  }

  function toastError() {
    toast.error('Erro ao enviar mensagem!', {
      autoClose: 5000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark"        
    }); 
  }

  return (    
    <div className={styles.sendMessageFormWrapper}>
      <button onClick={signOut} className={styles.signOutButton}>
        <VscSignOut size="32"/>
      </button>

      <header className={styles.userInformation}>
        <div className={styles.userImage}>
          <img src={user?.avatar_url} alt={user?.name} />
        </div>
        <strong className={styles.userName}>{user?.name}</strong>
        <span className={styles.userGithub}>
          <VscGithubInverted size="16" />
          {user?.login}
        </span>
      </header>

      <form onSubmit={handleSendMessage} className={styles.sendMessageForm}>
        <label htmlFor="message">Mensagem</label>
        <textarea 
          name="message" 
          id="message"
          placeholder="Qual a sua expectativa para o evento?" 
          onChange={event => setMessage(event.target.value)}
          value={message}
        />

        <button type="submit" >Enviar mensagem</button>        
        <ToastContainer />
      </form>
    </div>
  );
}