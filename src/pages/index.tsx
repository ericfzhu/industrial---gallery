import { Courier_Prime } from 'next/font/google'
import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'
import keyboards from '@/components/keyboards.json'
import Link from 'next/link'
// sort by date and then name
keyboards.sort((a, b) => (a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1))
keyboards.sort((a, b) => (a.date > b.date ? 1 : -1))

export const courierPrime = Courier_Prime({
    subsets: ['latin'],
    weight: '400',
    preload: true,
})
interface KeyboardItem {
    name: string
    date: string
    designer: string
}

export default function Home() {
    const [tilt, setTilt] = useState({ x: 0, y: 0 })
    const containerRef = useRef<HTMLDivElement | null>(null)
    const tableRef = useRef<HTMLDivElement | null>(null)
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })

    const handleMouseMove = (e: MouseEvent) => {
        if (containerRef.current) {
            const { left, top, width, height } =
                containerRef.current.getBoundingClientRect()
            const x = (e.clientX - (left + width / 2)) / (width / 2)
            const y = -(e.clientY - (top + height / 2)) / (height / 2)

            setTilt({ x, y })
        }
        if (tableRef.current) {
            setCursorPosition({
                x: e.clientX,
                y: e.clientY,
            })
        }
    }

    useEffect(() => {
        const container = containerRef.current
        const table = tableRef.current

        if (container) {
            container.addEventListener('mousemove', handleMouseMove)
        }
        if (table) {
            table.addEventListener('mousemove', handleMouseMove)
        }
        return () => {
            if (table) {
                table.removeEventListener('mousemove', handleMouseMove)
            }
            if (container) {
                container.removeEventListener('mousemove', handleMouseMove)
            }
        }
    }, [])

    return (
        <main
            className={`overflow-hidden flex min-h-screen flex-col flex-inline bg-main max-w-full relative items-center ${courierPrime.className}`}
            ref={tableRef}
        >
            <Head>
                <title>INDUSTRIAL GALLERY</title>
                <meta
                    property={'og:title'}
                    content="INDUSTRIAL GALLERY"
                    key="title"
                />
                <meta
                    name="viewport"
                    content="width=device-width"
                    key="title"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {/* <h1
                className={`absolute top-0 text-main text-xs md:text-sm p-1 w-44 md:w-52 text-center font-bold bg-accent whitespace-nowrap z-10 sticky ${orbitron.className}`}
            >
                INDUSTRIAL GALLERY
            </h1> */}

            <div
                className="select-none flex-grow flex items-center justify-center top-0 relative w-screen h-screen"
                ref={containerRef}
            >
                <img
                    src="/favicon.ico"
                    alt="IG"
                    className="md:h-[40%] max-w-[80%]"
                    style={{
                        transform: `perspective(1000px) rotateY(${
                            tilt.x * 10
                        }deg) rotateX(${tilt.y * 10}deg)`,
                        transition: 'transform 0.1s',
                    }}
                />

                <div className="absolute bottom-4 w-full flex justify-center mb-4 stroke-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="self-center stroke-accent"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path
                            stroke="none"
                            d="M0 0h24v24H0z"
                            fill="none"
                        ></path>
                        <path d="M12 5l0 14"></path>
                        <path d="M16 15l-4 4"></path>
                        <path d="M8 15l4 4"></path>
                    </svg>
                </div>
            </div>

            <div className="max-w-5xl w-full mt-8 mb-[10%] z-10 border border-main1">
                <div className="text-accent text-left border-b border-main1 uppercase">
                        <div className="flex flex-row">
                            <div className="px-4 py-2 w-[20%] border-r border-main1">Date</div>
                            <div className="px-4 py-2 w-[30%] md:w-[50%] border-r border-main1">
                                Name
                            </div>
                            <div className="px-4 py-2 w-[50%] md:w-[30%]">
                                Designer
                            </div>
                        </div>
                    </div>
                <div className="z-0 w-full border-collapse text-xs sm:text-sm md:text-base lg:text-lg select-none">
                    
                    {keyboards.map((keyboard, index) => (
                        <div
                            key={keyboard.name}
                            className={`text-left hover:bg-main1/20 z-10 ${
                                index % 2 === 0 ? 'bg-main1/10' : ''} ${
                                keyboard.date === 'TBD'
                                    ? 'text-slate-500 disabled'
                                    : 'hover:text-accent'
                            }`}
                        >
                            <Link
                                href={`/keyboards/${keyboard.name.replace(
                                    /\s/g,
                                    ''
                                )}`}
                                className={`${
                                    keyboard.date === 'TBD'
                                        ? 'pointer-events-none'
                                        : ''
                                }`}
                            >
                                <div className="flex flex-row">
                                    <div className="px-4 py-2 w-[20%]">
                                        {keyboard.date}
                                    </div>
                                    <div className="px-4 py-2 w-[30%] md:w-[50%]">
                                        {keyboard.name}
                                    </div>
                                    <div className="px-4 py-2 w-[50%] md:w-[30%]">
                                        {keyboard.designer}
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    )
}
