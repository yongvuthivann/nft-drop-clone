import type { GetServerSideProps, NextPage } from 'next'
import { sanityClient, urlFor} from '../sanity' 
import Head from 'next/head'
import Image from 'next/image'
import {Collection} from '../typing'
import bayc from '../public/bayc.png'
import mayc from '../public/mayc.png'
import ape00 from '../public/ape/00.png'
import ape01 from '../public/ape/01.png'
import ape02 from '../public/ape/02.png'
import ape03 from '../public/ape/03.png'


interface Props {
  collections: Collection[]
}

const Home = ({collections}: Props) => {
  return (
    <div className="mx-auto max-w-7xl px-8 sm:px-16">
      <Head>
        <title>NTF Drop</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="grid flex-grow items-center gap-0 pb-12 md:grid-cols-2 md:gap-24 md:pb-48 md:pt-24">
        <div className="col-span-1 mb-12 mt-16 flex flex-col space-y-6 rounded-xl text-center md:mb-0 md:text-left  lg:justify-center lg:space-y-2">
          <h1 className="font-poppins text-3xl font-extralight dark:text-white  md:max-w-md md:text-6xl">
            The best <span className="font-bold text-purple-500">NFTS</span> in
            one place
          </h1>
        </div>
        <div className="col-span-1">
          <div className="grid grid-cols-3 gap-3 md:gap-6">
            <div className="flex flex-col gap-3 pt-24 md:gap-6">
              <div className="origin-top-left rounded-xl bg-gradient-to-bl from-pink-600/25 to-blue-400/25 p-1.5 transition duration-500 ease-in-out hover:-translate-y-1">
                <Image
                  src={bayc}
                  width={400}
                  height={400}
                  layout="responsive"
                  alt="bayc"
                  className="rounded-lg pt-2"
                />
              </div>
              <div className="origin-top-left rounded-xl bg-gradient-to-bl from-pink-600/25 to-blue-400/25 p-1.5 transition duration-500 ease-in-out  hover:-translate-y-1">
                <Image
                  src={ape02}
                  width={400}
                  height={400}
                  layout="responsive"
                  alt="ape02"
                  className="rounded-lg"
                />
              </div>
            </div>
            <div className="flex flex-col gap-3 pt-12 md:gap-6">
              <div className="origin-top-left rounded-xl bg-gradient-to-bl from-pink-600/25 to-blue-400/25 p-1.5 transition duration-500 ease-in-out hover:-translate-y-1">
                <Image
                  src={mayc}
                  width={400}
                  height={400}
                  layout="responsive"
                  alt="mayc"
                  className="rounded-lg"
                />
              </div>
              <div className="origin-top-left rounded-xl bg-gradient-to-bl from-pink-600/25 to-blue-400/25 p-1.5 transition duration-500 ease-in-out hover:-translate-y-1">
                <Image
                  src={ape03}
                  width={400}
                  height={400}
                  layout="responsive"
                  alt="ape03"
                  className="rounded-lg"
                />
              </div>
            </div>
            <div className="flex flex-col gap-3 md:gap-6">
              <div className="origin-top-left rounded-xl bg-gradient-to-bl from-pink-600/25 to-blue-400/25 p-1.5 transition duration-500 ease-in-out hover:-translate-y-1">
                <Image
                  src={ape00}
                  width={400}
                  height={400}
                  layout="responsive"
                  alt="ape00"
                  className="rounded-lg"
                />
              </div>
              <div className="origin-top-left rounded-xl bg-gradient-to-bl from-pink-600/25 to-blue-400/25 p-1.5 transition duration-500 ease-in-out hover:-translate-y-1">
                <Image
                  src={ape01}
                  width={400}
                  height={400}
                  layout="responsive"
                  alt="ape01"
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async () => {
  const query = `*[_type == 'collection']{
    _id,
    title,
    address,
    description,
    nftCollectionName,
    mainImage {
      asset
    },
    previewImage {
      asset
    },
    slug {
      current
    },
    creator -> {
      _id,
      name,
      address,
      slug {
        current
      },
    }
  }`
  const collections = await sanityClient.fetch(query)
  console.log(collections)

  return {
    props: {
      collections
    }
  }
}
