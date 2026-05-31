import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

export default function OAuthSuccess() {
  const navigate = useNavigate()
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const isInitialized = useAuthStore((s) => s.isInitialized)

  useEffect(() => {
    if (isInitialized) {
      navigate(isAuthenticated ? '/dashboard' : '/auth/login', { replace: true })
    }
  }, [isAuthenticated, isInitialized, navigate])

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-[#FF8C8C]" />
    </div>
  )
}
