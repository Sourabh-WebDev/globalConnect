import { useState } from "react";
import axiosInstance from "~/utils/axiosInstance";

export default function TimesheetPage() {
    const API_URL = import.meta.env.VITE_API_URL;

    const [goalName, setGoalName] = useState("Finish UI for timesheet");
    const [target, setTarget] = useState("Build working UI and connect backend");
    const [goalDate, setGoalDate] = useState(new Date().toISOString().slice(0, 10));
    const [achieved, setAchieved] = useState("In Progress");
    const [loading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const [timeSlots, setTimeSlots] = useState<Record<string, string>>({
        status0002: "",
        status0204: "",
        status0406: "",
        status0608: "",
        status0810: "",
        status1012: "",
        status1214: "",
        status1416: "",
        status1618: "",
        status1820: "",
        status2022: "",
        status2224: "",
    });

    const handleChangeSlot = (key: string, value: string) => {
        setTimeSlots((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const saveTimesheet = async () => {
        const timesheet = {
            goalName,
            target,
            goalDate,
            achieved,
            ...timeSlots,
        };

        try {
            setLoading(true);
            setSuccessMsg("");
            setErrorMsg("");

            const response = await axiosInstance.post(`${API_URL}Timesheet/CreateTimesheet`, [timesheet]);

            if (response.status === 200 || response.status === 201) {
                setSuccessMsg("Timesheet saved successfully!");
            } else {
                setErrorMsg("Unexpected response. Please try again.");
            }
        } catch (error: any) {
            setErrorMsg(
                error.response?.data?.message || "Failed to save timesheet. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    const slotLabels: Record<string, string> = {
        status0002: "00:00–02:00",
        status0204: "02:00–04:00",
        status0406: "04:00–06:00",
        status0608: "06:00–08:00",
        status0810: "08:00–10:00",
        status1012: "10:00–12:00",
        status1214: "12:00–14:00",
        status1416: "14:00–16:00",
        status1618: "16:00–18:00",
        status1820: "18:00–20:00",
        status2022: "20:00–22:00",
        status2224: "22:00–24:00",
    };

    return (
        <div className="space-y-8">
            {/* Goal Details */}
            {successMsg && (
                <p className="text-green-600 text-sm mt-4 text-right">{successMsg}</p>
            )}
            {errorMsg && (
                <p className="text-red-600 text-sm mt-4 text-right">{errorMsg}</p>
            )}
            {loading && (
                <p className="text-gray-500 text-sm mt-4 text-right">Saving...</p>
            )}
            <section className="bg-white rounded-xl shadow p-6 space-y-4">
                <h2 className="text-lg font-semibold">🎯 Today’s Goal</h2>

                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium">Goal Name</label>
                    <input
                        type="text"
                        value={goalName}
                        onChange={(e) => setGoalName(e.target.value)}
                        className="border rounded px-3 py-2"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium">Target</label>
                    <input
                        type="text"
                        value={target}
                        onChange={(e) => setTarget(e.target.value)}
                        className="border rounded px-3 py-2"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium">Goal Date</label>
                    <input
                        type="date"
                        value={goalDate}
                        onChange={(e) => setGoalDate(e.target.value)}
                        className="border rounded px-3 py-2"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium">Achieved Status</label>
                    <select
                        value={achieved}
                        onChange={(e) => setAchieved(e.target.value)}
                        className="border rounded px-3 py-2"
                    >
                        <option>In Progress</option>
                        <option>Yes</option>
                        <option>No</option>
                    </select>
                </div>
            </section>

            {/* 2-Hour Reports */}
            <section className="bg-white rounded-xl shadow p-6">
                <h2 className="text-lg font-semibold mb-4">🕒 2-Hour Reports</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(timeSlots).map(([key, value]) => (
                        <div key={key} className="flex flex-col gap-1">
                            <label className="text-sm font-medium text-gray-700">{slotLabels[key]}</label>
                            <input
                                type="text"
                                value={value}
                                onChange={(e) => handleChangeSlot(key, e.target.value)}
                                className="border rounded px-3 py-2"
                                placeholder="Work summary"
                            />
                        </div>
                    ))}
                </div>

                <div className="mt-6 flex justify-end">
                    <button
                        onClick={saveTimesheet}
                        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
                    >
                        Save Timesheet
                    </button>
                </div>
            </section>
        </div>
    );
}
