import { useAuth0 } from '@auth0/auth0-react'
import { Box, Fade, Heading } from '@chakra-ui/react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Main from './components/main'
import { PrivateRoute } from './components/private-route'
import EditEventPage from './pages/edit-event'
import LoginPage from './pages/login'
import NewEventPage from './pages/new-event'
import DashboardPage from './pages/dashboard'
import EventsPage from './pages/events'

function App() {
  const { isLoading } = useAuth0()

  return (
    <>
      <Fade in={isLoading} unmountOnExit>
        <Box pos="fixed" top="50%" left="50%" transform="translate(-50%, -50%)">
          <Heading>Chargement de l'application</Heading>
        </Box>
      </Fade>
      <Fade in={!isLoading} unmountOnExit>
        <Routes>
          <Route path="/" element={<Main />}>
            <Route path="login" element={<LoginPage />} />
            <Route
              path="dashboard"
              element={
                <PrivateRoute>
                  <DashboardPage />
                </PrivateRoute>
              }
            />
            <Route
              path="events"
              element={
                <PrivateRoute>
                  <EventsPage />
                </PrivateRoute>
              }
            />
            <Route
              path="events/new"
              element={
                <PrivateRoute>
                  <NewEventPage />
                </PrivateRoute>
              }
            />
            <Route
              path="events/:id/edit"
              element={
                <PrivateRoute>
                  <EditEventPage />
                </PrivateRoute>
              }
            />
            <Route index element={<Navigate to="/dashboard" />} />
          </Route>
        </Routes>
      </Fade>
    </>
  )
}

export default App
