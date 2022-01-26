import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Head from 'next/head'
import markdownStyles from '../../components/markdown-styles.module.css'
import Container from '../../components/container'
import CoverImage from '../../components/cover-image'
import PostCreation from '../../components/post-creation'
import Layout from '../../components/layout'
import { getPostBySlug, getAllPosts } from '../../lib/api'
import { APP_NAME } from '../../lib/constants'
import markdownToHtml from '../../lib/markdownToHtml'

function ContentWrapper({ children }) {
  return <div className="max-w-5xl mx-auto">{children}</div>
}

function PostTitle({ children }) {
  return (
    <h2 className="text-3xl lg:text-5xl font-bold mb-8">
      {children}
    </h2>
  )
}

function PostHeader({ title, coverImage, date, author }) {
  return (
    <>
      <PostTitle>{title}</PostTitle>

      <div className="mb-10">
        <CoverImage title={title} src={coverImage} height={620} width={1240} />
      </div>

      <ContentWrapper>
        <div className="mb-10">
          <PostCreation author={author} date={date} />
        </div>
      </ContentWrapper>
    </>
  )
}

function PostBody({ content }) {
  return (
    <div className="max-w-5xl mx-auto">
      <div
        className={markdownStyles['markdown']}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  )
}

export default function Post({ post, morePosts, preview }) {
  const router = useRouter()

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <Layout preview={preview}>
      <Container>
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article className="mb-32">
              <Head>
                <title>
                  {post.title} | {APP_NAME}
                </title>
                <meta property="og:image" content={post.ogImage.url} />
              </Head>

              <PostHeader
                title={post.title}
                coverImage={post.coverImage}
                date={post.date}
                author={post.author}
              />

              <PostBody content={post.content} />
            </article>
          </>
        )}
      </Container>
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'author',
    'content',
    'ogImage',
    'coverImage',
  ])
  const content = await markdownToHtml(post.content || '')

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  }
}

export async function getStaticPaths() {
  const posts = getAllPosts(['slug'])

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      }
    }),
    fallback: false,
  }
}
