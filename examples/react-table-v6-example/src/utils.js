// import namor from "namor";
const namor = {
  generate: () => "ABC" + Date.now(),
};
export class Person {
  constructor(id) {
    this.name = generateName();
    this.age = Math.floor(Math.random() * 100);
    // this.sex = Math.random() * 2 > 1 ? "M" : "F";
    this.sex = "M";
    this.degree = namor.generate({ words: 1, saltLength: 0 });
    this.weather = namor.generate({ words: 1, saltLength: 0 });
    this.friend = generateName();
    this.id = id ? id : parseInt(Math.random() * 10 ** 6);
  }
}

export function getData(count = 200) {
  const data = [];
  while (count--) data.push(new Person(count));
  return data;
}

export const generateName = () =>
  namor.generate({ words: 2, saltLength: 0, separator: " ", subset: "manly" });

export const updateName = (person) =>
  new Promise((resolve) => {
    const time = 200; // Math.random() * 500;
    setTimeout(() => {
      resolve({ ...person, name: generateName() });
    }, time);
  });
