import { useState, useEffect } from 'react';
import AdminDashboard from './components/AdminDashboard';
import FlatOwnerDashboard from './components/FlatOwnerDashboard';
import { Users, User } from 'lucide-react';

function generateMLPredictions(dailyData: any[]) {
  const avgMorningUsage = dailyData.reduce((acc, d) => acc + d.waterUsage * 0.4, 0) / dailyData.length;
  const avgEveningUsage = dailyData.reduce((acc, d) => acc + d.waterUsage * 0.6, 0) / dailyData.length;

  const predictions = [
    { time: '06:00 AM', prediction: avgMorningUsage > 100 ? 'ON' : 'OFF', confidence: 92 },
    { time: '09:00 AM', prediction: 'OFF', confidence: 88 },
    { time: '12:00 PM', prediction: avgMorningUsage > 80 ? 'ON' : 'OFF', confidence: 85 },
    { time: '06:00 PM', prediction: avgEveningUsage > 120 ? 'ON' : 'OFF', confidence: 94 },
    { time: '08:00 PM', prediction: 'ON', confidence: 91 },
    { time: '10:00 PM', prediction: 'OFF', confidence: 89 },
  ];

  return predictions as Array<{ time: string; prediction: 'ON' | 'OFF'; confidence: number }>;
}

export default function App() {
  const [userRole, setUserRole] = useState<'admin' | 'owner'>('admin');
  const [selectedFlat, setSelectedFlat] = useState('101');

  const flatsData = [
    { flatNumber: '101', owner: 'Rajesh Kumar', waterUsage: 450.5, powerSaved: 2.3, bill: 675.75, status: 'normal' as const },
    { flatNumber: '102', owner: 'Priya Sharma', waterUsage: 520.2, powerSaved: 1.8, bill: 780.30, status: 'high' as const },
    { flatNumber: '103', owner: 'Amit Patel', waterUsage: 380.0, powerSaved: 2.7, bill: 570.00, status: 'low' as const },
    { flatNumber: '104', owner: 'Sneha Reddy', waterUsage: 495.8, powerSaved: 2.1, bill: 743.70, status: 'normal' as const },
    { flatNumber: '105', owner: 'Vikram Singh', waterUsage: 410.3, powerSaved: 2.5, bill: 615.45, status: 'normal' as const },
    { flatNumber: '106', owner: 'Anita Desai', waterUsage: 560.1, powerSaved: 1.6, bill: 840.15, status: 'high' as const },
  ];

  const dailyDataMap: Record<string, any[]> = {
    '101': [
      { day: 'Day 1', waterUsage: 420, motorOn: 45, powerUsed: 2.1 },
      { day: 'Day 2', waterUsage: 445, motorOn: 48, powerUsed: 2.2 },
      { day: 'Day 3', waterUsage: 460, motorOn: 50, powerUsed: 2.3 },
      { day: 'Day 4', waterUsage: 430, motorOn: 46, powerUsed: 2.0 },
      { day: 'Day 5', waterUsage: 450, motorOn: 47, powerUsed: 2.1 },
    ],
    '102': [
      { day: 'Day 1', waterUsage: 500, motorOn: 52, powerUsed: 2.5 },
      { day: 'Day 2', waterUsage: 530, motorOn: 55, powerUsed: 2.6 },
      { day: 'Day 3', waterUsage: 525, motorOn: 54, powerUsed: 2.5 },
      { day: 'Day 4', waterUsage: 510, motorOn: 53, powerUsed: 2.4 },
      { day: 'Day 5', waterUsage: 520, motorOn: 54, powerUsed: 2.5 },
    ],
    '103': [
      { day: 'Day 1', waterUsage: 370, motorOn: 40, powerUsed: 1.8 },
      { day: 'Day 2', waterUsage: 385, motorOn: 42, powerUsed: 1.9 },
      { day: 'Day 3', waterUsage: 375, motorOn: 41, powerUsed: 1.8 },
      { day: 'Day 4', waterUsage: 390, motorOn: 43, powerUsed: 2.0 },
      { day: 'Day 5', waterUsage: 380, motorOn: 41, powerUsed: 1.9 },
    ],
  };

  const totalWaterUsage = flatsData.reduce((acc, flat) => acc + flat.waterUsage, 0);
  const totalPowerSaved = flatsData.reduce((acc, flat) => acc + flat.powerSaved, 0);
  const totalBill = flatsData.reduce((acc, flat) => acc + flat.bill, 0);

  const currentFlatData = flatsData.find(f => f.flatNumber === selectedFlat) || flatsData[0];
  const currentDailyData = dailyDataMap[selectedFlat] || dailyDataMap['101'];
  const predictions = generateMLPredictions(currentDailyData);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl">Smart Water Management System</h1>
            <p className="text-gray-600">ML-powered water motor control & analytics</p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setUserRole('admin')}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                userRole === 'admin'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border'
              }`}
            >
              <Users className="w-4 h-4" />
              Admin View
            </button>
            <button
              onClick={() => setUserRole('owner')}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                userRole === 'owner'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border'
              }`}
            >
              <User className="w-4 h-4" />
              Owner View
            </button>
          </div>
        </div>

        {userRole === 'owner' && (
          <div className="mb-4">
            <label className="block text-sm mb-2">Select Your Flat:</label>
            <select
              value={selectedFlat}
              onChange={(e) => setSelectedFlat(e.target.value)}
              className="px-4 py-2 border rounded-lg bg-white"
            >
              {flatsData.map((flat) => (
                <option key={flat.flatNumber} value={flat.flatNumber}>
                  Flat {flat.flatNumber} - {flat.owner}
                </option>
              ))}
            </select>
          </div>
        )}

        {userRole === 'admin' ? (
          <AdminDashboard
            flatsData={flatsData}
            totalWaterUsage={totalWaterUsage}
            totalPowerSaved={totalPowerSaved}
            totalBill={totalBill}
          />
        ) : (
          <FlatOwnerDashboard
            flatNumber={currentFlatData.flatNumber}
            owner={currentFlatData.owner}
            dailyData={currentDailyData}
            currentUsage={currentFlatData.waterUsage}
            powerSaved={currentFlatData.powerSaved}
            bill={currentFlatData.bill}
            predictions={predictions}
          />
        )}
      </div>
    </div>
  );
}