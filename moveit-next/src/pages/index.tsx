import styles from '../styles/pages/Home.module.css'
import Head from 'next/head';

import {GetServerSideProps} from 'next';

import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from '../components/Profile';
import { CompletedChallengs } from '../components/CompletedChallengs';
import { Countdown } from '../components/Countdown';
import { ChallengBox } from '../components/ChallengBox';
import { CountdownProvider } from '../contexts/CountdownContext';
import { ChallengesProvider } from '../contexts/ChallengesContext';

interface HomeProps {
  level: number,
  currentExperience: number,
  challengesCompleted: number
}

function Home(props: HomeProps) {
  return (
    <ChallengesProvider 
      level={props.level}
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}
    >
      <div className={styles.container}>
        <Head>
          <title>Início | move.it</title> 
        </Head>
        <ExperienceBar/>
        
        <CountdownProvider>
          <section>
            <div>
              <Profile/>
              <CompletedChallengs/>
              <Countdown/>
            </div>
            <div>
              <ChallengBox/>
            </div>
          </section>
        </CountdownProvider>
        
      </div>
    </ChallengesProvider>
  )
}

export const getServerSideProps:  GetServerSideProps = async ( ctx ) => {
  
  const { level, currentExperience, challengesCompleted } = ctx.req.cookies;
  
  return{
    props: {
      level: Number(level ?? 1),
      currentExperience: Number(currentExperience ?? 0),
      challengesCompleted: Number(challengesCompleted ?? 0)
    }
  }
}

export default Home;