interface Grade {
    course: string;
    grade: number;
}

interface Student {
    name: string;
    gender: string;
    grades: Grade[];
}

interface SchoolClass {
    classNumber: number;
    students: Student[];
}

type School = SchoolClass[];


Examples:
    let school1 = [
        {
            classNumber: 1,
            students: [
                {
                    name: "Moshe",
                    gender: "Male",
                    grades: [
                        {course: "math", grade: 38},
                        {course: "literature", grade: 68},
                        {course: "biology", grade: 5}
                    ]
                },
                {
                    name: "Ziva",
                    gender: "Female",
                    grades: [
                        {course: "math", grade: 67},
                        {course: "literature", grade: 68},
                        {course: "biology", grade: 100}
                    ]
                }
            ]
        },
        {
            classNumber: 2,
            students: [
                {
                    name: "Ifat",
                    gender: "Female",
                    grades: [
                        {course: "math", grade: 68},
                        {course: "literature", grade: 68},
                        {course: "biology", grade: 90}
                    ]
                },
                {
                    name: "Tomer",
                    gender: "Male",
                    grades: [
                        {course: "math", grade: 70},
                        {course: "literature", grade: 68},
                        {course: "biology", grade: 100}
                    ]
                }
            ]
        }
    ];
console.log(hasSomeoneFailedBiology(school1)); // ==> false
console.log(allGirlsPassMath(school1));


function studentFailedInBiology(curr: Student): Boolean {
    return curr.grades.reduce(function (acc: Boolean, curr: Grade) {
        return (curr.course === 'biology' && curr.grade < 56) || acc;
    }, false)
}

function someoneInClassFailedBiology(schoolClass: SchoolClass) {
    return schoolClass.students.reduce(function (acc, curr) {
        return studentFailedInBiology(curr) || acc;
    }, false)
}

function hasSomeoneFailedBiology(schoolObject: School) {
    return schoolObject.reduce(function (acc, curr) {
        return someoneInClassFailedBiology(curr) || acc
    }, false);
}

function girlPassedMath(student: Student) {
    if (student.gender === 'Male') {
        return true;
    } else {
        return student.grades.reduce(function (acc, curr) {
            return (curr.course!='math' || (curr.course === 'math' && curr.grade >= 56) )&& acc;
        }, true);
    }
}

function allGirlsInClassPassMath(schoolClass: SchoolClass) {
    return schoolClass.students.reduce(function (acc, curr) {
        return girlPassedMath(curr) && acc;
    }, true);
}

function allGirlsPassMath(schoolObject) {
    return schoolObject.reduce(function (acc, curr) {
        return allGirlsInClassPassMath(curr) && acc;
    }, true);

}

