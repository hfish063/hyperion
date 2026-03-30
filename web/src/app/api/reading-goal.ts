import apiFetch from "./api";

export type ReadingGoal = {
    id: number;
    name: string;
    type: ReadingGoalType;
    startDate: Date;
    endDate: Date;
}

export enum ReadingGoalType {
    BOOKS,
    PAGES,
    HOURS
}

export default async function findAllReadingGoals() {
    const query = `/goals/all`;

    const results = await apiFetch(query)

    if (!results.ok) return undefined;

    const data = (await results.json()) as ReadingGoal[]

    return data
}

export async function saveReadingGoal(newReadingGoal: ReadingGoal) {
    const query = `/goals/save`;

    const headers: HeadersInit = {
        "Content-Type": "application/json",
    };

    const options: RequestInit = {
        headers: headers,
        method: "POST",
        body: JSON.stringify(newReadingGoal),
    };

    const results = await apiFetch(query, options)

    if (!results.ok) return undefined;

    const data = (await results.json()) as ReadingGoal

    return data;
}

export async function deleteReadingGoalById(id: number) {
    const query = `/goals/delete/${id}`;

    const headers: HeadersInit = {
        "Content-Type": "application/json",
    };

    const options: RequestInit = {
        headers: headers,
        method: "DELETE",
    };

    const results = await apiFetch(query, options)

    return results.ok
}