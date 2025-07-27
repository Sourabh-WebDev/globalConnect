import { useState } from "react";

export default function TimesheetPage() {
    const [goal, setGoal] = useState("Finish UI for timesheet");
    const [reports, setReports] = useState<string[]>([]);
    const [newReport, setNewReport] = useState("");

    const addReport = () => {
        if (newReport.trim()) {
            setReports([...reports, newReport]);
            setNewReport("");
        }
    };

    return (
        <div className="space-y-8">
            {/* Today's Goal */}
            <section className="bg-white rounded-xl shadow p-6">
                <h2 className="text-lg font-semibold mb-2">🎯 Today’s Goal</h2>
                <div className="flex items-center gap-4">
                    <input
                        type="text"
                        value={goal}
                        onChange={(e) => setGoal(e.target.value)}
                        className="flex-1 border border-gray-300 rounded px-3 py-2"
                    />
                    <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                        Save
                    </button>
                </div>
            </section>

            {/* 2-Hour Reports */}
            <section className="bg-white rounded-xl shadow p-6">
                <h2 className="text-lg font-semibold mb-4">🕒 2-Hour Reports</h2>
                <div className="space-y-4">
                    {reports.length === 0 && <p className="text-gray-500">No reports yet.</p>}
                    {reports.map((report, i) => (
                        <div
                            key={i}
                            className="p-3 border border-gray-200 rounded bg-gray-50"
                        >
                            <span className="font-medium text-gray-700">Entry {i + 1}:</span> {report}
                        </div>
                    ))}
                </div>

                <div className="mt-6 flex items-center gap-4">
                    <textarea
                        rows={2}
                        value={newReport}
                        onChange={(e) => setNewReport(e.target.value)}
                        placeholder="What did you work on in the last 2 hours?"
                        className="flex-1 border border-gray-300 rounded px-3 py-2"
                    />
                    <button
                        onClick={addReport}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                        Add
                    </button>
                </div>
            </section>
        </div>
    );
}
