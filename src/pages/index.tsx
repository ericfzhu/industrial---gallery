import { Varela } from 'next/font/google'
import Head from 'next/head'
import Link from 'next/link'

const varela = Varela({
    weight: '400',
    display: 'swap',
    subsets: ['latin'],
})

export default function Home() {
  
    return (
        <main
            className={`flex min-h-screen flex-col items-center justify-between `}
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
                className={`text-black text-5xl font-bold px-[min(30px,5vw) py-[20px] select-none ${varela.className}`}
            >
                Industrial Gallery
            </span>
            {/* <div className="w-full h-screen flex items-center justify-center p-10">
                <Link href="/tomo" passHref>
                    <div
                        className=" cursor-pointer"
                        >
                        <img src="/data/Tomo/image 1.jpg" alt="Tomo" className="w-1/2" />
                    </div>
                </Link>
            </div> */}
        </main>
    )
}