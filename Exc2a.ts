
interface NumberTree {
    root: number;
    children: NumberTree[];
}

const t1: NumberTree = {
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

function sumTreeIf(Tree: NumberTree, predicate: (x: number) => boolean): number {

    // return predicate(Tree.root) ? Tree.root : 0
    // return Tree.children.map(sumTreeIf).reduce(predicate,0);
    return predicate(Tree.root) ? Tree.children.reduce((acc, curr) => sumTreeIf(curr, predicate) + acc, 0) + Tree.root : Tree.children.reduce((acc, curr) => sumTreeIf(curr, predicate) + acc, 0);
    // sum = goodSalarys.reduce((acc,curr)=> acc + curr.salary, 0);


}

sumTreeIf(t1, n => true); // ==> 15
sumTreeIf(t1, n => n % 2 === 0); // ==> 6