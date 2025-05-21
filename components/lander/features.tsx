"use client"

import { Clock, Rocket, Code, Terminal, Network, Globe, Settings, Tag } from "lucide-react";

export interface FeatureItem {
	icon: any;
	title?: string;
	name?: string;
	description: string;
}

export const Feature = ({ feature, title }: { feature: FeatureItem, title: string }) => {
	return(
		<div className="p-5 text-md">
			<div className="flex items-center gap-3 mb-3 text-white/90">
				<feature.icon className="size-6" />
				<span className="font-medium text-white">{title}</span>
			</div>
			<p className="text-white/60">{feature.description}</p>
		</div>
	)
}

export const Features = () => {
	const features: FeatureItem[] = [
		{
			icon: Clock,
			title: "Unlimited Execution Time",
			description: "No arbitrary timeout limits for your long-running processes",
		},
		{
			icon: Rocket,
			title: "No Cold Starts",
			description: "Instant availability without delay",
		},
		{
			icon: Code,
			title: "Docker Compatibility",
			description: "Works with anything that runs in Docker - no proprietary runtimes",
		},
		{
			icon: Terminal,
			title: "Local Development",
			description: "Run a full Rivet instance with one command or in Docker Compose",
		},
		{
			icon: Network,
			title: "Supports Any Protocol",
			description: "HTTP, WebSocket, TCP, and UDP support built-in",
		},
		{
			icon: Globe,
			title: "Control Where Code Runs",
			description: "Deploy near users or data centers for optimal performance",
		},
		{
			icon: Settings,
			title: "Customizable Rollouts",
			description: "Control exactly how and when your services are updated",
		},
		{
			icon: Tag,
			title: "Tagged Resources",
			description: "Organize and manage resources with powerful tagging system",
		},
	];

	return (
		<div className="mx-auto lg:py-40 max-w-[1200px]">
			<div className="text-center mb-12">
				<h2 className="text-4xl font-medium tracking-tight text-white">
					Serverless without limitations
				</h2>
				<p className="mt-4 text-lg text-white/70">
					All the benefits of serverless with none of the traditional
					constraints
				</p>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
					{features.map((feature, index) => (
						<Feature key={index} feature={feature} title={feature.title || ""} />
					))}
				</div>
		</div>
	);
};
