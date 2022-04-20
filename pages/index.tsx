import type { GetServerSideProps, NextPage } from 'next'
import { sanityClient, urlFor} from '../sanity' 

import Container from '../layouts/Container'
import Link from 'next/link'

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
    <Container>
        <div className="grid flex-grow items-center gap-0 pb-12 md:grid-cols-2 md:gap-24 md:pb-48 md:pt-24">
          <div className="col-span-1 mb-12 mt-16 flex flex-col space-y-6 rounded-xl text-center md:mb-0 md:text-left  lg:justify-center lg:space-y-2">
            <h1 className="font-poppins text-3xl font-extralight dark:text-white  md:max-w-xl md:text-6xl">
              Coding Club <span className="font-bold text-purple-500">NFTS</span> Drop
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
      
        <main className='pt-12 pb-24'>
          <div className='group relative'>
            <div className="animate-tilt group-hover:duration-600 absolute -inset-0.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-500 opacity-30 blur transition duration-1000 group-hover:opacity-80"></div>
            <div className="relative flex items-center justify-between space-x-4 divide-gray-600 rounded-xl bg-white px-1.5 leading-none text-blue-200  transition duration-200 hover:text-purple-300 dark:bg-black sm:p-2">
              <div className="grid space-x-3 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 p-3">
                {collections.map(collection => (
                  <Link key={collection._id} href={`/nft/${collection.slug.current}`}>
                    <div className="flex flex-col items-center cursor-pointer transition-all duration-200 hover:scale-105">
                      <img className="w-44 rounded-xl object-cover lg:h-96 lg:w-72" src={urlFor(collection.previewImage).url()} alt="" />
                      <div className='flex flex-col items-center'>
                        <h2 className="font-poppins text-xl text-amber-300 mt-2 dark:text-amber-300">{collection.title}</h2>
                        <p className="mt-2 font-poppins font-extralight text-black dark:text-white sm:block tracking-wider;">{collection.description}</p>
                        <p className="mt-2 font-poppins font-medium text-purple-600 dark:text-purple-400">{collection.nftCollectionName}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div> 
          </div>
        </main>
    </Container>
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
