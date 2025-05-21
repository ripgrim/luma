import clsx from "clsx"
import { ArrowRight, Code, Globe2, Layers, Server } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const WT = ({ children }: { children: React.ReactNode }) => (
    <span className="text-white/90">{children}</span>
)

// Feature component for individual features
const Feature = ({
    title,
    description,
    faIcon,
    href,
    useCases
}: {
    title: string
    description: React.ReactNode
    faIcon: any
    href: string
    useCases: string[]
}) => {
    const getImageDetails = () => {
        switch (title) {
            case "Functions":
                return {
                    src: "https://rivet.gg/_next/static/media/globe.844ddac1.svg",
                    alt: "Globe",
                    position: "bottom-0 left-0",
                    size: "h-80 w-80",
                    margin: "-ml-8 -mb-36",
                    mobileCss: "", // Globe is already positioned correctly
                    desktopCss: "" // Globe is already positioned correctly
                }
            case "Actors":
                return {
                    src: "https://rivet.gg/_next/static/media/actors.02bcf83e.svg",
                    alt: "Actors",
                    position: "bottom-0 left-0",
                    size: "h-64 w-64",
                    margin: "-ml-8 -mb-24",
                    mobileCss: "", // Position at bottom for mobile
                    desktopCss: "lg:top-[240px] lg:bottom-auto" // Reset to original position for desktop
                }
            case "Containers":
                return {
                    src: "https://rivet.gg/_next/static/media/container.34a51e60.svg",
                    alt: "Container",
                    position: "bottom-0 left-0",
                    size: "h-80 w-80",
                    margin: "-ml-[100px] -mb-24",
                    mobileCss: "", // Position at bottom for mobile
                    desktopCss: "lg:top-[240px] lg:bottom-auto" // Reset to original position for desktop
                }
            default:
                return null
        }
    }

    const imageDetails = getImageDetails()
    return (
        <Link href={href} className="group block">
            <div className="relative flex h-[300px] flex-col overflow-hidden rounded-xl border border-white/20 bg-white/2 shadow-sm transition-all duration-200 group-hover:border-[white]/40 lg:h-[450px]">
                <div className="mt-6 px-8">
                    <div className="mb-4 flex items-center gap-3 text-base text-white">
                        <Globe2 className="h-6 w-6" />
                        <h3>{title}</h3>
                    </div>

                    <p className="mb-2 text-base text-white text-white/40">{description}</p>

                    {/*<p className="text-white text-base text-white/40">
						{description}<br/>Supports{" "}
						{useCases.map((useCase, index) => (
							<span key={index} className="text-white/90">
								{useCase}
								{index < useCases.length - 1 ? ", " : ""}
							</span>
						))}
						.
					</p>*/}

                    <p className="text-base text-white text-white/40">
                        Supports{" "}
                        {useCases.map((useCase, index) => (
                            <span key={index}>
                                <span className="text-white/90">{useCase}</span>
                                {index < useCases.length - 1 ? ", " : ""}
                            </span>
                        ))}
                        .
                    </p>

                    {/*<div className="mt-3 flex flex-wrap flex-col gap-0.5 text-sm">
						{useCases.map((useCase, index) => (
							<span key={index} className="text-white/90">
								<Icon icon={faCheck} className="mr-1.5" />
								{useCase}
							</span>
						))}
					</div>*/}
                </div>

                <div className="mt-auto">
                    {imageDetails && (
                        <div
                            className={clsx(
                                "absolute opacity-10 transition-opacity duration-200 group-hover:opacity-40",
                                imageDetails.position,
                                imageDetails.size,
                                imageDetails.margin,
                                imageDetails.mobileCss,
                                imageDetails.desktopCss
                            )}
                        >
                            <Image
                                src={imageDetails.src}
                                alt={imageDetails.alt}
                                fill
                                className="scale-105 object-contain"
                            />
                        </div>
                    )}
                    <div className="relative z-10 px-8 pb-8">
                        <div className="flex items-center justify-end text-white opacity-0 transition-opacity group-hover:opacity-40">
                            <ArrowRight className="-translate-x-1 text-xl transition-all group-hover:translate-x-0" />
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

// Features grid component
export const CoolCards = () => {
    const features = [
        {
            //title: "Stateless Functions",
            title: "Functions",
            description: (
                <>
                    Deploy <WT>serverless functions</WT> that scale automatically.
                </>
            ),
            faIcon: Code,
            href: "/docs/functions",
            useCases: ["APIs", "edge computing"]
        },
        {
            //title: "Stateful Actors",
            title: "Actors",
            description: (
                <>
                    <WT>Long running tasks</WT> with state persistence, hibernation, and realtime.
                </>
            ),
            faIcon: Layers,
            href: "/docs/actors",
            useCases: ["AI agents", "realtime apps", "local-first sync"]
        },
        {
            //title: "Sandboxed Containers",
            title: "Containers",
            description: (
                <>
                    <WT>Run CPU- & memory-intensive workloads</WT> in secure containers with fast
                    coldstarts and blitz scaling.
                </>
            ),
            faIcon: Server,
            href: "/docs/containers",
            useCases: ["batch jobs", "code sandbox", "game servers"]
        }
        //{
        //	title: "Workflows",
        //	description: "Orchestrate complex, multi-step processes",
        //	faIcon: faArrowsToCircle,
        //	href: "/docs/workflows",
        //	useCases: ["AI agents", "Business logic", "Data pipelines"]
        //},
        //{
        //	title: "SQLite Databases",
        //	description: "On-demand SQL databases 10x faster than Postgres with vector stores & full text search",
        //	faIcon: faDatabase,
        //	href: "/docs/sqlite-databases",
        //	useCases: ["Agent memory", "Per-tenant databases", "Local-first apps"]
        //},
    ]

    return (
        <div className="-mt-8 mx-auto w-full max-w-[1200px] px-4 pt-0 pb-16 md:px-8">
            <div className="mt-16 grid grid-cols-1 gap-4 md:mt-20 lg:grid-cols-3 lg:justify-items-center">
                {features.map((feature, index) => (
                    <Feature
                        key={index}
                        title={feature.title}
                        description={feature.description}
                        faIcon={feature.faIcon}
                        href={feature.href}
                        useCases={feature.useCases}
                    />
                ))}
            </div>
            <div className="mt-16 text-center">
                <p className="text-lg text-white/70">
                    <span className="font-normal text-white">
                        Select the tools that fit your needs
                    </span>{" "}
                    — integrated together into a single platform.
                </p>
            </div>
        </div>
    )
}
