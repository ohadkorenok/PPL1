interface WordTree {
    root: string;
    children: WordTree[];
}

const t2: WordTree = {
    root: "Hello",
    children: [
        {
            root: "students,",
            children: [
                {
                    root: "how",
                    children: []
                }
            ]
        },
        {
            root: "are",
            children: [
                {
                    root: "you",
                    children: [
                        {
                            root: "doing",
                            children: []
                        }
                    ]
                },
                {
                    root: "this",
                    children: [
                        {
                            root: "fine",
                            children: []
                        }
                    ]
                }
            ]
        },
        {
            root: "assignment?",
            children: []

        }
    ]
};
function sentenceFromTree(Tree) {
    return Tree.root.concat(" ".concat(Tree.children.reduce(function (acc, curr) { return acc.concat(sentenceFromTree(curr)); }, "")));
}

console.log(sentenceFromTree(t2)); // ==> "Hello students, how are you doing this fine assignment?"