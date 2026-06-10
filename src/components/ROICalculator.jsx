import React, { useState } from 'react';
import { Percent, TrendingUp, DollarSign } from 'lucide-react';

export default function ROICalculator() {
  const [adSpend, setAdSpend] = useState(10000);
  const [currentRoas, setCurrentRoas] = useState(2.2);
  const [targetRoas, setTargetRoas] = useState(4.0);

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const currentRevenue = adSpend * currentRoas;
  const projectedRevenue = adSpend * targetRoas;
  const revenueUplift = projectedRevenue - currentRevenue;
  const percentageIncrease = ((targetRoas - currentRoas) / currentRoas) * 100;

  return (
    <div className="bg-brandCard border border-gray-800 p-8 md:p-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-brandAccent/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Sliders Input Section */}
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-bold font-display text-brandText mb-2">
              Performance Growth Calculator
            </h3>
            <p className="text-sm text-brandMuted">
              Adjust the metrics below to estimate your potential revenue uplift under data-driven scaling.
            </p>
          </div>

          {/* Ad Spend Slider */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <label htmlFor="ad-spend-range" className="text-brandMuted font-medium">Monthly Ad Spend</label>
              <span className="text-brandText font-bold text-lg font-display">
                {formatCurrency(adSpend)}
              </span>
            </div>
            <input
              id="ad-spend-range"
              type="range"
              min="1000"
              max="100000"
              step="1000"
              value={adSpend}
              onChange={(e) => setAdSpend(Number(e.target.value))}
              className="w-full h-1.5 bg-gray-800 rounded-none appearance-none cursor-pointer accent-brandAccent"
            />
            <div className="flex justify-between text-2xs text-gray-500">
              <span>$1k</span>
              <span>$50k</span>
              <span>$100k</span>
            </div>
          </div>

          {/* Current ROAS Slider */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <label htmlFor="current-roas-range" className="text-brandMuted font-medium">Current Account ROAS</label>
              <span className="text-brandText font-bold text-lg font-display">
                {currentRoas.toFixed(1)}x
              </span>
            </div>
            <input
              id="current-roas-range"
              type="range"
              min="0.5"
              max="5.0"
              step="0.1"
              value={currentRoas}
              onChange={(e) => {
                const val = Number(e.target.value);
                setCurrentRoas(val);
                if (val >= targetRoas) {
                  setTargetRoas(Math.min(val + 1.0, 10.0));
                }
              }}
              className="w-full h-1.5 bg-gray-800 rounded-none appearance-none cursor-pointer accent-red-500"
            />
            <div className="flex justify-between text-2xs text-gray-500">
              <span>0.5x</span>
              <span>2.5x</span>
              <span>5.0x</span>
            </div>
          </div>

          {/* Targeted ROAS Slider */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <label htmlFor="target-roas-range" className="text-brandMuted font-medium">Projected ROAS (With Hafiz)</label>
              <span className="text-brandSuccess font-bold text-lg font-display">
                {targetRoas.toFixed(1)}x
              </span>
            </div>
            <input
              id="target-roas-range"
              type="range"
              min={Math.max(currentRoas + 0.1, 1.0).toFixed(1)}
              max="10.0"
              step="0.1"
              value={targetRoas}
              onChange={(e) => setTargetRoas(Number(e.target.value))}
              className="w-full h-1.5 bg-gray-800 rounded-none appearance-none cursor-pointer accent-brandSuccess"
            />
            <div className="flex justify-between text-2xs text-gray-500">
              <span>{Math.max(currentRoas + 0.1, 1.0).toFixed(1)}x</span>
              <span>6.0x</span>
              <span>10.0x</span>
            </div>
          </div>
        </div>

        {/* Results Screen Section */}
        <div className="bg-brandBg border border-gray-850 p-6 md:p-8 flex flex-col justify-between h-full border-l-4 border-l-brandAccent relative">
          <div className="space-y-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brandMuted">
              Estimated Monthly Outcomes
            </h4>

            {/* Current vs Projected */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <span className="text-3xs uppercase tracking-wider text-gray-500">Current Revenue</span>
                <p className="text-base font-bold text-brandMuted line-through">
                  {formatCurrency(currentRevenue)}
                </p>
              </div>
              <div className="space-y-1">
                <span className="text-3xs uppercase tracking-wider text-brandAccent">Projected Revenue</span>
                <p className="text-xl font-bold text-brandText font-display">
                  {formatCurrency(projectedRevenue)}
                </p>
              </div>
            </div>

            {/* Key Growth Metrics */}
            <div className="border-t border-gray-800/80 pt-6 space-y-4">
              {/* Revenue Uplift */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="p-1.5 bg-brandSuccess/10 text-brandSuccess">
                    <DollarSign size={16} />
                  </div>
                  <span className="text-xs text-brandMuted font-medium">Monthly Revenue Increase</span>
                </div>
                <span className="text-lg font-bold text-brandSuccess font-display">
                  +{formatCurrency(revenueUplift)}
                </span>
              </div>

              {/* ROI Growth Rate */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="p-1.5 bg-brandAccent/10 text-brandAccent">
                    <TrendingUp size={16} />
                  </div>
                  <span className="text-xs text-brandMuted font-medium">Efficiency Multiplier</span>
                </div>
                <span className="text-sm font-bold text-brandAccent">
                  +{percentageIncrease.toFixed(0)}% ROAS Growth
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="block text-center w-full bg-brandAccent hover:bg-blue-600 text-brandText font-semibold text-xs uppercase tracking-widest py-3 transition-colors duration-300"
            >
              Scale Your Account
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
