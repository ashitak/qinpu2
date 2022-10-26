import UnstyledLink from '@/components/atoms/UnstyledLink'

import { twclsx } from '@/libs/twclsx'

import { Blog } from 'next-starter-blog'

interface MusicCardProps extends Blog {
  slug: string
  layout: 'row' | 'column'
}

const MusicCard: React.FunctionComponent<MusicCardProps> = ({ slug, title, summary, layout = 'row' }) => {
  return (
    <UnstyledLink
      className={twclsx(
        'flex flex-col p-4 w-full h-full',
        'border rounded-lg transition',
        'border-main-2 dark:border-main-3',
        'hover:border-main-4 dark:hover:border-main-2'
      )}
      href={`/music/${slug}`}
    >
      <h3>{title}</h3>
      {layout === 'column' && <p className='mt-[0.675em]'>{summary}</p>}
    </UnstyledLink>
  )
}

export default MusicCard
