import React from 'react'
import { GetServerSideProps } from 'next'
import { sanityClient, urlFor } from '../../sanity'
import {Collection} from '../../typing'
import Link from 'next/link'
import Container from '../../layouts/Container'
import Image from 'next/image'


interface Props {
    collection: Collection
}

function NFTDropPage({collection}: Props) {

    // Authentication


  return (
    <Container>
        <div className="flex flex-grow items-center mt-8 justify-center md:mt-0">
            <div className="grid w-full grid-cols-2 items-center gap-0 rounded-xl bg-gradient-to-tr from-purple-400/[0.10] to-blue-400/[0.05] p-6 dark:from-purple-800/[0.10] dark:to-blue-800/[0.05] md:grid-cols-4 md:gap-8 lg:grid-cols-5 lg:items-stretch lg:gap-12">
                <div className='col-span-2'>
                    <div className='my-auto rounded-xl bg-gradient-to-bl from-pink-600/[0.3] to-blue-400/[0.3] p-1.5 transition duration-500 ease-in-out hover:scale-105  dark:from-pink-600/[0.1] dark:to-blue-400/[0.1] md:p-3'>
                        <Image 
                            src={urlFor(collection.mainImage).url()} 
                            width={400} 
                            height={400} 
                            layout="responsive"/>
                    </div>
                </div>
                <div className="col-span-2 flex flex-col justify-center lg:col-span-3">
                    <div className='flex flex-grow flex-col items-start justify-center px-1 pt-8 md:px-0 md:pt-0'>
                        <h1 className="font-poppins text-4xl font-medium dark:text-white lg:text-6xl pb-3">{collection.title}</h1>
                        <h2 className="text-md mb-4 pt-1 font-poppins font-extralight uppercase tracking-wider text-amber-600 dark:text-amber-400 lg:text-lg">{collection.description}</h2>
                        <h3 className="mb-3 font-poppins text-black/75 dark:text-white/75 md:max-w-lg lg:mb-4">Collection Name:{' '}<span className='font-bold text-amber-600 dark:text-amber-400'>{collection.nftCollectionName}</span></h3>
                        <p className="mb-3 font-poppins text-black/75 dark:text-white/75 md:max-w-lg lg:mb-4">
                            Discover, collect, and sell extraordinary NFTs and become an
                            owner today. Connect your wallet to get started.
                        </p>
                    </div>
                    <button className="h-16 bg-red-600 w-full text-white rounded-full mt-10 font-bold hover:scale-105 transition duration-200 active:scale-90">
                        Mint NFT (0.01ETH)
                    </button>
                </div>
            </div>
        </div>
    </Container>
  )
}

export default NFTDropPage


export const getServerSideProps: GetServerSideProps =async ({params}) => {
    const query = `*[_type == 'collection' && slug.current == $id][0]{
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
    const collection = await sanityClient.fetch(query, {
        id: params?.id
    })

    if (!collection) {
        return {
            notFound: true
        }
    }
    return {
        props: {
            collection
        }
    }
}