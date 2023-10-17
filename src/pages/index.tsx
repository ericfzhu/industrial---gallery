import {  Orbitron } from 'next/font/google'
import Head from 'next/head'
import { useEffect, useState } from 'react'

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
        { name: 'Iron165 V2', height: 'md:h-[95]' },
        // Add more galleries as needed
    ]
    

    const [circleText, setCircleText] = useState(galleries[0].name)

    const checkCurrentDiv = () => {
        const divs = document.querySelectorAll('.select-none')
        const circleCenterY = window.innerHeight / 2

        divs.forEach((div, index) => {
            const divTop = div.getBoundingClientRect().top
            const divBottom = div.getBoundingClientRect().bottom
            const middleLine = divBottom - 1 // considering 1px divider

            if (middleLine > circleCenterY && divTop < circleCenterY) {
                setCircleText(galleries[index].name)
            }
        })
    }

    useEffect(() => {
        checkCurrentDiv();

        window.addEventListener('scroll', checkCurrentDiv)

        return () => {
            window.removeEventListener('scroll', checkCurrentDiv)
        }
    }, [])

    return (
        <main className={`flex min-h-screen flex-col flex-inline bg-main`}>
            <Head>
                <title>Industrial Gallery</title>
                <meta
                    property={'og:title'}
                    content="Industrial Gallery"
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
            <div className="fixed inset-0 flex items-center justify-center z-10 w-screen h-screen">
                <div className="absolute w-[500px] h-[500px] border-2 border-main1 rounded-full"/>
                <div className="absolute w-0.5 h-screen bg-main1 left-1/2 transform -translate-x-1/2"/>
                <div className="absolute w-screen h-0.5 bg-main1 top-1/2 transform -translate-y-1/2"/>
                <div className="absolute w-0.5 h-screen bg-main1 left-[15%]"/>
                <div className="absolute w-0.5 h-screen bg-main1 right-[15%]"/>

                <button className="bg-main backdrop-filter backdrop-blur-sm rounded-full w-44 h-44 flex items-center justify-center hover:bg-white">
                    <span
                        className={`text-black uppercase text-base text-center ${orbitron.className}`}
                    >
                        {circleText}
                    </span>
                </button>
            </div>

            <div className="divide-solid divide-y-[1px] divide-black">
                {galleries.map((gallery, index) => (
                    <div
                        key={index}
                        id={`gallery${index}`}
                        className="select-none h-screen flex items-center justify-center"
                    >
                        <img
                            src={`/data/${gallery.name.replace(
                                /\s+/g,
                                ''
                            )}/front.jpg`}
                            alt={gallery.name}
                            className={`${gallery.height} hover:opacity-80`}
                        />
                    </div>
                ))}
            </div>
        </main>
    )
}
