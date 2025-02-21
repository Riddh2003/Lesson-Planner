import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { fetchGeminiResponse } from "../api/GeminiAPI";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { jsPDF } from "jspdf";
import { Loader } from '../components/Loader.jsx';

export const PlannerAI = () => {
    const { register, handleSubmit, reset } = useForm();
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);

    const submitHandler = async (data) => {
        setLoading(true);
        const aiResponse = await fetchGeminiResponse(
            data.subject,
            data.topic,
            data.duration
        );

        if (aiResponse) {
            setResponse(aiResponse.candidates[0]?.content?.parts[0]?.text || "No Response Generated...");
        }
        setLoading(false);
        reset();
    };

    const downloadPDF = (title, response) => {
        const doc = new jsPDF();
        doc.setFont("helvetica", "bold");
        doc.setFontSize(18);
        doc.text(title, 14, 20);

        let yPos = 30; // Initial Y position
        const pageHeight = doc.internal.pageSize.height;
        const margin = 4;

        response.split("\n").forEach((line) => {
            if ((line.startsWith("**") && line.endsWith("**")) || (line.startsWith("##"))) {
                doc.setFont("helvetica", "bold");
                doc.setFontSize(12);
                line = line.replace(/\*/g, "").trim();
            } else if (line.match(/\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/)) {
                const [_, text, url] = line.match(/\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/);
                doc.setTextColor(0, 0, 255);
                doc.textWithLink(text, 14, yPos, { url });
                doc.setTextColor(0, 0, 0);
                yPos += 10;
                return;
            } else {
                doc.setFont("helvetica", "normal");
                doc.setFontSize(12);
            }

            let splitText = doc.splitTextToSize(line, 180);
            let lineHeight = doc.getTextDimensions(splitText).h + 5;

            if (yPos + lineHeight > pageHeight - margin) {
                doc.addPage();
                yPos = 20;
            }

            doc.text(splitText, 14, yPos);
            yPos += lineHeight;
        });

        doc.save(`${title}.pdf`);
    };

    return (
        <div className="w-full min-h-screen flex flex-col gap-6 items-center justify-start p-4 z-10 overflow-auto">
            <form onSubmit={handleSubmit(submitHandler)} className="bg-[#0c111c86] border-2 border-[#33ccff] flex flex-col gap-4 p-8 shadow-lg max-w-lg w-full text-[#33ccff] rounded-lg">
                <h2 className="text-xl font-semibold text-center">AI Task Planner</h2>
                <Input {...register("subject", { required: true })} placeholder="Enter Subject (e.g., Math, Science)" className="border-2 border-gray-300 rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-purple-900 text-white" />
                <Input {...register("topic", { required: true })} placeholder="Enter Lesson Topic" className="border-2 border-gray-300 rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-purple-900 text-white" />
                <Input {...register("duration", { required: true })} placeholder="Lesson Duration (in days)" className="border-2 border-gray-300 rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-purple-900 text-white" />
                <Button type="submit" className="bg-[#33ccff] hover:bg-white text-white hover:text-[#26c9ff] px-4 py-2 rounded transition duration-300">
                    {loading ? <Loader /> : "Generate Lesson Plan"}
                </Button>
            </form>

            {response && (
                <Card className="w-full max-w-7xl mt-6 bg-[#0c111c86] border-2 border-[#33ccff] text-[#33ccff] rounded-lg">
                    <CardHeader className="flex flex-row justify-between items-center p-4 bg-[#0c111c86] border-b-2 border-[#33ccff]">
                        <CardTitle className="text-2xl">Task Planner</CardTitle>
                        <Button
                            onClick={() => { downloadPDF('Lesson Plan', response) }} className="text-white bg-[#33ccff] hover:bg-white hover:text-[#26c9ff] duration-300 text-lg p-2 rounded">
                            📄 Download PDF
                        </Button>
                    </CardHeader>
                    <CardContent className="p-4 text-justify space-y-3 overflow-y-auto">
                        {response.split("\n").map((line, index) => {
                            const isTitle = line.startsWith("**") && line.endsWith("**");
                            const isBullet = line.startsWith("*") || line.startsWith("-");
                            const isLink = line.match(/\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/);

                            if (isTitle) {
                                const formattedLine = line.replace(/^\*\*|\*\*$/g, "").trim();
                                return (
                                    <h3 key={index} className="text-xl font-bold mt-4">
                                        {formattedLine}
                                    </h3>
                                );
                            }

                            if (isLink) {
                                const text = isLink[1];
                                const url = isLink[2];
                                return (
                                    <p key={index} className="ml-4">
                                        🔗 <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                                            {text}
                                        </a>
                                    </p>
                                );
                            }

                            if (isBullet) {
                                return (
                                    <p key={index} className="ml-6 list-disc">
                                        {line.replace(/^\*|-/, "").trim()}
                                    </p>
                                );
                            }
                            return <p key={index} className="">{line}</p>;
                        })}
                    </CardContent>
                </Card>
            )}
        </div>
    );
};
