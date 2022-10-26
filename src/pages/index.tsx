import Searchbar from '@/components/mollecules/Searchbar'
import MusicList from '@/components/organism/MusicList'
import Layout from '@/components/template/Layout'

import { getMusic } from '@/helpers'
import { useSearchBlogQuery } from '@/hooks'

import type { GetStaticProps, NextPage } from 'next'
import { Blog } from 'next-starter-blog'

const meta = {
  title: 'Blog',
  description: `I've been writing online since 2020, mostly about data science, machine learning and tech careers. On purpose for documentation while able to share my knowledge. Use the search below to filter by title.`
}

interface BlogPageProps {
  latestPost: Array<Blog>
  allPost: Array<Blog>
}

const BlogPage: NextPage<BlogPageProps> = ({ allPost = [] }) => {
  const { query, handleChange, filteredBlog } = useSearchBlogQuery(allPost)

  return (
    <Layout as='main' {...meta}>

      <Searchbar onChange={handleChange} value={query} placeholder='Search Posts..' />

      {query.length === 0 && <MusicList blogs={allPost} title='All Post' layout='column' />}

      {query.length > 0 && filteredBlog.length > 0 ? (
        <MusicList blogs={filteredBlog} title='Search Result' layout='column' />
      ) : null}

      {query.length > 0 && filteredBlog.length === 0 ? <p>No result found</p> : null}
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const blogs = await getMusic()

  return {
    props: {
      latestPost: blogs
        // map the blogs and add slug property,
        .map((b) => ({ ...b.data, slug: b.slug }))
        // sort descending by date
        .sort((a, b) =>
          new Date(a.published) > new Date(a.published) ? 1 : new Date(a.published) < new Date(b.published) ? -1 : 0
        )
        // cut the first 3 and so on, leave only 2 latest post
        .slice(0, 2),
      allPost: blogs.map((b) => ({ ...b.data, slug: b.slug }))
    }
  }
}

export default BlogPage
