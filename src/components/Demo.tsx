'use client';

import { useEffect, useState, useCallback } from 'react';
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
  balanced_accuracy: number;
}

export default function Demo() {
  const [epsilon, setEpsilon] = useState(Math.log(0.1));
  const [imbalanceRatio, setImbalanceRatio] = useState(1);
  const [data, setData] = useState<PrototypeResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/py/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          epsilon: Math.exp(epsilon),
          imbalance_ratio: imbalanceRatio,
        }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const newData = (await response.json()) as PrototypeResponse;
      
      // Validate the response shape
      if (!isValidPrototypeResponse(newData)) {
        throw new Error('Invalid response format from server');
      }
      
      setData(newData);
    } catch (error) {
      console.error('Error fetching data:', error);
      setData(null);
    }
    setLoading(false);
  }, [epsilon, imbalanceRatio]);

  // Type guard for response validation
  function isValidPrototypeResponse(data: unknown): data is PrototypeResponse {
    const response = data as PrototypeResponse;
    return (
      response !== null &&
      typeof response === 'object' &&
      Array.isArray(response.points) &&
      Array.isArray(response.prototypes) &&
      typeof response.accuracy === 'number' &&
      typeof response.balanced_accuracy === 'number'
    );
  }

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  const uniqueLabels = data 
    ? Array.from(new Set(data.points.map(p => p.label))).sort((a, b) => a - b)
    : [];

  const CHART_COLORS = {
    0: { light: 'rgba(255, 99, 132, 0.15)', dark: 'rgba(255, 99, 132, 1)' },
    1: { light: 'rgba(53, 162, 235, 0.15)', dark: 'rgba(53, 162, 235, 1)' },
    2: { light: 'rgba(75, 192, 192, 0.15)', dark: 'rgba(75, 192, 192, 1)' },
    3: { light: 'rgba(255, 159, 64, 0.15)', dark: 'rgba(255, 159, 64, 1)' },
    4: { light: 'rgba(153, 102, 255, 0.15)', dark: 'rgba(153, 102, 255, 1)' },
  } as const;

  const getColor = (index: number) => CHART_COLORS[index % 5 as keyof typeof CHART_COLORS];

  const chartData = {
    datasets: data ? [
      // Points for each class
      ...uniqueLabels.map((label, i) => ({
        label: `Class ${label}`,
        data: data.points.filter(p => p.label === label).map(p => ({ x: p.x, y: p.y })),
        backgroundColor: getColor(i).light,
        pointRadius: 2,
      })),
      // Prototypes for each class
      ...uniqueLabels.map((label, i) => ({
        label: `Prototype ${label}`,
        data: data.prototypes.filter(p => p.label === label).map(p => ({ x: p.x, y: p.y })),
        backgroundColor: getColor(i).dark,
        pointRadius: 10,
        pointStyle: 'rectRot' as const,
        borderColor: getColor(i).dark,
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

  const handleSliderChange = useCallback((values: number[]) => {
    const value = values[0] ?? epsilon;
    setEpsilon(value);
  }, [epsilon]);

  const handleImbalanceChange = useCallback((values: number[]) => {
    const value = values[0] ?? imbalanceRatio;
    setImbalanceRatio(value);
  }, [imbalanceRatio]);

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl">Interactive Demo: Privacy-Preserving Prototypes</CardTitle>
        <div className="mt-4 space-y-4 text-sm text-muted-foreground">
          <p>
            This demo visualizes privacy-preserving prototypes generated from CIFAR-10 image embeddings using ViT-H/14. 
            The data points shown are 2D projections created using t-SNE dimensionality reduction from the original high-dimensional embedding space.
          </p>
          
          <div className="bg-muted/10 p-4 rounded-md">
            <p className="text-xs italic">
              ⚠️ Disclaimer: This is a simplified demonstration for visualization purposes. The privacy guarantees 
              shown here are not rigorous as the t-SNE transformation and other aspects of this demo do not 
              satisfy formal differential privacy requirements.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 mt-4">
            <div className="space-y-2">
              <p className="font-medium text-foreground">Good Prototypes</p>
              <div className="h-[200px] w-full relative">
                <img 
                  src="/images/good.jpeg" 
                  alt="Example of good prototypes"
                  className="rounded-md border object-contain absolute inset-0 w-full h-full"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Good prototypes (squares) are well-centered within their class embeddings (dots), 
                effectively representing the class distribution.
              </p>
            </div>
            <div className="space-y-2">
              <p className="font-medium text-foreground">Bad Prototypes</p>
              <div className="h-[200px] w-full relative">
                <img 
                  src="/images/bad.jpeg" 
                  alt="Example of bad prototypes"
                  className="rounded-md border object-contain absolute inset-0 w-full h-full"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                With too strict privacy budgets (small ε), excessive noise pushes prototypes away from 
                their class centers, reducing their effectiveness.
              </p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-[250px,1fr] gap-8">
          {/* Controls */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Privacy Level (ε): {Math.exp(epsilon).toFixed(3)}
                </label>
                <Slider
                  value={[epsilon]}
                  onValueChange={handleSliderChange}
                  min={Math.log(0.001)}
                  max={Math.log(10)}
                  step={0.1}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Imbalance Ratio: {imbalanceRatio.toFixed(1)}x
                </label>
                <Slider
                  value={[imbalanceRatio]}
                  onValueChange={handleImbalanceChange}
                  min={1}
                  max={100}
                  step={0.1}
                  className="w-full"
                />
              </div>

              <Button 
                onClick={fetchData}
                disabled={loading}
                variant="outline"
                className="w-full"
              >
                {loading ? "Regenerating..." : "Regenerate Prototypes"}
              </Button>
            </div>
            
            {data && (
              <div className="space-y-3">
                <div>
                  <h3 className="text-sm font-medium mb-1">Standard Accuracy</h3>
                  <p className="text-2xl font-bold text-primary">
                    {(data.accuracy * 100).toFixed(1)}%
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-1">Balanced Accuracy</h3>
                  <p className="text-2xl font-bold text-primary">
                    {(data.balanced_accuracy * 100).toFixed(1)}%
                  </p>
                </div>
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