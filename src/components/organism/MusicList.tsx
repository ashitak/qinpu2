import MusicCard from '@/components/mollecules/MusicCard'

import { twclsx } from '@/libs/twclsx'

import { Blog } from 'next-starter-blog'

interface MusicListProps {
  title: string
  blogs: Array<Blog>
  layout?: 'column' | 'row'
  className?: string
  children?: React.ReactNode
}

const MusicList: React.FunctionComponent<MusicListProps> = ({ blogs, children, title, className, layout = 'row' }) => {
  return (
    <section className={className}>
      <h2>{title}</h2>
      {blogs.length > 0 && (
        <ul className={twclsx('grid grid-cols-1 gap-4 flex-auto my-4', layout === 'row' && 'md:grid-cols-2')}>
          {blogs.map((val) => (
            <li key={val.slug}>
              <MusicCard layout={layout} {...val} />
            </li>
          ))}
        </ul>
      )}
      {children}
    </section>
  )
}

export default MusicList
