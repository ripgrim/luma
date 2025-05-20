import { Clock, Rocket, Code, Terminal, Network, Globe, Settings, Tag } from "lucide-react";

export function Features() {
   return (
      <div className="mx-auto max-w-7xl py-32 lg:py-40">
         <div className="text-center mb-12">
            <h2 className="text-4xl font-medium tracking-tight text-white">Trading without limitations</h2>
            <p className="mt-4 text-lg text-white/70">All the benefits of trading on Roblox with none of the traditional constraints</p>
         </div>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 text-md">
               <div className="flex items-center gap-3 mb-3 text-white/90">
                  <Clock className="w-6 h-6 text-white" />
                  <span className="font-medium text-white">Unlimited Execution Time</span>
               </div>
               <p className="text-white/60">No arbitrary timeout limits for your long-running processes</p>
            </div>
            <div className="p-5 text-md">
               <div className="flex items-center gap-3 mb-3 text-white/90">
                  <Rocket className="w-6 h-6 text-white" />
                  <span className="font-medium text-white">No Cold Starts</span>
               </div>
               <p className="text-white/60">Instant availability without delay</p>
            </div>
            <div className="p-5 text-md">
               <div className="flex items-center gap-3 mb-3 text-white/90">
                  <Code className="w-6 h-6 text-white" />
                  <span className="font-medium text-white">Docker Compatibility</span>
               </div>
               <p className="text-white/60">Works with anything that runs in Docker - no proprietary runtimes</p>
            </div>
            <div className="p-5 text-md">
               <div className="flex items-center gap-3 mb-3 text-white/90">
                  <Terminal className="w-6 h-6 text-white" />
                  <span className="font-medium text-white">Local Development</span>
               </div>
               <p className="text-white/60">Run a full Rivet instance with one command or in Docker Compose</p>
            </div>
            <div className="p-5 text-md">
               <div className="flex items-center gap-3 mb-3 text-white/90">
                  <Network className="w-6 h-6 text-white" />
                  <span className="font-medium text-white">Supports Any Protocol</span>
               </div>
               <p className="text-white/60">HTTP, WebSocket, TCP, and UDP support built-in</p>
            </div>
            <div className="p-5 text-md">
               <div className="flex items-center gap-3 mb-3 text-white/90">
                  <Globe className="w-6 h-6 text-white" />
                  <span className="font-medium text-white">Control Where Code Runs</span>
               </div>
               <p className="text-white/60">Deploy near users or data centers for optimal performance</p>
            </div>
            <div className="p-5 text-md">
               <div className="flex items-center gap-3 mb-3 text-white/90">
                  <Settings className="w-6 h-6 text-white" />
                  <span className="font-medium text-white">Customizable Rollouts</span>
               </div>
               <p className="text-white/60">Control exactly how and when your services are updated</p>
            </div>
            <div className="p-5 text-md">
               <div className="flex items-center gap-3 mb-3 text-white/90">
                  <Tag className="w-6 h-6 text-white" />
                  <span className="font-medium text-white">Tagged Resources</span>
               </div>
               <p className="text-white/60">Organize and manage resources with powerful tagging system</p>
            </div>
         </div>
      </div>
   );
}
