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
          n_points: 100,
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
  }, []);

  const chartData = {
    datasets: [
      {
        label: 'Class 0',
        data: data?.points.filter(p => p.label === 0).map(p => ({ x: p.x, y: p.y })) || [],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        pointRadius: 4,
      },
      {
        label: 'Class 1',
        data: data?.points.filter(p => p.label === 1).map(p => ({ x: p.x, y: p.y })) || [],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        pointRadius: 4,
      },
      {
        label: 'Prototype 0',
        data: data?.prototypes.filter(p => p.label === 0).map(p => ({ x: p.x, y: p.y })) || [],
        backgroundColor: 'rgba(255, 99, 132, 1)',
        pointRadius: 10,
        pointStyle: 'star',
      },
      {
        label: 'Prototype 1',
        data: data?.prototypes.filter(p => p.label === 1).map(p => ({ x: p.x, y: p.y })) || [],
        backgroundColor: 'rgba(53, 162, 235, 1)',
        pointRadius: 10,
        pointStyle: 'star',
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'linear' as const,
        position: 'bottom' as const,
      },
      y: {
        type: 'linear' as const,
      },
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    aspectRatio: 1,
  };

  const handleSliderChange = (values: number[]) => {
    const value = values[0] ?? epsilon;
    setEpsilon(value);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Interactive Demo: Privacy-Preserving Prototypes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex-grow">
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
              >
                Toggle ∞
              </Button>
            </div>
            <Button onClick={fetchData} disabled={loading}>
              {loading ? 'Generating...' : 'Generate New Data'}
            </Button>
          </div>
          
          <div className="aspect-square w-full">
            <Scatter options={options} data={chartData} />
          </div>
          
          {data && (
            <div className="text-center">
              <p className="text-lg font-medium">
                Classification Accuracy: {(data.accuracy * 100).toFixed(1)}%
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 