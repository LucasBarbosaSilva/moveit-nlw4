import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { CountdownContext } from '../contexts/CountdownContext';

import styles from '../styles/components/ChallengBox.module.css';

export function ChallengBox() {
  const {challengeActive, resetChallenge, completedChallengs} = useContext(ChallengesContext);
  const {resetCountDown} = useContext(CountdownContext)
  
  function handleChallengeSucceed(){
    completedChallengs();
    resetCountDown();
  }

  function handleChallengeFailed(){
    resetChallenge();
    resetCountDown();
  }

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
              onClick={handleChallengeFailed}
            >
              Falhei
            </button>
            <button
              type="button"
              className={styles.challengeSuccededButton}
              onClick={handleChallengeSucceed}
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