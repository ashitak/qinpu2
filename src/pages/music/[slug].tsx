import CustomImage from '@/components/mollecules/CustomImage'
import Layout from '@/components/template/Layout'

import { getMusic, getMusicBySlug } from '@/helpers'

import { GetStaticPaths, GetStaticPathsResult, GetStaticProps, NextPage } from 'next'
import {  MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { Music } from 'next-starter-blog'
import 'prism-themes/themes/prism-night-owl.css'

import { ParsedUrlQuery } from 'querystring'

interface URLSlug extends ParsedUrlQuery {
  slug: string
}

interface BlogPostProps {
  mdxSource: MDXRemoteSerializeResult
  data: Music
}

const BlogPost: NextPage<BlogPostProps> = ({ data }) => {
  // const isMediumScreen = useMediaQuery('(min-width: 768px)')
  const puzis = data.puzis;
  return (
    <Layout as='main' title={data.title} description={data.title}>
      <section className='border-b border-main-2 dark:border-main-3'>
        <h1 className='mb-8 md:text-5xl'>{data.title}
        <span className='text-sm md:text-base'>  {data.author_name}</span>
        </h1>
      </section>
      <section className='flex'>
        {puzis
          .map((puzi) => (
            <div className='flex-1' key={puzi}
            >
              <CustomImage
                src={puzi ?? '/static/default-thumbnail.jpg'}
                alt='music'
                display='intrinsic'
                width={2000}
                height={2000}
                objectFit='scale-down'
                className='rounded'
              />
            </div>
          ))}
      {data.viedeo_url && (
        <div className="flex-none">
          <video controls loop style={{ width: '300px', height: 'auto' }}>
            <source src={data.viedeo_url} />
          </video>
        </div>
      )}
      </section>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const blogs = await getMusic()

  const paths = blogs.map((blog) => ({ params: { slug: blog.slug } })) as GetStaticPathsResult['paths']

  return {
    fallback: false,
    paths
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const mdxPrism = require('mdx-prism')

  const { slug } = ctx.params as URLSlug
  const blog = await getMusicBySlug(slug)

  const mdxSource = await serialize(blog.content, { mdxOptions: { rehypePlugins: [mdxPrism] } })

  return {
    props: {
      mdxSource,
      data: { ...blog.data, slug }
    }
  }
}

export default BlogPost
