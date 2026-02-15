import { Redirect } from 'expo-router'
import { useAuth } from '../contexts/AuthContext'
import { LoadingScreen } from '../components'

export default function Index() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return <LoadingScreen />
  }

  if (user) {
    return <Redirect href="/(tabs)/schedule" />
  }

  return <Redirect href="/login" />
}
