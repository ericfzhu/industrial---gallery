import { Orbitron } from 'next/font/google'
import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'
import keyboards from '@/components/keyboards.json'
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
    const [isImageVisible, setIsImageVisible] = useState(false)
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
    const [hoveredImageUrl, setHoveredImageUrl] = useState('')
    const [rotationAngle, setRotationAngle] = useState(0);
    const [prevCursorPosition, setPrevCursorPosition] = useState({ x: 0, y: 0 });
    const [imageSize, setImageSize] = useState({ width: 0, height: 0 })
    const imageRef = useRef<HTMLImageElement>(null)

    useEffect(() => {
        if (imageRef.current) {
            setImageSize({
                width: imageRef.current.clientWidth,
                height: imageRef.current.clientHeight,
            })
        }
    }, [isImageVisible])

    const handleMouseMove = (e: MouseEvent) => {
        if (containerRef.current) {
            const { left, top, width, height } =
                containerRef.current.getBoundingClientRect()
            const x = (e.clientX - (left + width / 2)) / (width / 2)
            const y = -(e.clientY - (top + height / 2)) / (height / 2)
            const speed = cursorPosition.x - e.clientX - left - imageSize.width / 2; // Simplified speed calculation based on x-axis movement

            setTilt({ x, y })
            setCursorPosition({
                x: e.clientX - left - imageSize.width / 2,
                y: e.clientY - top - imageSize.height / 2,
            })
            setRotationAngle(speed / 10);
        }
    }

    useEffect(() => {
        const container = containerRef.current
        if (container) {
            container.addEventListener('mousemove', handleMouseMove)
            return () =>
                container.removeEventListener('mousemove', handleMouseMove)
        }
    }, [])

    const handleMouseEnter = (keyboard: KeyboardItem) => {
        if (keyboard.date.toLowerCase() !== 'tbd') {
            setHoveredImageUrl(keyboard.name)
            setIsImageVisible(true)
        }
    }

    const handleMouseLeave = () => {
        setIsImageVisible(false)
    }

    return (
        <main
            className={`flex min-h-screen flex-col flex-inline bg-main`}
            ref={containerRef}
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

            <span
                className={`inset-0 text-main text-xs md:text-sm p-1 w-44 md:w-52 text-center font-bold bg-accent whitespace-nowrap z-10 fixed sticky ${orbitron.className}`}
            >
                INDUSTRIAL GALLERY
            </span>

            <div className="select-none h-screen flex items-center justify-center">
                <img
                    src="/data/Tomo/front.jpg"
                    alt="tomo"
                    className="md:h-[60%] max-w-[90%]"
                    style={{
                        transform: `perspective(1000px) rotateY(${
                            tilt.x * 3
                        }deg) rotateX(${tilt.y * 3}deg)`,
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

            <div className="w-full mt-8 min-h-[30vh] z-10">
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
                                    ? 'text-slate-500'
                                    : 'hover:text-accent'
                            }`}
                            onMouseEnter={() => handleMouseEnter(keyboard)}
                            onMouseLeave={handleMouseLeave}
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
                        </div>
                    ))}
                    <img
                        ref={imageRef}
                        src={`/data/${hoveredImageUrl}/front.jpg`}
                        className={`absolute -z-10 transition-opacity duration-500 ease-in-out ${isImageVisible ? 'opacity-100' : 'opacity-0'} max-w-[30vw] max-h-[30vh]`}
                        style={{
                            left: cursorPosition.x,
                            top: cursorPosition.y,
                        }}
                        alt="Hovered"
                    />
                </div>
            </div>
        </main>
    )
}
