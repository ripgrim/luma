export function CoolCards() {
    return (
        <div className="mx-auto w-full px-4 pt-0 pb-16 -mt-8 max-w-[1200px] md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-16 md:mt-20 lg:justify-items-center">
                <a className="block group" href="/docs/functions">
                    <div className="rounded-xl bg-card border border-border group-hover:border-border/80 shadow-sm transition-all duration-200 relative overflow-hidden h-[300px] lg:h-[450px] flex flex-col">
                        <div className="px-8 mt-6">
                            <div className="flex items-center gap-3 mb-4 text-white text-base">
                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="code" className="w-6 h-6" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                                    <path fill="currentColor" d="M392.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l128-448c4.9-17-5-34.7-22-39.6zm80.6 120.1c-12.5 12.5-12.5 32.8 0 45.3L562.7 256l-89.4 89.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-112-112c-12.5-12.5-32.8-12.5-45.3 0zm-306.7 0c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l112 112c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256l89.4-89.4c12.5-12.5 12.5-32.8 0-45.3z"></path>
                                </svg>
                                <h3>Functions</h3>
                            </div>
                            <p className="text-white text-base text-white/40 mb-2">Deploy <span className="text-white/90">serverless functions</span> that scale automatically.</p>
                            <p className="text-white text-base text-white/40">
                                Supports <span><span className="text-white/90">APIs</span>, </span><span><span className="text-white/90">edge computing</span></span>.
                            </p>
                        </div>
                        <div className="mt-auto">
                            <div className="absolute opacity-10 group-hover:opacity-40 transition-opacity duration-200 bottom-0 left-0 h-80 w-80 -ml-8 -mb-36">
                                <img
                                    alt="Globe"
                                    loading="lazy"
                                    decoding="async"
                                    data-nimg="fill"
                                    className="object-contain scale-105"
                                    style={{
                                        position: 'absolute',
                                        height: '100%',
                                        width: '100%',
                                        left: 0,
                                        top: 0,
                                        right: 0,
                                        bottom: 0,
                                        color: 'transparent'
                                    }}
                                    src="https://rivet.gg/_next/static/media/globe.844ddac1.svg"
                                />
                            </div>
                            <div className="px-8 pb-8 relative z-10">
                                <div className="flex items-center justify-end text-white opacity-0 group-hover:opacity-40 transition-opacity">
                                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-right" className="h-6 w-6 text-xl -translate-x-1 group-hover:translate-x-0 transition-all" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                        <path fill="currentColor" d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </a>
                <a className="block group" href="/docs/actors">
                    <div className="rounded-xl bg-card border border-border group-hover:border-border/80 shadow-sm transition-all duration-200 relative overflow-hidden h-[300px] lg:h-[450px] flex flex-col">
                        <div className="px-8 mt-6">
                            <div className="flex items-center gap-3 mb-4 text-white text-base">
                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="layer-group" className="w-6 h-6" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                    <path fill="currentColor" d="M264.5 5.2c14.9-6.9 32.1-6.9 47 0l218.6 101c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 149.8C37.4 145.8 32 137.3 32 128s5.4-17.9 13.9-21.8L264.5 5.2zM476.9 209.6l53.2 24.6c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 277.8C37.4 273.8 32 265.3 32 256s5.4-17.9 13.9-21.8l53.2-24.6 152 70.2c23.4 10.8 50.4 10.8 73.8 0l152-70.2zm-152 198.2l152-70.2 53.2 24.6c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 405.8C37.4 401.8 32 393.3 32 384s5.4-17.9 13.9-21.8l53.2-24.6 152 70.2c23.4 10.8 50.4 10.8 73.8 0z"></path>
                                </svg>
                                <h3>Actors</h3>
                            </div>
                            <p className="text-white text-base text-white/40 mb-2"><span className="text-white/90">Long running tasks</span> with state persistence, hibernation, and realtime.</p>
                            <p className="text-white text-base text-white/40">
                                Supports <span><span className="text-white/90">AI agents</span>, </span><span><span className="text-white/90">realtime apps</span>, </span><span><span className="text-white/90">local-first sync</span></span>.
                            </p>
                        </div>
                        <div className="mt-auto">
                            <div className="absolute opacity-10 group-hover:opacity-40 transition-opacity duration-200 bottom-0 left-0 h-64 w-64 -ml-8 -mb-24 lg:top-[240px] lg:bottom-auto">
                                <img
                                    alt="Actors"
                                    loading="lazy"
                                    decoding="async"
                                    data-nimg="fill"
                                    className="object-contain scale-105"
                                    style={{
                                        position: 'absolute',
                                        height: '100%',
                                        width: '100%',
                                        left: 0,
                                        top: 0,
                                        right: 0,
                                        bottom: 0,
                                        color: 'transparent'
                                    }}
                                    src="https://rivet.gg/_next/static/media/actors.02bcf83e.svg"
                                />
                            </div>
                            <div className="px-8 pb-8 relative z-10">
                                <div className="flex items-center justify-end text-white opacity-0 group-hover:opacity-40 transition-opacity">
                                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-right" className="h-6 w-6 text-xl -translate-x-1 group-hover:translate-x-0 transition-all" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                        <path fill="currentColor" d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </a>
                <a className="block group" href="/docs/containers">
                    <div className="rounded-xl bg-card border border-border group-hover:border-border/80 shadow-sm transition-all duration-200 relative overflow-hidden h-[300px] lg:h-[450px] flex flex-col">
                        <div className="px-8 mt-6">
                            <div className="flex items-center gap-3 mb-4 text-white text-base">
                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="server" className="w-6 h-6" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path fill="currentColor" d="M64 32C28.7 32 0 60.7 0 96l0 64c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-64c0-35.3-28.7-64-64-64L64 32zm280 72a24 24 0 1 1 0 48 24 24 0 1 1 0-48zm48 24a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zM64 288c-35.3 0-64 28.7-64 64l0 64c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-64c0-35.3-28.7-64-64-64L64 288zm280 72a24 24 0 1 1 0 48 24 24 0 1 1 0-48zm56 24a24 24 0 1 1 48 0 24 24 0 1 1 -48 0z"></path>
                                </svg>
                                <h3>Containers</h3>
                            </div>
                            <p className="text-white text-base text-white/40 mb-2"><span className="text-white/90">Run CPU- &amp; memory-intensive workloads</span> in secure containers with fast coldstarts and blitz scaling.</p>
                            <p className="text-white text-base text-white/40">
                                Supports <span><span className="text-white/90">batch jobs</span>, </span><span><span className="text-white/90">code sandbox</span>, </span><span><span className="text-white/90">game servers</span></span>.
                            </p>
                        </div>
                        <div className="mt-auto">
                            <div className="absolute opacity-10 group-hover:opacity-40 transition-opacity duration-200 bottom-0 left-0 h-80 w-80 -ml-[100px] -mb-24 lg:top-[240px] lg:bottom-auto">
                                <img
                                    alt="Container"
                                    loading="lazy"
                                    decoding="async"
                                    data-nimg="fill"
                                    className="object-contain scale-105"
                                    style={{
                                        position: 'absolute',
                                        height: '100%',
                                        width: '100%',
                                        left: 0,
                                        top: 0,
                                        right: 0,
                                        bottom: 0,
                                        color: 'transparent'
                                    }}
                                    src="https://rivet.gg/_next/static/media/container.34a51e60.svg"
                                />
                            </div>
                            <div className="px-8 pb-8 relative z-10">
                                <div className="flex items-center justify-end text-white opacity-0 group-hover:opacity-40 transition-opacity">
                                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-right" className="h-6 w-6 text-xl -translate-x-1 group-hover:translate-x-0 transition-all" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                        <path fill="currentColor" d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
            <div className="text-center mt-16">
                <p className="text-white/70 text-lg"><span className="font-normal text-white">Select the tools that fit your needs</span> — integrated together into a single platform.</p>
            </div>
        </div>
    )
}
