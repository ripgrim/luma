"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { CardMask } from "@/components/ui/card-mask"
import { Button } from "@/components/ui/button"
import { LockIcon, AlertTriangleIcon, ShieldAlertIcon, BanIcon, KeyIcon } from 'lucide-react'

export default function ExamplesPage() {
  const [showMask, setShowMask] = useState(true)

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-white mb-6">Card Mask Examples</h1>
      
      <div className="mb-6">
        <Button 
          onClick={() => setShowMask(!showMask)} 
          className="bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white"
        >
          {showMask ? "Remove" : "Apply"} Masks
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              <Card className="bg-[#1a1a1a] border-[#2a2a2a] p-4 h-full">
                <h2 className="text-white text-lg mb-4">Sensitive Data</h2>
                <div className="space-y-2">
                  <div className="bg-[#2a2a2a] h-8 rounded-md"></div>
                  <div className="bg-[#2a2a2a] h-8 rounded-md"></div>
                  <div className="bg-[#2a2a2a] h-8 rounded-md"></div>
                </div>
              </Card>
            </CardMask>
          ) : (
            <Card className="bg-[#1a1a1a] border-[#2a2a2a] p-4 h-full">
              <h2 className="text-white text-lg mb-4">Sensitive Data</h2>
              <div className="space-y-2">
                <div className="bg-[#2a2a2a] h-8 rounded-md"></div>
                <div className="bg-[#2a2a2a] h-8 rounded-md"></div>
                <div className="bg-[#2a2a2a] h-8 rounded-md"></div>
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
              <Card className="bg-[#1a1a1a] border-[#2a2a2a] p-4 h-full">
                <h2 className="text-white text-lg mb-4">Trade History</h2>
                <div className="space-y-3">
                  {Array(4).fill(null).map((_, i) => (
                    <div key={i} className="flex items-center justify-between p-2 bg-[#2a2a2a] rounded-md">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-[#3a3a3a] rounded-md mr-2"></div>
                        <div>
                          <p className="text-white text-sm">Trade #{i+1}</p>
                          <p className="text-gray-400 text-xs">User {i+1}</p>
                        </div>
                      </div>
                      <div className="text-green-500 text-xs">Completed</div>
                    </div>
                  ))}
                </div>
              </Card>
            </CardMask>
          ) : (
            <Card className="bg-[#1a1a1a] border-[#2a2a2a] p-4 h-full">
              <h2 className="text-white text-lg mb-4">Trade History</h2>
              <div className="space-y-3">
                {Array(4).fill(null).map((_, i) => (
                  <div key={i} className="flex items-center justify-between p-2 bg-[#2a2a2a] rounded-md">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-[#3a3a3a] rounded-md mr-2"></div>
                      <div>
                        <p className="text-white text-sm">Trade #{i+1}</p>
                        <p className="text-gray-400 text-xs">User {i+1}</p>
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
              <Card className="bg-[#1a1a1a] border-[#2a2a2a] p-4 h-full">
                <h2 className="text-white text-lg mb-4">System Status</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-white">API Status</span>
                    <span className="text-green-500">Online</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white">Database</span>
                    <span className="text-green-500">Online</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white">Authentication</span>
                    <span className="text-green-500">Online</span>
                  </div>
                </div>
              </Card>
            </CardMask>
          ) : (
            <Card className="bg-[#1a1a1a] border-[#2a2a2a] p-4 h-full">
              <h2 className="text-white text-lg mb-4">System Status</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-white">API Status</span>
                  <span className="text-green-500">Online</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white">Database</span>
                  <span className="text-green-500">Online</span>
                </div>
                <div className="flex justify-between items-center">
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
              <Card className="bg-[#1a1a1a] border-[#2a2a2a] p-4 h-full">
                <h2 className="text-white text-lg mb-4">Account Settings</h2>
                <div className="space-y-3">
                  <div className="bg-[#2a2a2a] p-3 rounded-md">
                    <p className="text-white text-sm">Username</p>
                    <p className="text-gray-400 text-xs">Ripgrim</p>
                  </div>
                  <div className="bg-[#2a2a2a] p-3 rounded-md">
                    <p className="text-white text-sm">Email</p>
                    <p className="text-gray-400 text-xs">user@example.com</p>
                  </div>
                </div>
              </Card>
            </CardMask>
          ) : (
            <Card className="bg-[#1a1a1a] border-[#2a2a2a] p-4 h-full">
              <h2 className="text-white text-lg mb-4">Account Settings</h2>
              <div className="space-y-3">
                <div className="bg-[#2a2a2a] p-3 rounded-md">
                  <p className="text-white text-sm">Username</p>
                  <p className="text-gray-400 text-xs">Ripgrim</p>
                </div>
                <div className="bg-[#2a2a2a] p-3 rounded-md">
                  <p className="text-white text-sm">Email</p>
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
              <Card className="bg-[#1a1a1a] border-[#2a2a2a] p-4 h-full">
                <h2 className="text-white text-lg mb-4">Advanced Analytics</h2>
                <div className="grid grid-cols-2 gap-3">
                  {Array(4).fill(null).map((_, i) => (
                    <div key={i} className="bg-[#2a2a2a] h-24 rounded-md"></div>
                  ))}
                </div>
              </Card>
            </CardMask>
          ) : (
            <Card className="bg-[#1a1a1a] border-[#2a2a2a] p-4 h-full">
              <h2 className="text-white text-lg mb-4">Advanced Analytics</h2>
              <div className="grid grid-cols-2 gap-3">
                {Array(4).fill(null).map((_, i) => (
                  <div key={i} className="bg-[#2a2a2a] h-24 rounded-md"></div>
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
                <svg width="40" height="40" viewBox="0 0 24.06 34.13" xmlns="http://www.w3.org/2000/svg">
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
              <Card className="bg-[#1a1a1a] border-[#2a2a2a] p-4 h-full">
                <h2 className="text-white text-lg mb-4">Custom Icon Example</h2>
                <div className="space-y-2">
                  <div className="bg-[#2a2a2a] h-8 rounded-md"></div>
                  <div className="bg-[#2a2a2a] h-8 rounded-md"></div>
                  <div className="bg-[#2a2a2a] h-8 rounded-md"></div>
                </div>
              </Card>
            </CardMask>
          ) : (
            <Card className="bg-[#1a1a1a] border-[#2a2a2a] p-4 h-full">
              <h2 className="text-white text-lg mb-4">Custom Icon Example</h2>
              <div className="space-y-2">
                <div className="bg-[#2a2a2a] h-8 rounded-md"></div>
                <div className="bg-[#2a2a2a] h-8 rounded-md"></div>
                <div className="bg-[#2a2a2a] h-8 rounded-md"></div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}