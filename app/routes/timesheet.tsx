'use client';

import { useEffect, useState } from 'react';
import { DatePicker, Spin, message } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import axios from 'axios';
import { useRouteError } from 'react-router';
import axiosInstance from '~/utils/axiosInstance';

const { RangePicker } = DatePicker;

type TimesheetEntry = {
    date: string;
    goal: string;
    reports: string[];
};

export default function ViewTimesheetPage() {
    const API_URL = import.meta.env.VITE_API_URL;

    const router = useRouteError();
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
        fetchTimesheet(); // Load all data by default
    }, []);

    const handleDateChange = (dates: [Dayjs | null, Dayjs | null] | null) => {
        setDateRange(dates);

        if (dates?.[0] && dates?.[1]) {
            const startISO = dates[0].startOf('day').toISOString();
            const endISO = dates[1].endOf('day').toISOString();
            fetchTimesheet(startISO, endISO);
        } else {
            fetchTimesheet(); // Reset to all if cleared
        }
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
                        // onClick={() => na.push("/timesheetAdd")}
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
                                <h2 className="text-lg font-semibold">{entry.date}</h2>
                                <span className="text-sm text-gray-500">Goal of the day</span>
                            </div>
                            <p className="mb-4 text-gray-700">🎯 <span className="font-medium">{entry.goal}</span></p>

                            <div className="space-y-2">
                                <h3 className="text-sm font-medium text-gray-600">2-Hour Reports:</h3>
                                {entry.reports.map((report, i) => (
                                    <div
                                        key={i}
                                        className="p-3 bg-gray-50 border border-gray-100 rounded"
                                    >
                                        <span className="font-medium text-gray-700">Entry {i + 1}:</span> {report}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
