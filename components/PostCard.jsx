import React from 'react'
import Link from 'next/link';
import * as dayjs from 'dayjs';

const PostCard = ({post}) => {
  return (
    <div className='p-0 pb-12 mb-8 bg-white rounded-lg shadow-lg lg:p-8'>
      <div className="relative mb-6 overflow-hidden shadow-md pb-80">
        <img src={post.featuredImage.url} alt={post.title}
          className='absolute object-cover object-top w-full rounded-t-lg shadow-lg h-80 lg:rounded-lg' />
      </div>
      <h1 className="mb-8 text-3xl font-semibold text-center transition duration-700 cursor-pointer hover:text-red-600">
        <Link href={`/post/${post.slug}`}>{post.title}</Link>
      </h1>
      <div className='items-center justify-center block w-full mb-8 text-center lg:flex'>
        <div className="flex items-center justify-center w-full mb-4 mr-8 lg:mb-0 lg:w-auto">
          <img src={post.author.photo.url} alt={post.author.name} height="30px" width="30px" className='align-middle rounded-full' />
          <p className='inline ml-2 text-lg text-gray-700 align-middle'>{post.author.name}</p>
        </div>
        <div className='font-medium text-gray-700'>
          <span>{dayjs(post.createdAt).format('MMM DD, YYYY')}</span>
        </div>
      </div>
      <p className='px-4 mb-8 text-lg font-normal text-center text-gray-600 lg:px-20'>{ post.excerpt }</p>
      <div className="text-center">
        <Link href={`/post/${post.slug}`}>
          <span className='inline-block py-2 text-lg font-medium text-white transition duration-500 transform bg-red-600 rounded-full cursor-pointer px-7 hover:-translate-y-1'>
            Continue Reading
          </span>
        </Link>
      </div>
    </div>
  )
}

export default PostCard