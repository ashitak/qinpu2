declare module 'next-starter-blog' {
  export type Blog = {
    featured: boolean
    title: string
    summary: string
    published: string
    last_modified: string
    thumbnail?: string
    author_name: string
    author_image: string
    tags: Array<string>
    keywords: Array<string>
    slug: string
  };
  export type Music = {
    title: string
    published: string
    puzis: Array<string>
    viedeo_url?: string
    author_name: string
    producer_name?: string
    source_url: string
    tags: Array<string>
    slug: string
  }
}
