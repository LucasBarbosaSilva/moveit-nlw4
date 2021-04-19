import {createContext, ReactNode, useEffect, useState} from 'react';
import Cookies from 'js-cookie';

import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';

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
  resetChallenge: () => void;
  challengeActive: Challenge;
  experienceToNextLevel: number;
  completedChallengs: () => void;
  closeLevelUpModal: ()=> void;
}

interface ChallengesProvidersProps {
  children: ReactNode;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({children, ...rest }: ChallengesProvidersProps ){
  const [level, setLevel] = useState(rest.level);
  const [currentExperience, setCurrentExperience] =useState(rest.currentExperience ?? 0);
  const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);

  const [challengeActive, setChallengeActive] = useState(null);
  const [isLevelModalOpne, setIsLevelModalOpen] = useState(false);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission();
  }, [])

  useEffect(() => {
    Cookies.set('level', String(level));
    Cookies.set('currentExperience', String(currentExperience));
    Cookies.set('challengesCompleted', String(challengesCompleted));
  }, [level, currentExperience, challengesCompleted]);
  function setLevelUp(){
    setLevel(level + 1);
    setIsLevelModalOpen(true);
  }

  function startNewChallenge(){
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    setChallengeActive(challenge);

    if(Notification.permission === 'granted'){
      
      new Audio('/notification.mp3').play();
      
      new Notification('Novo desafio 🎉 ', {
        body: `Valendo ${challenge.amount}xp!`
      })  
    }
  }

  function resetChallenge(){
    setChallengeActive(null)
  }

  function completedChallengs(){
    if(!challengeActive){
      return;
    }

    const { amount } = challengeActive;

    let finalExpeirience = currentExperience + amount
    if(finalExpeirience >= experienceToNextLevel){
      finalExpeirience = finalExpeirience - experienceToNextLevel;
      setLevelUp();
    }

    setCurrentExperience(finalExpeirience);
    setChallengeActive(null);
    setChallengesCompleted(challengesCompleted + 1);
  }

  function closeLevelUpModal(){
    setIsLevelModalOpen(false)
  }
  return (
    <ChallengesContext.Provider 
      value={{
        level, 
        setLevelUp, 
        currentExperience, 
        challengesCompleted,
        startNewChallenge,
        resetChallenge,
        experienceToNextLevel,
        completedChallengs,
        challengeActive,
        closeLevelUpModal
      }}
    >
        {children}
        {isLevelModalOpne && <LevelUpModal/>}
    </ChallengesContext.Provider>
    
  )
}