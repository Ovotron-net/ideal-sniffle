import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { enableMocks } from './mocks/enableMocks'
import { AppProviders } from './providers/AppProviders'
import './styles/index.css'

async function bootstrap() {
  await enableMocks()

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <AppProviders />
    </StrictMode>,
  )
}

bootstrap()