import { Check, Minus } from "lucide-react"

export default function ComparisonTable() {
    return (
        <div className="overflow-x-auto">
            <table className="w-full border-collapse">
                <thead>
                    <tr className="border-gray-800 border-b">
                        <th className="px-4 py-4 text-left font-medium text-gray-400">Features</th>
                        <th className="px-4 py-4 text-center">
                            <div className="flex flex-col items-center">
                                <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-amber-900/60">
                                    <span className="font-bold text-amber-400 text-sm">F</span>
                                </div>
                                <span className="font-medium text-white">Free Plan</span>
                            </div>
                        </th>
                        <th className="px-4 py-4 text-center">
                            <div className="flex flex-col items-center">
                                <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-purple-900/60">
                                    <span className="font-bold text-purple-400 text-sm">P</span>
                                </div>
                                <span className="font-medium text-white">Luma Pro</span>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border-gray-800 border-b">
                        <td className="px-4 py-4 text-gray-300">Trading Tools</td>
                        <td className="px-4 py-4 text-center text-gray-400">Basic</td>
                        <td className="px-4 py-4 text-center text-purple-400">Advanced</td>
                    </tr>
                    <tr className="border-gray-800 border-b">
                        <td className="px-4 py-4 text-gray-300">Analytics</td>
                        <td className="px-4 py-4 text-center text-gray-400">Basic stats</td>
                        <td className="px-4 py-4 text-center text-purple-400">
                            Full suite, advanced features
                        </td>
                    </tr>
                    <tr className="border-gray-800 border-b">
                        <td className="px-4 py-4 text-gray-300">Trade History</td>
                        <td className="px-4 py-4 text-center text-gray-400">Limited (30 days)</td>
                        <td className="px-4 py-4 text-center text-purple-400">Unlimited</td>
                    </tr>
                    <tr className="border-gray-800 border-b">
                        <td className="px-4 py-4 text-gray-300">Labeling</td>
                        <td className="px-4 py-4 text-center text-gray-400">Basic</td>
                        <td className="px-4 py-4 text-center text-purple-400">Auto labeling</td>
                    </tr>
                    <tr className="border-gray-800 border-b">
                        <td className="px-4 py-4 text-gray-300">AI-powered writing capability</td>
                        <td className="px-4 py-4 text-center text-gray-400">Limited</td>
                        <td className="px-4 py-4 text-center text-purple-400">
                            One-click writing & replies
                        </td>
                    </tr>
                    <tr className="border-gray-800 border-b">
                        <td className="px-4 py-4 text-gray-300">AI-generated Summaries</td>
                        <td className="px-4 py-4 text-center">
                            <Minus className="mx-auto h-5 w-5 text-gray-600" />
                        </td>
                        <td className="px-4 py-4 text-center">
                            <Check className="mx-auto h-5 w-5 text-purple-400" />
                        </td>
                    </tr>
                    <tr className="border-gray-800 border-b">
                        <td className="px-4 py-4 text-gray-300">Priority Support</td>
                        <td className="px-4 py-4 text-center">
                            <Minus className="mx-auto h-5 w-5 text-gray-600" />
                        </td>
                        <td className="px-4 py-4 text-center">
                            <Check className="mx-auto h-5 w-5 text-purple-400" />
                        </td>
                    </tr>
                    <tr className="border-gray-800 border-b">
                        <td className="px-4 py-4 text-gray-300">
                            Private Discord Community Access
                        </td>
                        <td className="px-4 py-4 text-center">
                            <Minus className="mx-auto h-5 w-5 text-gray-600" />
                        </td>
                        <td className="px-4 py-4 text-center">
                            <Check className="mx-auto h-5 w-5 text-purple-400" />
                        </td>
                    </tr>
                    <tr>
                        <td className="px-4 py-4 text-gray-300">Price</td>
                        <td className="px-4 py-4 text-center text-gray-400">Free</td>
                        <td className="px-4 py-4 text-center text-purple-400">
                            $200/year ($17/mo)
                        </td>
                    </tr>
                </tbody>
            </table>

            <div className="mt-8 flex justify-center">
                <a
                    href="#pricing"
                    className="rounded-md bg-white px-6 py-3 font-medium text-black transition-colors hover:bg-gray-100"
                >
                    View Pricing
                </a>
            </div>
        </div>
    )
}
