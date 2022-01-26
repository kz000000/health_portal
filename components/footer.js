import Container from './container'

export default function Footer() {
  return (
    <footer className="bg-cyan text-white border-t border-cyan-2">
      <Container>
        <div className="py-4">
          <h3 className="text-center font-bold">
            Készítette: Kapu Zoltán és Erdős Dániel
          </h3>
        </div>
      </Container>
    </footer>
  )
}
