import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';

import styles from '../styles/components/ChallengBox.module.css';

export function ChallengBox() {
  const {challengeActive, resetChallenge, setNewExpierence} = useContext(ChallengesContext);
  
  

  return(
    <div className={styles.challengeBoxContainer}>
      {challengeActive ? (
        <div className={styles.challengeActive}>
          <header>Ganhe {challengeActive.amount}xp</header>

          <main>
            <img src={`icons/${challengeActive.type}.svg`} alt="Body Img"/>
            <strong>Novo desafio</strong>
            <p>{challengeActive.description}</p>
          </main>

          <footer>
            <button
              type="button"
              className={styles.challengeFailedButton}
              onClick={resetChallenge}
            >
              Falhei
            </button>
            <button
              type="button"
              className={styles.challengeSuccededButton}
              onClick={setNewExpierence}
            >
              Completei
            </button>

          </footer>
        </div>  
      ) : (
        <div className={styles.challengeNotActive}>
          <strong>Finalize um ciclo para receber desafios</strong>
          <p>
            <img src="icons/level-up.svg" alt="Level Up"/>
            Avance de nível completando desafios.
          </p>
        </div>
      )}
    </div>
    
  );
}