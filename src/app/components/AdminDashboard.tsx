import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Droplets, Zap, TrendingDown, Building2 } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface FlatData {
  flatNumber: string;
  owner: string;
  waterUsage: number;
  powerSaved: number;
  bill: number;
  status: 'normal' | 'high' | 'low';
}

interface Props {
  flatsData: FlatData[];
  totalWaterUsage: number;
  totalPowerSaved: number;
  totalBill: number;
}

export default function AdminDashboard({ flatsData, totalWaterUsage, totalPowerSaved, totalBill }: Props) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Building2 className="w-8 h-8 text-blue-600" />
        <div>
          <h2 className="text-2xl">Admin Dashboard</h2>
          <p className="text-gray-600">All Apartments Overview</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Total Water Usage</CardTitle>
            <Droplets className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{totalWaterUsage.toFixed(1)} L</div>
            <p className="text-xs text-gray-600">Last 24 hours</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Power Saved</CardTitle>
            <Zap className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{totalPowerSaved.toFixed(2)} kWh</div>
            <p className="text-xs text-gray-600">Through smart scheduling</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Total Bills</CardTitle>
            <TrendingDown className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">₹{totalBill.toFixed(2)}</div>
            <p className="text-xs text-gray-600">This month</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Water Usage by Flat</CardTitle>
          <CardDescription>Comparison across all apartments</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={flatsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="flatNumber" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="waterUsage" fill="#3b82f6" name="Water Usage (L)" />
              <Bar dataKey="powerSaved" fill="#eab308" name="Power Saved (kWh)" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All Flats Details</CardTitle>
          <CardDescription>Individual apartment statistics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Flat</th>
                  <th className="text-left p-3">Owner</th>
                  <th className="text-left p-3">Water Usage</th>
                  <th className="text-left p-3">Power Saved</th>
                  <th className="text-left p-3">Bill</th>
                  <th className="text-left p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {flatsData.map((flat) => (
                  <tr key={flat.flatNumber} className="border-b hover:bg-gray-50">
                    <td className="p-3">{flat.flatNumber}</td>
                    <td className="p-3">{flat.owner}</td>
                    <td className="p-3">{flat.waterUsage.toFixed(1)} L</td>
                    <td className="p-3">{flat.powerSaved.toFixed(2)} kWh</td>
                    <td className="p-3">₹{flat.bill.toFixed(2)}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          flat.status === 'high'
                            ? 'bg-red-100 text-red-700'
                            : flat.status === 'low'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {flat.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
