import { Varela, Orbitron } from 'next/font/google'
import Head from 'next/head'
import Image from 'next/image'
import { motion } from 'framer-motion'

const varela = Varela({
    weight: '400',
    display: 'swap',
    subsets: ['latin'],
})

const orbitron = Orbitron({
    weight: '700',
    display: 'swap',
    subsets: ['latin'],
})

export default function Home() {
  
    return (
        <main
            className={`flex min-h-screen flex-col p-8 items-center`}
        >
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
                className={`text-black text-4xl font-bold pb-[100px] select-none w-full ${orbitron.className} flex justify-center`}
            >
                Industrial Gallery
            </span>
            <div id="gallery1" className="select-none pointer-events-none flex flex-row h-full aspect-[11/12]">
                <div className="w-[58%]">
                    <Image src="/data/Nayeon/IMG1.jpg" alt="Tomo" className="w-[95%] mx-auto" width="500" height="400"/>
                    <div className="h-[23%] m-auto"/>
                    <Image src="/data/Bear65V2/IMG1.jpg" alt="Bear65V2" className="w-[70%] h-auto mx-auto" width="500" height="400"/>
                </div>
                <div className="w-[42%]">
                    <div className="h-[25%] w-full"/>
                    <Image src="/data/JaneV2ME/IMG1.jpg" alt="Jane" className="w-[90%] h-auto mx-auto" width="500" height="400"/>
                </div>
            </div>
            <div id="gallery1" className="select-none pointer-events-none flex flex-row h-full aspect-[11/12]">
                <div className="w-[35%]">
                    <div className="h-[25%] w-full"/>
                    <Image src="/data/VoiceMini/IMG1.jpg" alt="Jane" className="w-[90%] h-auto mx-auto" width="500" height="400"/>
                </div>
                <div className="w-[65%]">
                    <Image src="/data/Tomo/IMG1.jpg" alt="Tomo" className="w-[95%] mx-auto" width="500" height="400"/>
                </div>
            </div>
        </main>
    )
}