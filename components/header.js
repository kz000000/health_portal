import Link from 'next/link'
import Container from '../components/container'
import { APP_NAME } from '../lib/constants'

export default function Header() {
  return (
    <header className="bg-cyan text-white border-b border-cyan-2 py-10 mb-16">
      <Container>
        <h1 className="text-3xl font-bold mb-2">
          <Link href="/">
            <a className="hover:underline">{APP_NAME}</a>
          </Link>
        </h1>

        <p className="text-sm italic">Mert az eg&eacute;szs&eacute;g fontos!</p>
      </Container>
    </header>
  )
}
