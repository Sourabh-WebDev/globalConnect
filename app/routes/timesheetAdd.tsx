import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import axiosInstance from "~/utils/axiosInstance";

export default function TimesheetPage() {
    const API_URL = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    const [goalName, setGoalName] = useState("");
    const [target, setTarget] = useState("");
    const [goalDate, setGoalDate] = useState(new Date().toISOString().slice(0, 10));
    const [achieved, setAchieved] = useState("In Progress");
    const [remark, setRemark] = useState(""); // ✅ New field
    const [loading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const [timeSlots, setTimeSlots] = useState<Record<string, string>>({
        status0002: "Sleeping Time",
        status0204: "Sleeping Time",
        status0406: "Sleeping Time",
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
            remark, // ✅ Include remark in submission
            ...timeSlots,
        };

        try {
            setLoading(true);
            setSuccessMsg("");
            setErrorMsg("");

            const response = await axiosInstance.post(`${API_URL}Timesheet/CreateTimesheet`, [timesheet]);

            if (response.status === 200 || response.status === 201) {
                setGoalName("");
                setTarget("");
                setGoalDate(new Date().toISOString().slice(0, 10));
                setAchieved("In Progress");
                setRemark("");
                setTimeSlots({
                    status0002: "Sleeping Time",
                    status0204: "Sleeping Time",
                    status0406: "Sleeping Time",
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
                navigate("/timesheet");
                toast.success("Timesheet saved successfully!");

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
        status2224: "10:00 PM–12:00 AM",
        status2022: "8:00 PM–10:00 PM",
        status1820: "6:00 PM–8:00 PM",
        status1618: "4:00 PM–6:00 PM",
        status1416: "2:00 PM–4:00 PM",
        status1214: "12:00 PM–2:00 PM",
        status1012: "10:00 AM–12:00 PM",
        status0810: "8:00 AM–10:00 AM",
        status0608: "6:00 AM–8:00 AM",
        status0406: "4:00 AM–6:00 AM",
        status0204: "2:00 AM–4:00 AM",
        status0002: "12:00 AM–2:00 AM",
    };

    const nightSlots = ["status0002", "status0204", "status0406"];

    return (
        <div className="space-y-8">


            {/* Goal Details */}
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

                {/* ✅ Remark field */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium">Remark</label>
                    <input
                        type="text"
                        value={remark}
                        onChange={(e) => setRemark(e.target.value)}
                        className="border rounded px-3 py-2"
                        placeholder="Any additional comment"
                    />
                </div>
            </section>

            {/* 2-Hour Reports */}
            <section className="bg-white rounded-xl shadow p-6">
                <h2 className="text-lg font-semibold mb-4">🕒 2-Hour Reports</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(timeSlots).map(([key, value]) => (
                        <div
                            key={key}
                            className={`flex flex-col gap-1 p-2 rounded ${nightSlots.includes(key) ? "bg-gray-100 border-l-4 border-blue-400" : ""
                                }`}
                        >
                            <label className="text-sm font-medium text-gray-700">
                                {slotLabels[key]}
                            </label>
                            <input
                                type="text"
                                value={value}
                                onChange={(e) => handleChangeSlot(key, e.target.value)}
                                className="border rounded px-3 py-2"
                                placeholder="Work summary"
                            // disabled={nightSlots.includes(key)}
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

            {successMsg && (
                <p className="text-green-600 text-sm mt-4 text-right">{successMsg}</p>
            )}
            {errorMsg && (
                <p className="text-red-600 text-sm mt-4 text-right">{errorMsg}</p>
            )}
            {loading && (
                <p className="text-gray-500 text-sm mt-4 text-right">Saving...</p>
            )}
        </div>
    );
}
