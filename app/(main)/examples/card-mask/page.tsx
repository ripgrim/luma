"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CardMask } from "@/components/ui/card-mask"
import { AlertTriangleIcon, BanIcon, KeyIcon, LockIcon, ShieldAlertIcon } from "lucide-react"
import { useState } from "react"

export default function ExamplesPage() {
    const [showMask, setShowMask] = useState(true)

    return (
        <div className="p-6">
            <h1 className="mb-6 font-bold text-2xl text-white">Card Mask Examples</h1>

            <div className="mb-6">
                <Button
                    onClick={() => setShowMask(!showMask)}
                    className="bg-[#2a2a2a] text-white hover:bg-[#3a3a3a]"
                >
                    {showMask ? "Remove" : "Apply"} Masks
                </Button>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Example 1: Access Restricted */}
                <div className="h-[300px]">
                    {showMask ? (
                        <CardMask
                            message="Access Restricted"
                            description="You need proper permissions to view this content."
                            icon={<LockIcon className="h-10 w-10" />}
                            opacity={0.9}
                            blur={0.9}
                        >
                            <Card className="h-full border-[#2a2a2a] bg-[#1a1a1a] p-4">
                                <h2 className="mb-4 text-lg text-white">Sensitive Data</h2>
                                <div className="space-y-2">
                                    <div className="h-8 rounded-md bg-[#2a2a2a]" />
                                    <div className="h-8 rounded-md bg-[#2a2a2a]" />
                                    <div className="h-8 rounded-md bg-[#2a2a2a]" />
                                </div>
                            </Card>
                        </CardMask>
                    ) : (
                        <Card className="h-full border-[#2a2a2a] bg-[#1a1a1a] p-4">
                            <h2 className="mb-4 text-lg text-white">Sensitive Data</h2>
                            <div className="space-y-2">
                                <div className="h-8 rounded-md bg-[#2a2a2a]" />
                                <div className="h-8 rounded-md bg-[#2a2a2a]" />
                                <div className="h-8 rounded-md bg-[#2a2a2a]" />
                            </div>
                        </Card>
                    )}
                </div>

                {/* Example 2: Authentication Required */}
                <div className="h-[300px]">
                    {showMask ? (
                        <CardMask
                            message="Authentication Required"
                            description="Please log in to view your trades."
                            icon={<KeyIcon className="h-10 w-10" />}
                            opacity={0.85}
                            blur={2}
                        >
                            <Card className="h-full border-[#2a2a2a] bg-[#1a1a1a] p-4">
                                <h2 className="mb-4 text-lg text-white">Trade History</h2>
                                <div className="space-y-3">
                                    {Array(4)
                                        .fill(null)
                                        .map((_, i) => (
                                            <div
                                                key={i}
                                                className="flex items-center justify-between rounded-md bg-[#2a2a2a] p-2"
                                            >
                                                <div className="flex items-center">
                                                    <div className="mr-2 h-8 w-8 rounded-md bg-[#3a3a3a]" />
                                                    <div>
                                                        <p className="text-sm text-white">
                                                            Trade #{i + 1}
                                                        </p>
                                                        <p className="text-gray-400 text-xs">
                                                            User {i + 1}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="text-green-500 text-xs">
                                                    Completed
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </Card>
                        </CardMask>
                    ) : (
                        <Card className="h-full border-[#2a2a2a] bg-[#1a1a1a] p-4">
                            <h2 className="mb-4 text-lg text-white">Trade History</h2>
                            <div className="space-y-3">
                                {Array(4)
                                    .fill(null)
                                    .map((_, i) => (
                                        <div
                                            key={i}
                                            className="flex items-center justify-between rounded-md bg-[#2a2a2a] p-2"
                                        >
                                            <div className="flex items-center">
                                                <div className="mr-2 h-8 w-8 rounded-md bg-[#3a3a3a]" />
                                                <div>
                                                    <p className="text-sm text-white">
                                                        Trade #{i + 1}
                                                    </p>
                                                    <p className="text-gray-400 text-xs">
                                                        User {i + 1}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-green-500 text-xs">Completed</div>
                                        </div>
                                    ))}
                            </div>
                        </Card>
                    )}
                </div>

                {/* Example 3: Maintenance Mode */}
                <div className="h-[300px]">
                    {showMask ? (
                        <CardMask
                            message="Under Maintenance"
                            description="This feature is currently unavailable due to scheduled maintenance."
                            icon={<AlertTriangleIcon className="h-10 w-10" />}
                            opacity={0.8}
                        >
                            <Card className="h-full border-[#2a2a2a] bg-[#1a1a1a] p-4">
                                <h2 className="mb-4 text-lg text-white">System Status</h2>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-white">API Status</span>
                                        <span className="text-green-500">Online</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-white">Database</span>
                                        <span className="text-green-500">Online</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-white">Authentication</span>
                                        <span className="text-green-500">Online</span>
                                    </div>
                                </div>
                            </Card>
                        </CardMask>
                    ) : (
                        <Card className="h-full border-[#2a2a2a] bg-[#1a1a1a] p-4">
                            <h2 className="mb-4 text-lg text-white">System Status</h2>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-white">API Status</span>
                                    <span className="text-green-500">Online</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-white">Database</span>
                                    <span className="text-green-500">Online</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-white">Authentication</span>
                                    <span className="text-green-500">Online</span>
                                </div>
                            </div>
                        </Card>
                    )}
                </div>

                {/* Example 4: Account Suspended */}
                <div className="h-[300px]">
                    {showMask ? (
                        <CardMask
                            message="Account Suspended"
                            description="Your account has been suspended. Please contact support for assistance."
                            icon={<BanIcon className="h-10 w-10" />}
                            opacity={0.95}
                            className="bg-red-900/20"
                        >
                            <Card className="h-full border-[#2a2a2a] bg-[#1a1a1a] p-4">
                                <h2 className="mb-4 text-lg text-white">Account Settings</h2>
                                <div className="space-y-3">
                                    <div className="rounded-md bg-[#2a2a2a] p-3">
                                        <p className="text-sm text-white">Username</p>
                                        <p className="text-gray-400 text-xs">Ripgrim</p>
                                    </div>
                                    <div className="rounded-md bg-[#2a2a2a] p-3">
                                        <p className="text-sm text-white">Email</p>
                                        <p className="text-gray-400 text-xs">user@example.com</p>
                                    </div>
                                </div>
                            </Card>
                        </CardMask>
                    ) : (
                        <Card className="h-full border-[#2a2a2a] bg-[#1a1a1a] p-4">
                            <h2 className="mb-4 text-lg text-white">Account Settings</h2>
                            <div className="space-y-3">
                                <div className="rounded-md bg-[#2a2a2a] p-3">
                                    <p className="text-sm text-white">Username</p>
                                    <p className="text-gray-400 text-xs">Ripgrim</p>
                                </div>
                                <div className="rounded-md bg-[#2a2a2a] p-3">
                                    <p className="text-sm text-white">Email</p>
                                    <p className="text-gray-400 text-xs">user@example.com</p>
                                </div>
                            </div>
                        </Card>
                    )}
                </div>

                {/* Example 5: Premium Feature */}
                <div className="h-[300px]">
                    {showMask ? (
                        <CardMask
                            message="Premium Feature"
                            description="Upgrade your account to access advanced analytics."
                            icon={<ShieldAlertIcon className="h-10 w-10" />}
                            opacity={0.85}
                            className="bg-yellow-900/20"
                        >
                            <Card className="h-full border-[#2a2a2a] bg-[#1a1a1a] p-4">
                                <h2 className="mb-4 text-lg text-white">Advanced Analytics</h2>
                                <div className="grid grid-cols-2 gap-3">
                                    {Array(4)
                                        .fill(null)
                                        .map((_, i) => (
                                            <div key={i} className="h-24 rounded-md bg-[#2a2a2a]" />
                                        ))}
                                </div>
                            </Card>
                        </CardMask>
                    ) : (
                        <Card className="h-full border-[#2a2a2a] bg-[#1a1a1a] p-4">
                            <h2 className="mb-4 text-lg text-white">Advanced Analytics</h2>
                            <div className="grid grid-cols-2 gap-3">
                                {Array(4)
                                    .fill(null)
                                    .map((_, i) => (
                                        <div key={i} className="h-24 rounded-md bg-[#2a2a2a]" />
                                    ))}
                            </div>
                        </Card>
                    )}
                </div>

                {/* Example 6: Custom Icon */}
                <div className="h-[300px]">
                    {showMask ? (
                        <CardMask
                            message="Custom SVG Icon"
                            description="This example shows how to use a custom SVG icon with the CardMask component."
                            icon={
                                <svg
                                    width="40"
                                    height="40"
                                    viewBox="0 0 24.06 34.13"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        className="fill-gray-400"
                                        d="m5.21,34.13c-1.82,0-2.74,0-3.43-.36-.61-.31-1.11-.81-1.42-1.42-.36-.7-.36-1.61-.36-3.43V4.57c0-.98,0-1.46.1-1.86C.4,1.56,1.3.66,2.44.36c.4-.1.89-.1,1.86-.1s1.46,0,1.86.1c1.15.3,2.04,1.19,2.34,2.34.1.4.1.89.1,1.86v16.49c0,1.82,0,2.74.36,3.43.31.61.81,1.11,1.42,1.42.7.36,1.61.36,3.43.36h6.24c.62,0,.94,0,1.2.04,1.38.23,2.46,1.31,2.69,2.69.04.26.04.57.04,1.2s0,.94-.04,1.2c-.23,1.38-1.31,2.46-2.69,2.69-.26.04-.57.04-1.2.04H5.21Z"
                                    />
                                    <path
                                        className="fill-gray-400"
                                        d="m15.59,4.24c0-2.34,1.9-4.24,4.24-4.24s4.24,1.9,4.24,4.24v3.06c0,1.01-.82,1.82-1.82,1.82h-4.82c-1.01,0-1.82-.82-1.82-1.82v-3.06Z"
                                    />
                                </svg>
                            }
                            opacity={0.9}
                        >
                            <Card className="h-full border-[#2a2a2a] bg-[#1a1a1a] p-4">
                                <h2 className="mb-4 text-lg text-white">Custom Icon Example</h2>
                                <div className="space-y-2">
                                    <div className="h-8 rounded-md bg-[#2a2a2a]" />
                                    <div className="h-8 rounded-md bg-[#2a2a2a]" />
                                    <div className="h-8 rounded-md bg-[#2a2a2a]" />
                                </div>
                            </Card>
                        </CardMask>
                    ) : (
                        <Card className="h-full border-[#2a2a2a] bg-[#1a1a1a] p-4">
                            <h2 className="mb-4 text-lg text-white">Custom Icon Example</h2>
                            <div className="space-y-2">
                                <div className="h-8 rounded-md bg-[#2a2a2a]" />
                                <div className="h-8 rounded-md bg-[#2a2a2a]" />
                                <div className="h-8 rounded-md bg-[#2a2a2a]" />
                            </div>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    )
}
