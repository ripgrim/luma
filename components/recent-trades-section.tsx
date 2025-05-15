
interface Trade {
  status: string
  text: string
}

interface RecentTradesSectionProps {
  trades: Trade[]
}

export default function RecentTradesSection({ trades }: RecentTradesSectionProps) {
  return (
    <div className="bg-card border border-border p-6 rounded-xl w-full overflow-hidden flex flex-col justify-end">
      <h3 className="text-white text-lg mb-4">Recent trades</h3>
      <div className="space-y-4">
        {trades.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-border rounded-md mr-3"></div>
              <div>
                <p className="text-white text-sm">User Cap</p>
                <p className="text-gray-400 text-xs">Grimlabs</p>
              </div>
            </div>
            <div
              className={`text-xs flex items-center ${
                item.status === "received"
                  ? "text-orange-500"
                  : item.status === "accepted"
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              <span
                className={`inline-block w-2 h-2 rounded-full mr-2 ${
                  item.status === "received"
                    ? "bg-orange-500"
                    : item.status === "accepted"
                    ? "bg-green-500"
                    : "bg-red-500"
                }`}
              />
              {item.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 