import { Orbitron } from 'next/font/google'
import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'
import keyboards from '@/components/keyboards.json';

const orbitron = Orbitron({
    weight: '700',
    display: 'swap',
    subsets: ['latin'],
})

export default function Home() {
    const galleries = [
        { name: 'Tomo', height: 'md:h-[60%]' },
        { name: 'Bear65 V2', height: 'md:h-[70%]' },
        { name: 'Jane V2 ME', height: 'md:h-[90%]' },
        { name: 'Mode65', height: 'md:h-[80%]' },
        { name: 'Nayeon', height: 'md:h-[80%]' },
        { name: 'Iron165 V2', height: 'md:h-[95]' },
        { name: 'HHKB Type-S', height: 'md:h-[70%]' },
        { name: 'Dropbear', height: 'md:h-[75%]' },
        { name: '852', height: 'md:h-[88%]' },
    ]

    const [tilt, setTilt] = useState({ x: 0, y: 0 })
    const containerRef = useRef<HTMLDivElement | null>(null)

    const handleMouseMove = (e: MouseEvent) => {
        if (containerRef.current) {
            const { left, top, width, height } =
                containerRef.current.getBoundingClientRect()
            const x = (e.clientX - (left + width / 2)) / (width / 2)
            const y = -(e.clientY - (top + height / 2)) / (height / 2)
            setTilt({ x, y })
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

    // const [circleText, setCircleText] = useState(galleries[0].name)

    // const checkCurrentDiv = () => {
    //     const divs = document.querySelectorAll('.select-none')
    //     const circleCenterY = window.innerHeight / 2

    //     divs.forEach((div, index) => {
    //         const divTop = div.getBoundingClientRect().top
    //         const divBottom = div.getBoundingClientRect().bottom
    //         const middleLine = divBottom - 1 // considering 1px divider

    //         if (middleLine > circleCenterY && divTop < circleCenterY) {
    //             setCircleText(galleries[index].name)
    //         }
    //     })
    // }

    // useEffect(() => {
    //     checkCurrentDiv();

    //     window.addEventListener('scroll', checkCurrentDiv)

    //     return () => {
    //         window.removeEventListener('scroll', checkCurrentDiv)
    //     }
    // }, [])

    return (
        <main className={`flex min-h-screen flex-col flex-inline bg-main`}>
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
            
            {/* <div className="fixed inset-0 flex items-center justify-center z-0 w-screen h-screen">
                <div className="absolute w-[500px] h-[500px] border-2 border-main1 rounded-full"/>
                <div className="absolute w-0.5 h-screen bg-main1 left-1/2 transform -translate-x-1/2"/>
                <div className="absolute w-screen h-0.5 bg-main1 top-1/2 transform -translate-y-1/2"/>
                <div className="absolute w-0.5 h-screen bg-main1 left-[15%]"/>
                <div className="absolute w-0.5 h-screen bg-main1 right-[15%]"/>
            </div> */}

            <div
                ref={containerRef}
                className="select-none h-screen flex items-center justify-center"
            >
                <img
                    src="/data/Tomo/front.jpg"
                    alt="tomo"
                    className="md:h-[60%]"
                    style={{
                        transform: `perspective(1000px) rotateY(${
                            tilt.x * 2
                        }deg) rotateX(${tilt.y * 2}deg)`,
                        transition: 'transform 0.1s',
                    }}
                />
            </div>

            <div className="absolute bottom-4 w-full flex justify-center mb-4">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="self-center stroke-accent"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M12 5l0 14"></path>
                    <path d="M16 15l-4 4"></path>
                    <path d="M8 15l4 4"></path>
                </svg>
            </div>

            <div className="w-full mt-8 min-h-[30vh]">
                <div className="uppercase w-full border-collapse divide-y-[1px] divide-main1/50">
                    <div className="text-accent text-left">
                        <div className='flex flex-row'>
                            <div className="px-4 py-2 w-[20%]">Date</div>
                            <div className="px-4 py-2 w-[50%]">Name</div>
                            <div className="px-4 py-2 w-[30%]">
                                Designer
                            </div>
                        </div>
                    </div>
                    {keyboards.map((keyboard) => (
                        <div key={keyboard.name} className="text-left hover:bg-main1/20">
                            <div className='flex flex-row'>
                                <div className="px-4 py-2 w-[20%]">{keyboard.date}</div>
                                <div className="px-4 py-2 w-[50%]">{keyboard.name}</div>
                                <div className="px-4 py-2 w-[30%]">{keyboard.designer}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    )
}
