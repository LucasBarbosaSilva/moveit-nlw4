import {createContext, ReactNode, useState} from 'react';
import challenges from '../../challenges.json';

interface Challenge {
  type: "body" | "eye";
  description: string;
  amount: number;
}

interface ChallengesContextData {
  level: number; 
  currentExperience: number; 
  challengesCompleted: number;
  setLevelUp: () => void; 
  startNewChallenge: () => void;
  challengeActive: Challenge;
  resetChallenge: () => void;
  experienceToNextLevel: number;
  setNewExpierence: () => void;
  addNewChallenge: () => void;
}

interface ChallengesProvidersProps {
  children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({children}: ChallengesProvidersProps ){
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [challengesCompleted, setChallengesCompleted] = useState(0);

  const [challengeActive, setChallengeActive] = useState(null)

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  function setLevelUp(){
    setLevel(level + 1)
  }

  function startNewChallenge(){
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    setChallengeActive(challenge);
  }

  function resetChallenge(){
    setChallengeActive(null)
  }

  function setNewExpierence(){
    setCurrentExperience(currentExperience + challengeActive.amount)
    addNewChallenge();
    resetChallenge();
  }

  function addNewChallenge(){
    setChallengesCompleted(challengesCompleted + 1)
  }

  return (
    <ChallengesContext.Provider 
      value={{
        level, 
        setLevelUp, 
        currentExperience, 
        challengesCompleted,
        startNewChallenge,
        challengeActive,
        resetChallenge,
        experienceToNextLevel,
        setNewExpierence,
        addNewChallenge
      }}
    >
        {children}
    </ChallengesContext.Provider>
    
  )
}