import { Quiz } from '../models/Quiz';

const dummyQuizzes = [
  { question: "რა არის საქართველოს დედაქალაქი?", options: ["ბათუმი", "თბილისი", "ქუთაისი", "გორი"], correctAnswer: "თბილისი" },
  { question: "რომელი პლანეტაა მზესთან ყველაზე ახლოს?", options: ["ვენერა", "დედამიწა", "მერკური", "მარსი"], correctAnswer: "მერკური" },
  { question: "რას უდრის წყლის დუღილის ტემპერატურა?", options: ["50°C", "90°C", "100°C", "120°C"], correctAnswer: "100°C" },
  { question: "ვინ დაწერა 'ვეფხისტყაოსანი'?", options: ["აკაკი წერეთელი", "შოთა რუსთაველი", "ილია ჭავჭავაძე", "გალაკტიონი"], correctAnswer: "შოთა რუსთაველი" },
  { question: "რომელია ყველაზე დიდი ოკეანე?", options: ["ატლანტის", "ინდოეთის", "ჩრდილო ყინულოვანი", "წყნარი"], correctAnswer: "წყნარი" },
  { question: "რამდენი ფერია ცისარტყელაში?", options: ["5", "6", "7", "8"], correctAnswer: "7" },
  { question: "რომელი წელია ახლა?", options: ["2024", "2025", "2026", "2027"], correctAnswer: "2026" },
  { question: "რა არის HTML?", options: ["პროგრამირების ენა", "მარკირების ენა", "ბაზა", "ოპერაციული სისტემა"], correctAnswer: "მარკირების ენა" },
  { question: "რომელ კონტინენტზეა ეგვიპტე?", options: ["აზია", "ევროპა", "აფრიკა", "ამერიკა"], correctAnswer: "აფრიკა" },
  { question: "რა არის JavaScript-ის რეალური გაფართოება?", options: [".java", ".js", ".html", ".css"], correctAnswer: ".js" }
];

export const seedDatabase = async () => {
  const count = await Quiz.countDocuments();
  if (count === 0) {
    await Quiz.insertMany(dummyQuizzes);
    console.log("10 საწყისი ქუიზი წარმატებით დაემატა ბაზაში!");
  }
};