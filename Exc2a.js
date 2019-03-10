var t1 = {
    root: 1,
    children: [
        {
            root: 2,
            children: [
                {
                    root: 5,
                    children: []
                }
            ]
        },
        {
            root: 3,
            children: []
        },
        {
            root: 4,
            children: []
        }
    ]
};
function sumTreeIf(Tree, predicate) {
    // return predicate(Tree.root) ? Tree.root : 0
    // return Tree.children.map(sumTreeIf).reduce(predicate,0);
    return predicate(Tree.root) ? Tree.children.reduce(function (acc, curr) { return sumTreeIf(curr, predicate) + acc; }, 0) + Tree.root : Tree.children.reduce(function (acc, curr) { return sumTreeIf(curr, predicate) + acc; }, 0);
    // sum = goodSalarys.reduce((acc,curr)=> acc + curr.salary, 0);
}
console.log(sumTreeIf(t1, function (n) { return true; })); // ==> 15
console.log(sumTreeIf(t1, function (n) { return n % 2 === 0; })); // ==> 6
