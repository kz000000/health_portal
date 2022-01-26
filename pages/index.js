import Head from 'next/head'
import Link from 'next/link'
import Container from '../components/container'
import CoverImage from '../components/cover-image'
import Layout from '../components/layout'
import PostCreation from '../components/post-creation'
import { getAllPosts } from '../lib/api'
import { APP_NAME } from '../lib/constants'

function HeroPost({ post }) {
  const { title, coverImage, date, excerpt, author, slug } = post

  return (
    <section>
      <div className="mb-8">
        <CoverImage
          title={title}
          src={coverImage}
          slug={slug}
          height={620}
          width={1240}
        />
      </div>

      <h3 className="text-3xl font-bold mb-4">
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          <a className="hover:underline">{title}</a>
        </Link>
      </h3>

      <p className="text-lg leading-relaxed mb-4">{excerpt}</p>

      <PostCreation author={author} date={date} />
    </section>
  )
}

function Post({ post }) {
  const { title, coverImage, date, excerpt, author, slug } = post

  return (
    <div>
      <div className="mb-8">
        <CoverImage
          slug={slug}
          title={title}
          src={coverImage}
          height={278}
          width={556}
        />
      </div>

      <h3 className="text-xl font-bold mb-4">
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          <a className="hover:underline">{title}</a>
        </Link>
      </h3>

      <p className="text-lg leading-relaxed mb-4">{excerpt}</p>

      <PostCreation author={author} date={date} />
    </div>
  )
}

export default function Index({ allPosts }) {
  const heroPost = allPosts[0]
  const morePosts = allPosts.slice(1)
  return (
    <>
      <Layout>
        <Head>
          <title>{APP_NAME}</title>
        </Head>

        <Container>
          {heroPost && (
            <div className="mb-20">
              <HeroPost post={heroPost} />
            </div>
          )}

          {morePosts.length > 0 && (
            <section>
              <h2 className="hidden">More Stories</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
                {morePosts.map(post => <Post key={post.slug} post={post} />)}
              </div>
            </section>
          )}
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
  ])

  return {
    props: { allPosts },
  }
}
