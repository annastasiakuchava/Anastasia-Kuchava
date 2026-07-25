//1)
function removeLastChar(arr) {
    return arr.map(word => word.slice(0, -1));
}
//2)
function sumOfTwoSmallest(numbers) {
    if (numbers.length < 2) return 0;

    const sorted = [...numbers].sort((a, b) => a - b);
    
    return sorted[0] + sorted[1];
}
//3)
function calculateSumWithForEach(numbers) {
    let sum = 0;

    numbers.forEach(num => {
        sum += num;
    });

    return sum;
}
//4)
function processWords(arr) {
    return arr
        .filter(word => word.length > 5)
        .map(word => word.toUpperCase())
        .join("#");
}
//5)
function calculateClassAverages(students) {
    const classData = {};

    students.forEach(student => {
        const cls = student.cls;
        if (!classData[cls]) {
            classData[cls] = { totalGrade: 0, count: 0 };
        }
        classData[cls].totalGrade += student.grade;
        classData[cls].count += 1;
    });

    const averages = {};
    for (const cls in classData) {
        averages[cls] = classData[cls].totalGrade / classData[cls].count;
    }

    return averages;
}