"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { format } from "date-fns";
import { useToast } from "@/components/ui/use-toast";

interface BreastfeedingRecord {
  _id: string;
  date: string;
  time: string;
  duration: number;
  side: string;
  position: string;
  latchQuality: number;
  notes: string;
  analysis?: string;
}

export default function BreastfeedingPage() {
  const { data: session } = useSession();
  const { setToast } = useToast();
  const [records, setRecords] = useState<BreastfeedingRecord[]>([]);
  const [newRecord, setNewRecord] = useState({
    date: format(new Date(), "yyyy-MM-dd"),
    time: format(new Date(), "HH:mm"),
    duration: 15,
    side: "left",
    position: "cradle",
    latchQuality: 3,
    notes: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const response = await fetch("/api/postpartum-breastfeeding");
      if (response.ok) {
        const data = await response.json();
        setRecords(data);
      }
    } catch (error) {
      console.error("Error fetching records:", error);
      setToast({
        title: "Error",
        description: "Failed to fetch records",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // First get AI analysis
      const analysisResponse = await fetch("/api/analyze-breastfeeding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRecord),
      });

      const analysisData = await analysisResponse.json();

      // Then save the record with analysis
      const response = await fetch("/api/postpartum-breastfeeding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...newRecord,
          analysis: analysisData.analysis,
        }),
      });

      if (response.ok) {
        const savedRecord = await response.json();
        setRecords([savedRecord, ...records]);
        setNewRecord({
          date: new Date().toISOString().split("T")[0],
          time: new Date().toLocaleTimeString(),
          duration: 0,
          side: "left",
          position: "",
          latchQuality: 3,
          notes: "",
        });
        setToast({
          title: "Success",
          description: "Record added successfully",
        });
      }
    } catch (error) {
      console.error("Error saving record:", error);
      setToast({
        title: "Error",
        description: "Failed to save record",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!session) {
    return <div>Please sign in to view this page.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Breastfeeding Tracker</h1>

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">Date</label>
            <input
              type="date"
              value={newRecord.date}
              onChange={(e) =>
                setNewRecord({ ...newRecord, date: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-2">Time</label>
            <input
              type="time"
              value={newRecord.time}
              onChange={(e) =>
                setNewRecord({ ...newRecord, time: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-2">Duration (minutes)</label>
            <input
              type="number"
              value={newRecord.duration}
              onChange={(e) =>
                setNewRecord({ ...newRecord, duration: parseInt(e.target.value) })
              }
              className="w-full p-2 border rounded"
              min="1"
              required
            />
          </div>

          <div>
            <label className="block mb-2">Side</label>
            <select
              value={newRecord.side}
              onChange={(e) =>
                setNewRecord({ ...newRecord, side: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            >
              <option value="left">Left</option>
              <option value="right">Right</option>
              <option value="both">Both</option>
            </select>
          </div>

          <div>
            <label className="block mb-2">Position</label>
            <select
              value={newRecord.position}
              onChange={(e) =>
                setNewRecord({ ...newRecord, position: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            >
              <option value="cradle">Cradle</option>
              <option value="cross-cradle">Cross-Cradle</option>
              <option value="football">Football</option>
              <option value="side-lying">Side-Lying</option>
            </select>
          </div>

          <div>
            <label className="block mb-2">Latch Quality (1-5)</label>
            <input
              type="range"
              min="1"
              max="5"
              value={newRecord.latchQuality}
              onChange={(e) =>
                setNewRecord({
                  ...newRecord,
                  latchQuality: parseInt(e.target.value),
                })
              }
              className="w-full"
            />
            <div className="text-center">{newRecord.latchQuality}</div>
          </div>

          <div className="md:col-span-2">
            <label className="block mb-2">Notes</label>
            <textarea
              value={newRecord.notes}
              onChange={(e) =>
                setNewRecord({ ...newRecord, notes: e.target.value })
              }
              className="w-full p-2 border rounded"
              rows={3}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {isLoading ? "Saving..." : "Save Record"}
        </button>
      </form>

      <div className="space-y-4">
        {records.map((record) => (
          <div key={record._id} className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold">
                {new Date(record.date).toLocaleDateString()} at {record.time}
              </h2>
              <div className="text-sm text-gray-500">
                Duration: {record.duration} minutes
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <h3 className="font-semibold mb-1">Side</h3>
                <p className="text-gray-600">{record.side}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Position</h3>
                <p className="text-gray-600">{record.position}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Latch Quality</h3>
                <p className="text-gray-600">{record.latchQuality}/5</p>
              </div>
            </div>

            {record.notes && (
              <div className="mb-4">
                <h3 className="font-semibold mb-1">Notes</h3>
                <p className="text-gray-600">{record.notes}</p>
              </div>
            )}

            {record.analysis && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-blue-800">AI Analysis</h3>
                <p className="text-blue-700">{record.analysis}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 