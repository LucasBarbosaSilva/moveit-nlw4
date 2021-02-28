import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengesContext";

interface CountdownContextData {
  minutes: number;
  seconds: number;
  hasFinished: boolean;
  isActive: boolean;
  startCountdown: () => void;
  resetCountDown: () => void;
}

interface CountdownProvidersProps {
  children: ReactNode;
}



export const CountdownContext = createContext({} as CountdownContextData);

export function CountdownProvider({children}: CountdownProvidersProps ){

  const timeDefault = 0.1 * 60;

  let countdownTimeout: NodeJS.Timeout;
  
  const {startNewChallenge} = useContext(ChallengesContext);

  
  const [time, setTime] = useState(timeDefault);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] =  useState(false)

  const minutes = Math.floor(time / 60);
  const seconds = time % 60; 

  function startCountdown(){
    setIsActive(true);
  }

  function resetCountDown(){
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setHasFinished(false)
    setTime(timeDefault)
  }

  useEffect(() => {
    if (isActive && time > 0){
      countdownTimeout = setTimeout(() => {
        setTime(time-1)
      }, 1000)
    } else if (isActive && time === 0){
      setHasFinished(true);
      setIsActive(false);
      startNewChallenge();

    }
  }, [isActive, time])
  
  return(
    <CountdownContext.Provider 
      value={{
        minutes,
        seconds,
        hasFinished,
        isActive,
        startCountdown,
        resetCountDown
      }}
    >
      {children}
    </CountdownContext.Provider>
  );
};