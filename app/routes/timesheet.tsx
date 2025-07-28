'use client';

import { useEffect, useState } from 'react';
import { DatePicker, Spin, message } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router';
import axiosInstance from '~/utils/axiosInstance';

const { RangePicker } = DatePicker;

type TimesheetEntry = {
    goalName: string;
    target: string;
    goalDate: string;
    achieved: string;
    status0002: string;
    status0204: string;
    status0406: string;
    status0608: string;
    status0810: string;
    status1012: string;
    status1214: string;
    status1416: string;
    status1618: string;
    status1820: string;
    status2022: string;
    status2224: string;
};

const slotLabels: { key: keyof TimesheetEntry; label: string }[] = [
    { key: "status0002", label: "00:00 - 02:00" },
    { key: "status0204", label: "02:00 - 04:00" },
    { key: "status0406", label: "04:00 - 06:00" },
    { key: "status0608", label: "06:00 - 08:00" },
    { key: "status0810", label: "08:00 - 10:00" },
    { key: "status1012", label: "10:00 - 12:00" },
    { key: "status1214", label: "12:00 - 14:00" },
    { key: "status1416", label: "14:00 - 16:00" },
    { key: "status1618", label: "16:00 - 18:00" },
    { key: "status1820", label: "18:00 - 20:00" },
    { key: "status2022", label: "20:00 - 22:00" },
    { key: "status2224", label: "22:00 - 24:00" },
];


export default function ViewTimesheetPage() {
    const API_URL = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();

    const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null] | null>(null);
    const [data, setData] = useState<TimesheetEntry[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchTimesheet = async (start?: string, end?: string) => {
        setLoading(true);
        try {
            const params: any = {};
            if (start && end) {
                params.startDate = start;
                params.endDate = end;
            }

            const res = await axiosInstance.get<TimesheetEntry[]>(`${API_URL}timesheet`, { params });
            setData(res.data);
        } catch (err) {
            console.error(err);
            message.error('Failed to load timesheet data.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTimesheet();
    }, []);

    const handleDateChange = (dates: [Dayjs | null, Dayjs | null] | null) => {
        setDateRange(dates);

        if (dates?.[0] && dates?.[1]) {
            const startISO = dates[0].startOf('day').toISOString();
            const endISO = dates[1].endOf('day').toISOString();
            fetchTimesheet(startISO, endISO);
        } else {
            // 🟢 Clear filter → fetch all data
            fetchTimesheet(); // ← this ensures full dataset is shown
        }
    };


    const extractReports = (entry: TimesheetEntry): string[] => {
        const slots = [
            "status0002", "status0204", "status0406", "status0608",
            "status0810", "status1012", "status1214", "status1416",
            "status1618", "status1820", "status2022", "status2224"
        ];
        return slots
            .map((slot) => entry[slot as keyof TimesheetEntry])
            .filter((r) => r && r.trim() !== "");
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">📅 View Timesheet</h1>
                <div className="flex items-center gap-4">
                    <RangePicker
                        onChange={handleDateChange}
                        allowClear
                        className="bg-white p-1 rounded border"
                        format="YYYY-MM-DD"
                    />
                    <button
                        onClick={() => navigate("/timesheetAdd")}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Add Report
                    </button>
                </div>
            </div>

            {loading ? (
                <Spin tip="Loading timesheets..." />
            ) : data.length === 0 ? (
                <p className="text-gray-500">No entries in selected date range.</p>
            ) : (
                <div className="space-y-6">
                    {data.map((entry, idx) => (
                        <div
                            key={idx}
                            className="bg-white shadow rounded-xl p-6 border border-gray-200"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-semibold">{entry.goalDate}</h2>
                                <span className="text-sm text-gray-500">Goal of the day</span>
                            </div>
                            <p className="mb-4 text-gray-700">
                                🎯 <span className="font-medium">{entry.goalName}</span><br />
                                📌 Target: {entry.target}<br />
                                ✅ Achieved: {entry.achieved}
                            </p>

                            <div className="space-y-2">
                                <h3 className="text-sm font-medium text-gray-600">2-Hour Reports:</h3>
                                {slotLabels.map(({ key, label }, i) => {
                                    const value = entry[key];
                                    if (!value || value.trim() === "") return null;

                                    return (
                                        <div
                                            key={i}
                                            className="p-3 bg-gray-50 border border-gray-100 rounded"
                                        >
                                            <span className="font-medium text-gray-700">{label}:</span> {value}
                                        </div>
                                    );
                                })}

                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
