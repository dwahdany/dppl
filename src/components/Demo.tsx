'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Scatter } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

interface Point {
  x: number;
  y: number;
  label: number;
}

interface PrototypeResponse {
  points: Point[];
  prototypes: Point[];
  accuracy: number;
}

export default function Demo() {
  const [epsilon, setEpsilon] = useState(1);
  const [data, setData] = useState<PrototypeResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/py/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          epsilon: epsilon,
        }),
      });
      const newData = await response.json();
      setData(newData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [epsilon]); // Fetch new data when epsilon changes

  const uniqueLabels = data 
    ? Array.from(new Set(data.points.map(p => p.label))).sort((a, b) => a - b)
    : [];

  const colors = [
    { light: 'rgba(255, 99, 132, 0.15)', dark: 'rgba(255, 99, 132, 1)' },
    { light: 'rgba(53, 162, 235, 0.15)', dark: 'rgba(53, 162, 235, 1)' },
    { light: 'rgba(75, 192, 192, 0.15)', dark: 'rgba(75, 192, 192, 1)' },
    { light: 'rgba(255, 159, 64, 0.15)', dark: 'rgba(255, 159, 64, 1)' },
    { light: 'rgba(153, 102, 255, 0.15)', dark: 'rgba(153, 102, 255, 1)' },
  ];

  const chartData = {
    datasets: data ? [
      // Points for each class
      ...uniqueLabels.map((label, i) => ({
        label: `Class ${label}`,
        data: data.points.filter(p => p.label === label).map(p => ({ x: p.x, y: p.y })),
        backgroundColor: colors[i % colors.length].light,
        pointRadius: 2,
      })),
      // Prototypes for each class
      ...uniqueLabels.map((label, i) => ({
        label: `Prototype ${label}`,
        data: data.prototypes.filter(p => p.label === label).map(p => ({ x: p.x, y: p.y })),
        backgroundColor: colors[i % colors.length].dark,
        pointRadius: 10,
        pointStyle: 'rectRot',
        borderColor: colors[i % colors.length].dark,
        borderWidth: 2,
      })),
    ] : [],
  };

  const options = {
    scales: {
      x: {
        type: 'linear' as const,
        position: 'bottom' as const,
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
      y: {
        type: 'linear' as const,
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    aspectRatio: 1,
    maintainAspectRatio: false,
  };

  const handleSliderChange = (values: number[]) => {
    const value = values[0] ?? epsilon;
    setEpsilon(value);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl">Interactive Demo: Privacy-Preserving Prototypes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-[250px,1fr] gap-8">
          {/* Controls */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Privacy Level (ε): {epsilon === Infinity ? '∞' : epsilon.toFixed(2)}
                </label>
                <Slider
                  value={[epsilon === Infinity ? 10 : epsilon]}
                  onValueChange={handleSliderChange}
                  min={0.1}
                  max={10}
                  step={0.1}
                  className="w-full"
                />
              </div>
              <Button
                variant="outline"
                onClick={() => setEpsilon(epsilon === Infinity ? 1 : Infinity)}
                className="w-full"
              >
                Toggle ∞
              </Button>
            </div>
            
            {data && (
              <div>
                <h3 className="text-sm font-medium mb-1">Classification Accuracy</h3>
                <p className="text-2xl font-bold text-primary">
                  {(data.accuracy * 100).toFixed(1)}%
                </p>
              </div>
            )}
          </div>

          {/* Chart */}
          <div className="h-[400px] bg-muted/5 rounded-lg p-4">
            <Scatter options={options} data={chartData} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 