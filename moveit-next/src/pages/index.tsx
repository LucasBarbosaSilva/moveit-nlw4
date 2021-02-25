import styles from '../styles/pages/Home.module.css'
import Head from 'next/head';

import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from '../components/Profile';
import { CompletedChallengs } from '../components/CompletedChallengs';
import { Countdown } from '../components/Countdown';
import { ChallengBox } from '../components/ChallengBox';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Início | move.it</title> 
      </Head>
      <ExperienceBar/>

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
    </div>
  )
}
