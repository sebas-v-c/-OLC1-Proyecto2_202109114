/*
 * the following code is adapted from the Github repository:
 * Repostitory: https://github.com/manuarora700/react-code-editor
 * File: /src/constants/statuses.js
 * Author: manuarora700
 * Description: an array of statuses to control the editor
 */


type Status = {
    id: number;
    desc: string;
};

export const statuses: Status[] = [
    {
        id: 1,
        desc: "In Queue",
    },
    {
        id: 2,
        desc: "Processing",
    },
    {
        id: 3,
        desc: "Accepted"
    },
    {
        id: 4,
        desc: "wrong Answer",
    },
    {
        id: 5,
        desc: "Time Limit Exceeded",
    },
    {
        id: 6,
        desc: "Compilation Error"
    },
    {
        id: 7,
        desc: "Runtime Error"
    },
    {
        id: 13,
        desc: "Internal Error",
    },
    {
        id: 14,
        desc: "Exec Format Error"
    }

];
