"use client";
import React, { useState } from "react";
import { ChartConfig, ChartContainer } from "../ui/chart";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { useLocale } from "next-intl";
const data = [
  { month: "Jan", sales: 200, profit: 350 },
  { month: "Feb", sales: 150, profit: 250 },
  { month: "Mar", sales: 300, profit: 400 },
  { month: "Apr", sales: 350, profit: 450 },
  { month: "May", sales: 250, profit: 380 },
  { month: "Jun", sales: 400, profit: 420 },
  { month: "Jul", sales: 300, profit: 380 },
  { month: "Aug", sales: 250, profit: 450 },
  { month: "Sep", sales: 450, profit: 650 },
  { month: "Oct", sales: 350, profit: 550 },
  { month: "Nov", sales: 200, profit: 250 },
  { month: "Dec", sales: 300, profit: 400 },
];
const chartConfig = {
  sales: {
    label: "صافى الربح",
    color: "#53CCA0",
  },
  profit: {
    label: "المبيعات",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;
function MoneyChart() {
  const [activeIndex, setActiveIndex] = useState(5);
  return (
    <div className="@[900px]:col-span-8 p-6 bg-white rounded-[12px] min-h-[300px] flex flex-col gap-5">
      <div className="flex flex-col gap-0.5">
        <h4 className="font-semibold text-secondary-800 md:text-xl">
          الإحصائيات المالية
        </h4>
        <div className="flex justify-between">
          <p className="md:text-sm text-xs text-[#777980] flex-1">
            المبيعات و صافي الربح
          </p>
          <div className="self-end font-medium text-xs flex gap-4 text-[#667085]">
            <div className="flex gap-1.5 items-center">
              <span className="w-3 h-3 rounded-full bg-primary" />
              المبيعات
            </div>
            <div className="flex gap-1.5 items-center">
              <span className="w-3 h-3 rounded-full bg-[#53CCA0]" />
              صافي الربح
            </div>
          </div>
        </div>
      </div>
      <ChartContainer
        dir="ltr"
        config={chartConfig}
        className="flex-1 aspect-auto"
      >
        <ResponsiveContainer>
          <LineChart
            data={data}
            margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
            onMouseMove={(e) => {
              if (e.activeTooltipIndex !== undefined) {
                setActiveIndex(e.activeTooltipIndex);
              }
            }}
          >
            <CartesianGrid
              horizontal={true}
              vertical={false}
              strokeDasharray="3 3"
              stroke="#e2e8f0"
            />
            <defs>
              <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="hsl(160 84% 39%)"
                  stopOpacity={0.3}
                />
                <stop
                  offset="95%"
                  stopColor="hsl(160 84% 39%)"
                  stopOpacity={0}
                />
              </linearGradient>
              <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="hsl(217 91% 60%)"
                  stopOpacity={0.3}
                />
                <stop
                  offset="95%"
                  stopColor="hsl(217 91% 60%)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tickMargin={10}
              stroke="#94a3b8"
              fontSize={12}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tickMargin={10}
              stroke="#94a3b8"
              fontSize={12}
              tickFormatter={(value) => `$${value}`}
              domain={[0, 800]}
              ticks={[0, 200, 400, 600, 800]}
            />
            <Tooltip
              content={
                <CustomTooltip
                  profit={data[activeIndex]?.profit}
                  sales={data[activeIndex]?.sales}
                />
              }
              cursor={{
                stroke: "#94a3b8",
                strokeWidth: 1,
                strokeDasharray: "5 5",
                strokeLinecap: "round",
              }}
            />
            <Line
              type="monotone"
              dataKey="profit"
              stroke="hsl(160 84% 39%)"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6, fill: "hsl(160 84% 39%)" }}
            />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="hsl(217 91% 60%)"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6, fill: "hsl(217 91% 60%)" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
}
function CustomTooltip({ profit, sales }: { profit?: number; sales?: number }) {
  const locale = useLocale();
  if (!profit || !sales) return null;

  const percentage = Math.round((sales / profit) * 100);

  return (
    <div
      dir={locale === "ar" ? "rtl" : "ltr"}
      className="bg-slate-900 text-white p-3 rounded-md shadow-md text-right"
    >
      <div className="flex items-center gap-2 mb-1">
        <span className="text-teal-400">●</span>
        <span className="text-sm">صافي الربح :</span>
        <span className="font-bold">{profit.toLocaleString()}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-blue-400">●</span>
        <span className="text-sm">المبيعات :</span>
        <span className="font-bold">{percentage}%</span>
      </div>
    </div>
  );
}

export default MoneyChart;
