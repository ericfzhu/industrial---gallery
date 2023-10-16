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
            className={`flex min-h-screen flex-col flex-inline bg-main`}
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
                className={`inset-0 text-main text-xs md:text-sm p-1 w-44 md:w-52 text-center font-bold bg-accent whitespace-nowrap z-10 fixed sticky ${orbitron.className}`}
            >
                INDUSTRIAL GALLERY
            </span>
            <div className="fixed inset-0 flex items-center justify-center z-30">
                <div className="bg-main/70 backdrop-filter backdrop-blur-sm rounded-full w-44 h-44 flex items-center justify-center">
                <span className={`text-black uppercase text-base text-center ${orbitron.className}`}>
                    {'TOMO'}
                </span>
                </div>
            </div>

            <div className='divide-solid divide-y-[1px] divide-black'>
                <div id="gallery1" className="select-none h-screen w-screen flex items-center justify-center">
                        <img src="/data/Tomo/front.jpg" alt="Tomo" className="h-[60%] hover:opacity-80"/>
                </div>
                <div id="gallery1" className="select-none h-screen w-screen flex items-center justify-center">
                        <img src="/data/Bear65V2/front.jpg" alt="Bear65V2" className="h-[70%] hover:opacity-80"/>
                </div>

                <div id="gallery1" className="select-none h-screen w-screen flex items-center justify-center">
                        <img src="/data/JaneV2ME/front.jpg" alt="JaneV2ME" className="h-[90%] hover:opacity-80"/>
                </div>

            </div>
        </main>
    )
}