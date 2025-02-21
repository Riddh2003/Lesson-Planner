import axios from "axios";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

export const fetchGeminiResponse = async (subject, topic, duration) => {
    try {
        const prompt = `Create a structured lesson plan for a student on the topic of "${topic}" in ${subject}. 
        The lesson should be around ${duration} days long and include:
        - Learning Objectives
        - Key Topics -> for each topic, specify how many days to complete within ${duration} days. If it's a one-day lesson, specify how many hours to complete.
        - References (Websites) -> provide 2 to 3 website references
        - Questions -> provide a minimum of 10 questions`;

        const response = await axios.post(
            `${API_URL}?key=${API_KEY}`,
            {
                contents: [{ parts: [{ text: prompt }] }],
            }
        );

        return response.data;
    } catch (error) {
        console.error("Error fetching Gemini AI response:", error);
        return null;
    }
};

