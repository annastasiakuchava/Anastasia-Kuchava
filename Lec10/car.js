import fs from 'fs/promises';

const [, , arg1, arg2, arg3] = process.argv;

async function getCars() {
  try {
    const data = await fs.readFile('cars.json', 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function handleCarCLI() {
  const cars = await getCars();

  if (arg1 === 'show') {
    const filterValue = arg2?.toLowerCase();
    if (!filterValue) {
      console.log('ყველა მანქანა:', cars);
      return;
    }

    const filteredCars = cars.filter(car => 
      car.carReleaseDate === filterValue || car.carColor.toLowerCase() === filterValue
    );

    console.log(`გაფილტრული მანქანები (${filterValue}):`, filteredCars);

  } else {
    const carName = arg1;
    const carReleaseDate = arg2;
    const carColor = arg3;

    if (!carName || !carReleaseDate || !carColor) {
      console.log('გთხოვთ შეიყვანოთ: სახელი, წელი და ფერი. მაგალითად: node car.js Ferrari 2020 red');
      return;
    }

    cars.push({ carName, carReleaseDate, carColor });
    await fs.writeFile('cars.json', JSON.stringify(cars, null, 2));
    console.log(`${carName} წარმატებით დაემატა ბაზაში!`);
  }
}

handleCarCLI();