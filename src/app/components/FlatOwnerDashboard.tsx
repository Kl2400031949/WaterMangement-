import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Droplets, Zap, IndianRupee, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';

interface DayData {
  day: string;
  waterUsage: number;
  motorOn: number;
  powerUsed: number;
}

interface Prediction {
  time: string;
  prediction: 'ON' | 'OFF';
  confidence: number;
}

interface Props {
  flatNumber: string;
  owner: string;
  dailyData: DayData[];
  currentUsage: number;
  powerSaved: number;
  bill: number;
  predictions: Prediction[];
}

export default function FlatOwnerDashboard({
  flatNumber,
  owner,
  dailyData,
  currentUsage,
  powerSaved,
  bill,
  predictions,
}: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl">Flat {flatNumber}</h2>
        <p className="text-gray-600">Owner: {owner}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Water Usage</CardTitle>
            <Droplets className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{currentUsage.toFixed(1)} L</div>
            <p className="text-xs text-gray-600">Today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Power Saved</CardTitle>
            <Zap className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{powerSaved.toFixed(2)} kWh</div>
            <p className="text-xs text-gray-600">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Water Bill</CardTitle>
            <IndianRupee className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">₹{bill.toFixed(2)}</div>
            <p className="text-xs text-gray-600">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Avg Usage</CardTitle>
            <Activity className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">
              {(dailyData.reduce((acc, d) => acc + d.waterUsage, 0) / dailyData.length).toFixed(1)} L
            </div>
            <p className="text-xs text-gray-600">Per day</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>5-Day Water Usage Pattern</CardTitle>
          <CardDescription>Historical water consumption and motor runtime</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="waterUsage" stroke="#3b82f6" fill="#93c5fd" name="Water Usage (L)" />
              <Area type="monotone" dataKey="motorOn" stroke="#10b981" fill="#86efac" name="Motor Runtime (min)" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>ML Predictions - Motor Schedule</CardTitle>
          <CardDescription>AI-predicted motor on/off times based on usage patterns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {predictions.map((pred, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-lg border-2 ${
                  pred.prediction === 'ON'
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-300 bg-gray-50'
                }`}
              >
                <div className="text-sm text-gray-600">{pred.time}</div>
                <div className={`text-xl ${pred.prediction === 'ON' ? 'text-green-600' : 'text-gray-600'}`}>
                  {pred.prediction}
                </div>
                <div className="text-xs text-gray-500">{pred.confidence}% confidence</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Power Consumption vs Savings</CardTitle>
          <CardDescription>Energy usage optimization through smart scheduling</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="powerUsed" stroke="#eab308" strokeWidth={2} name="Power Used (kWh)" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
