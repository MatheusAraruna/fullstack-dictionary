import { Providers } from "../providers"
import { AppRouter } from "../router"
import '../styles/global.css'

function App() {
  return (
    <Providers>
      <AppRouter />
    </Providers>
  )
}

export default App
