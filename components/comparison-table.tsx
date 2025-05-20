import { Check, Minus } from "lucide-react"

export default function ComparisonTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-gray-800">
            <th className="py-4 px-4 text-left text-gray-400 font-medium">Features</th>
            <th className="py-4 px-4 text-center">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-lg bg-amber-900/60 flex items-center justify-center mb-2">
                  <span className="text-amber-400 text-sm font-bold">F</span>
                </div>
                <span className="text-white font-medium">Free Plan</span>
              </div>
            </th>
            <th className="py-4 px-4 text-center">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-lg bg-purple-900/60 flex items-center justify-center mb-2">
                  <span className="text-purple-400 text-sm font-bold">P</span>
                </div>
                <span className="text-white font-medium">Luma Pro</span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-gray-800">
            <td className="py-4 px-4 text-gray-300">Trading Tools</td>
            <td className="py-4 px-4 text-center text-gray-400">Basic</td>
            <td className="py-4 px-4 text-center text-purple-400">Advanced</td>
          </tr>
          <tr className="border-b border-gray-800">
            <td className="py-4 px-4 text-gray-300">Analytics</td>
            <td className="py-4 px-4 text-center text-gray-400">Basic stats</td>
            <td className="py-4 px-4 text-center text-purple-400">Full suite, advanced features</td>
          </tr>
          <tr className="border-b border-gray-800">
            <td className="py-4 px-4 text-gray-300">Trade History</td>
            <td className="py-4 px-4 text-center text-gray-400">Limited (30 days)</td>
            <td className="py-4 px-4 text-center text-purple-400">Unlimited</td>
          </tr>
          <tr className="border-b border-gray-800">
            <td className="py-4 px-4 text-gray-300">Labeling</td>
            <td className="py-4 px-4 text-center text-gray-400">Basic</td>
            <td className="py-4 px-4 text-center text-purple-400">Auto labeling</td>
          </tr>
          <tr className="border-b border-gray-800">
            <td className="py-4 px-4 text-gray-300">AI-powered writing capability</td>
            <td className="py-4 px-4 text-center text-gray-400">Limited</td>
            <td className="py-4 px-4 text-center text-purple-400">One-click writing & replies</td>
          </tr>
          <tr className="border-b border-gray-800">
            <td className="py-4 px-4 text-gray-300">AI-generated Summaries</td>
            <td className="py-4 px-4 text-center">
              <Minus className="w-5 h-5 mx-auto text-gray-600" />
            </td>
            <td className="py-4 px-4 text-center">
              <Check className="w-5 h-5 mx-auto text-purple-400" />
            </td>
          </tr>
          <tr className="border-b border-gray-800">
            <td className="py-4 px-4 text-gray-300">Priority Support</td>
            <td className="py-4 px-4 text-center">
              <Minus className="w-5 h-5 mx-auto text-gray-600" />
            </td>
            <td className="py-4 px-4 text-center">
              <Check className="w-5 h-5 mx-auto text-purple-400" />
            </td>
          </tr>
          <tr className="border-b border-gray-800">
            <td className="py-4 px-4 text-gray-300">Private Discord Community Access</td>
            <td className="py-4 px-4 text-center">
              <Minus className="w-5 h-5 mx-auto text-gray-600" />
            </td>
            <td className="py-4 px-4 text-center">
              <Check className="w-5 h-5 mx-auto text-purple-400" />
            </td>
          </tr>
          <tr>
            <td className="py-4 px-4 text-gray-300">Price</td>
            <td className="py-4 px-4 text-center text-gray-400">Free</td>
            <td className="py-4 px-4 text-center text-purple-400">$200/year ($17/mo)</td>
          </tr>
        </tbody>
      </table>

      <div className="flex justify-center mt-8">
        <a
          href="#pricing"
          className="px-6 py-3 bg-white text-black font-medium rounded-md hover:bg-gray-100 transition-colors"
        >
          View Pricing
        </a>
      </div>
    </div>
  )
}
