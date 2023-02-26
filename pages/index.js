import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'


export default function Home() {

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const location = "Vancouver";
  const units = "metric";
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=${units}&appid=${apiKey}`;
  
  const [data, setData] = useState();
  const grabWeather = useRef(false);

  const fetchWeather = async () => {
    const response = await axios.get(url); 
    console.log(response);

    console.log(response.data.list);
    const arrayOfDays = [];

    let weatherData = response.data.list.map((weather, index) => {
      console.log(parseInt(weather.dt_txt.substr(8,2),10));
      let num = parseInt(weather.dt_txt.substr(8,2),10);

      if(num !== arrayOfDays.find(element => element === num)) {
        arrayOfDays.push(num);
        console.log("Here");
        console.log(response.data.list[index])
        var month = '';
        var icon = '';

        if(weather.dt_txt.substr(5,2) == 1) {
          month = 'January'
        } else if(weather.dt_txt.substr(5,2) == 2) {
          month = 'February'
        } else if(weather.dt_txt.substr(5,2) == 3) {
          month = 'March'
        } else if(weather.dt_txt.substr(5,2) == 4) {
          month = 'April'
        } else if(weather.dt_txt.substr(5,2) == 5) {
          month = 'May'
        } else if(weather.dt_txt.substr(5,2) == 6) {
          month = 'June'
        } else if(weather.dt_txt.substr(5,2) == 7) {
          month = 'July'
        } else if(weather.dt_txt.substr(5,2) == 8) {
          month = 'August'
        } else if(weather.dt_txt.substr(5,2) == 9) {
          month = 'September'
        } else if(weather.dt_txt.substr(5,2) == 10) {
          month = 'October'
        } else if(weather.dt_txt.substr(5,2) == 11) {
          month = 'November' 
        } else if(weather.dt_txt.substr(5,2) == 12) {
          month = 'December'
        }

        if(weather.weather[0].main == 'Clouds') {
          icon = '/icons/broken-clouds.svg'
        } else if(weather.weather[0].main == 'Clear') {
          icon = '/icons/clear-sky.svg'
        } else if(weather.weather[0].main == 'Rain') {
          icon = '/icons/rain.svg'
        } else if(weather.weather[0].main == 'Snow') {
          icon = '/icons/snow.svg'
        } else if(weather.weather[0].main == 'Thunderstorm') {
          icon = '/icons/thunderstorm.svg'
        } else if(weather.weather[0].main == 'Drizzle') {
          icon = '/icons/shower-rain.svg'
        } else if(weather.weather[0].main == 'Atmosphere') {
          icon = '/icons/mist.svg'
        } 

        var now = new Date(weather.dt_txt);
        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var day = days[now.getDay()];

        return (
         
          <div key={index} className={styles.weatherCard}> 
            <div></div>
            <p>{day}</p>
            <div className={styles.blur}>
              <div className={styles.date}>
                  
                  <p> {month} {weather.dt_txt.substr(8,2)} </p>
                  <p> {weather.dt_txt.substr(0,4)}</p>
                  
                </div>
            </div>
            {/* <Image
              src={icon}
              alt="Weather Icon"
              width={100}
              height={100}
              priority
            /> */}
            <div className={styles.card}>
              <div style={{width: '130px', height: '130px', position: 'relative'}}>
                <Image
                  src={icon}
                  alt="Weather Icon"
                  // layout='fill'
                  // objectFit='contain'
                  width={130}
                  height={130}
                  sizes='100px'
                />
              </div>
              <div>
                <div> {weather.main.temp.toFixed(1)} °C </div>
                <div> {weather.weather[0].main} </div> 
              </div>
            </div> 
           
          </div>
        )
      }
    })
    console.log(arrayOfDays);
    setData(weatherData);
  }
  
  useEffect(() => {
    // if(grabWeather.current === true) {
      fetchWeather();
    // } 
    // return () => {
    //   grabWeather.current = true;
    // } 
  }, []);

  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>

        <div className={styles.description}>
          <p>Vancouver, B.C Weather <br/></p>         
          <p>Last Updated: {date}</p>
          <p>
            <a
              href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              By{' '}
              Minyoung 
            </a>
          </p>
        </div>

        <div className={styles.center}>
          <div></div>
          <Image
            className={styles.logo}
            src="/logo.png"
            alt="weather-forecast Logo"
            width={600}
            height={200}
            priority
          />
        </div>

        <div className={styles.grid}>
          {data}
        </div>
      </main>
    </>
  )
}
