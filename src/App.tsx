import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Routes, Route } from 'react-router-dom'
import Main from './components/main'
import EditEventPage from './pages/edit-event'
import LoginPage from './pages/login'
import NewEventPage from './pages/new-event'
import DashboardPage from './pages/dashboard'
import EventsPage from './pages/events'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
      refetchOnMount: false,
      refetchInterval: false,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Routes>
        <Route path="/" element={<Main />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="events" element={<EventsPage />} />
          <Route path="events/new" element={<NewEventPage />} />
          <Route path="events/:id/edit" element={<EditEventPage />} />
        </Route>
      </Routes>
    </QueryClientProvider>
  )
}

export default App
