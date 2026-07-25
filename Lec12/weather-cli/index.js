#!/usr/bin/env node

import { Command } from 'commander';

const program = new Command();
const API_KEY = '895284fb2d2c50a520ea537456963d9c';

program
  .name('weather-cli')
  .description('Check weather info via CLI')
  .arguments('<cityName>')
  .action(async (cityName) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.cod !== 200) {
        console.error(`შეცდომა: ქალაქი "${cityName}" ვერ მოიძებნა! (სტატუსი: ${data.message})`);
        return;
      }

      console.log(`🌍 ამინდი ქალაქში: ${data.name}, ${data.sys.country}`);
      console.log(`🌡️  ტემპერატურა: ${data.main.temp}°C (იგრძნობა როგორც: ${data.main.feels_like}°C)`);
      console.log(`☁️  აღწერა: ${data.weather[0].description}`);
      console.log(`💧 ტენიანობა: ${data.main.humidity}%`);

    } catch (error) {
      console.error('სერვერთან კავშირი ვერ დამყარდა:', error.message);
    }
  });

program.parse(process.argv);