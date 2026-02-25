import { useCallback, useContext } from "react";
import { AuthContext } from "../context/auth-context";
const url = process.env.REACT_APP_SCREENINGS

export const useScreenings = () => {
    const auth = useContext(AuthContext);
    const userId = auth?.user?._id;

    //GET screenings for a user
    const getScreenings = useCallback(async () => {
        try {
            const response = await fetch(`${url}/get-screenings/${userId}`, { headers: { Authorization: `Bearer ${auth?.token}` } })
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message);
            }
            return {
                screenings: data.screenings,
                page: data.pageNum,
                totalPages: data.totalPages,
                totalScreenings: data.totalScreenings,
            };
        } catch(err) {
            console.log(err);
            throw err;
        }
    }, [auth?.token, userId]);

    // POST create screening
    const createScreening = useCallback(async (screening) => {
        try {
            const response = await fetch(`${url}/create-screening/${userId}`, {
                method: "POST",
                body: JSON.stringify({ 
                    screening, 
                    title: screening.title,
                    description: screening.description,
                    jobId: screening.jobId,
                    date: screening.date,
                    maxTimeAllowed: screening.maxTimeAllowed,
                    totalScore: screening.totalScore,
                    questions: screening.questions,
                  }),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${auth?.token}`
                } 
            })
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Failed to create screening.");
            }
            return data;
        } catch(err) {
            console.log(err);
            throw err;
        }
    }, [auth?.token, userId]);

    // POST sendout screening
    const sendoutScreening = useCallback(async (screeningId) => {
        try {
            const response = await fetch(`${url}/sendout-screening/${screeningId}/${userId}`, {
                method: "POST",
                body: JSON.stringify({}), 
                headers: { Authorization: `Bearer ${auth?.token}` } 
            })
            if (!response.ok) {
                throw new Error(response.message);
            }
            return response.message;
        } catch(err) {
            console.log(err);
            throw err;
        }
    }, [auth?.token, userId]);

    // PATCH update screening
    const updateScreening = useCallback(async (screeningId) => {
        try {
            const response = await fetch(`${url}/update-screening/${screeningId}/${userId}`, {
                method: "PATCH",
                body: JSON.stringify({}), 
                headers: { Authorization: `Bearer ${auth?.token}` } 
            })
            if (!response.ok) {
                throw new Error(response.message);
            }
            return response.message;
        } catch(err) {

        }
    }, [auth?.token, userId]);

    // PATCH update screening
    const updateScreeningResults = useCallback(async (screeningId) => {
        try {
            const response = await fetch(`${url}/update-screening-results/${screeningId}/${userId}`, {
                method: "PATCH",
                body: JSON.stringify({}), 
                headers: { Authorization: `Bearer ${auth?.token}` } 
            })
            if (!response.ok) {
                throw new Error(response.message);
            }
            return response.message;
        } catch(err) {
            console.log(err);
            throw err;
        }
    }, [auth?.token, userId]);

    // DELETE delete screening
    const deleteScreening = useCallback(async (screeningId) => {
        try {
            const response = await fetch(`${url}/delete-screening/${screeningId}/${userId}`, {
                method: "DELETE",
                body: JSON.stringify({}), 
                headers: { Authorization: `Bearer ${auth?.token}` } 
            })
            if (!response.ok) {
                throw new Error(response.message);
            }
            return response.message;
        } catch(err) {
            console.log(err);
            throw err;
        }
    }, [auth?.token, userId]);

    return {
        getScreenings,
        createScreening,
        sendoutScreening,
        updateScreening,
        updateScreeningResults,
        deleteScreening,
    }
}