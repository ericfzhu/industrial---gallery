import { Orbitron } from 'next/font/google'
import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'
import keyboards from '@/components/keyboards.json'
import Link from 'next/link'
// sort by date and then name
keyboards.sort((a, b) => (a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1))
keyboards.sort((a, b) => (a.date > b.date ? 1 : -1))

const orbitron = Orbitron({
    weight: '700',
    display: 'swap',
    subsets: ['latin'],
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
    const [isImageVisible, setIsImageVisible] = useState(false)
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
    const [hoveredImageUrl, setHoveredImageUrl] = useState('')
    const imageRef = useRef<HTMLImageElement>(null)

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

    const handleMouseEnter = (keyboard: KeyboardItem) => {
        if (keyboard.date.toLowerCase() !== 'tbd') {
            // remove whitespace from name
            const name = keyboard.name.replace(/\s/g, '')
            setHoveredImageUrl(name)
            setIsImageVisible(true)
        }
    }

    const handleMouseLeave = () => {
        setIsImageVisible(false)
    }

    return (
        <main
            className="overflow-hidden flex min-h-screen flex-col flex-inline bg-main max-w-full"
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

            <h1
                className={`absolute top-0 text-main text-xs md:text-sm p-1 w-44 md:w-52 text-center font-bold bg-accent whitespace-nowrap z-10 sticky ${orbitron.className}`}
            >
                INDUSTRIAL GALLERY
            </h1>

            <div
                className="select-none flex-grow flex items-center justify-center"
                ref={containerRef}
            >
                <img
                    src="/favicon.ico"
                    alt="IG"
                    className="md:h-[60%] max-w-[90%]"
                    style={{
                        transform: `perspective(1000px) rotateY(${
                            tilt.x * 3
                        }deg) rotateX(${tilt.y * 3}deg)`,
                        transition: 'transform 0.1s',
                    }}
                />

                {/* <div className="absolute bottom-4 w-full flex justify-center mb-4 stroke-2">
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
                </div> */}
            </div>

            {/* <div className="max-w-full mt-8 min-h-[30vh] z-10">
                <div className="uppercase z-0 w-full border-collapse divide-y-[1px] divide-main1/50 text-xs sm:text-sm md:text-base lg:text-lg select-none">
                    <div className="text-accent text-left">
                        <div className="flex flex-row">
                            <div className="px-4 py-2 w-[20%]">Date</div>
                            <div className="px-4 py-2 w-[30%] md:w-[50%]">
                                Name
                            </div>
                            <div className="px-4 py-2 w-[50%] md:w-[30%]">
                                Designer
                            </div>
                        </div>
                    </div>
                    {keyboards.map((keyboard) => (
                        <div
                            key={keyboard.name}
                            className={`text-left hover:bg-main1/20 z-10 ${
                                keyboard.date === 'tbd'
                                    ? 'text-slate-500 disabled'
                                    : 'hover:text-accent'
                            }`}
                            onMouseEnter={() => handleMouseEnter(keyboard)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <Link
                                href={`/keyboards/${keyboard.name.replace(
                                    /\s/g,
                                    ''
                                )}`}
                                className={`${
                                    keyboard.date === 'tbd'
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
                    <img
                        ref={imageRef}
                        src={`/data/${hoveredImageUrl}/front.jpg`}
                        className={`fixed transform -translate-x-1/2 -translate-y-1/2 max-w-[30vw] max-h-[30vh] transition-opacity duration-500 ease-in-out ${
                            isImageVisible ? 'opacity-100' : 'opacity-0'
                        } pointer-events-none -z-10`}
                        style={{
                            left: cursorPosition.x,
                            top: cursorPosition.y,
                        }}
                        alt="Hovered"
                    />
                </div>
            </div> */}
        </main>
    )
}
