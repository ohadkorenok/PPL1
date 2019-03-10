function averageSalaryOver9000(employees){
    const goodSalarys= employees.filter((x)=>x.salary>9000);
    console.log("Good salaries are:" +goodSalarys);
    sum = goodSalarys.reduce((acc,curr)=> acc + curr.salary, 0);
    console.log("sum is: "+sum);
}

employ = [{name: "Moshe", salary: 5600}, {name: "Dorit", salary: 7800},
    {name: "Naama", salary: 10000},{name: "Dani", salary: 9600}];

averageSalaryOver9000(employ);