import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { RefreshCw, ArrowUp, ArrowDown } from "lucide-react";

// Define types
interface PriceDataPoint {
  timestamp: string;
  price: number;
}

interface PriceHistoryItem {
  timestamp: string;
  priceInWei: string;
}

interface PriceChangeData {
  value: number;
  percentage: number;
  positive: boolean;
}

interface TokenPriceChartProps {
  tokenId: number;
  tokenSymbol: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}

// Custom tooltip component that matches the design language
const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 border border-gray-700 p-3 rounded-lg shadow-lg">
        <p className="text-gray-400 text-xs mb-1">
          {new Date(label || "").toLocaleString()}
        </p>
        <p className="text-white font-bold">
          ${parseFloat(payload[0].value.toString()).toFixed(8)}
        </p>
      </div>
    );
  }
  return null;
};

const TokenPriceChart = ({ tokenId, tokenSymbol }: TokenPriceChartProps) => {
  const [priceData, setPriceData] = useState<PriceDataPoint[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [priceChange, setPriceChange] = useState<PriceChangeData>({
    value: 0,
    percentage: 0,
    positive: false,
  });

  // Function to fetch price history data from the actual API endpoint
  const fetchPriceHistory = async (): Promise<void> => {
    try {
      setLoading(true);
      const apiBaseUrl = import.meta.env.VITE_API_URL as string;
      const response = await fetch(`${apiBaseUrl}/price-history/${tokenId}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch price data: ${response.status}`);
      }

      const data: PriceHistoryItem[] = await response.json();

      // Transform data for the chart
      const formattedData: PriceDataPoint[] = data.map((item) => ({
        timestamp: item.timestamp,
        price: parseFloat(item.priceInWei) / 1e18, // Convert from wei to ETH, then to USD equivalent
      }));

      setPriceData(formattedData);

      // Calculate price change for the period
      if (formattedData.length >= 2) {
        const oldestPrice = formattedData[0].price;
        const latestPrice = formattedData[formattedData.length - 1].price;
        const change = latestPrice - oldestPrice;
        const percentageChange = (change / oldestPrice) * 100;

        setPriceChange({
          value: change,
          percentage: percentageChange,
          positive: change >= 0,
        });
      }

      setLastUpdated(new Date());
      setError(null);
    } catch (err) {
      console.error("Error fetching price data:", err);
      setError("Failed to load price data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch and setup interval for real-time updates
  useEffect(() => {
    fetchPriceHistory();

    // Update every 30 seconds
    const intervalId = setInterval(() => {
      fetchPriceHistory();
    }, 30000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [tokenId]);

  // Format the price data for time intervals
  const formatXAxis = (timestamp: string): string => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 mb-5 text-white shadow-md">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-xl font-bold">{tokenSymbol} Price Chart</h3>
          <div className="flex items-center mt-1 gap-2">
            {priceChange.positive ? (
              <span className="flex items-center text-green-400">
                <ArrowUp size={16} />
                +${Math.abs(priceChange.value).toFixed(8)} (+
                {Math.abs(priceChange.percentage).toFixed(2)}%)
              </span>
            ) : (
              <span className="flex items-center text-red-400">
                <ArrowDown size={16} />
                -${Math.abs(priceChange.value).toFixed(8)} (-
                {Math.abs(priceChange.percentage).toFixed(2)}%)
              </span>
            )}
            <span className="text-gray-400 text-xs">last 24h</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400">
            Updated {lastUpdated.toLocaleTimeString()}
          </span>
          <button
            onClick={fetchPriceHistory}
            className="bg-gray-700 hover:bg-gray-600 p-2 rounded-full transition-colors"
            title="Refresh data"
          >
            <RefreshCw size={14} />
          </button>
        </div>
      </div>

      {loading && priceData.length === 0 ? (
        <div className="h-64 flex items-center justify-center">
          <p className="text-gray-400">Loading price data...</p>
        </div>
      ) : error ? (
        <div className="h-64 flex items-center justify-center">
          <p className="text-red-400">{error}</p>
        </div>
      ) : (
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={priceData}
              margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis
                dataKey="timestamp"
                tickFormatter={formatXAxis}
                stroke="#888"
                tick={{ fill: "#888", fontSize: 12 }}
              />
              <YAxis
                tickFormatter={(value) => `$${value.toFixed(8)}`}
                domain={["dataMin", "dataMax"]}
                stroke="#888"
                tick={{ fill: "#888", fontSize: 12 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine
                y={priceData.length > 0 ? priceData[0].price : 0}
                stroke="#666"
                strokeDasharray="3 3"
              />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#ff3c9e" // Same color as primary from the current design
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6, fill: "#ff3c9e", stroke: "#fff" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      <div className="mt-4 flex justify-between text-xs text-gray-400">
        <span>Historical data from past 24 hours</span>
        <span className="hover:text-white cursor-pointer transition-colors">
          View full history
        </span>
      </div>
    </div>
  );
};

export default TokenPriceChart;