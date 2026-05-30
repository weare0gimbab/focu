import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

const KAKAO_AUTH_URL = 'http://localhost:8080/oauth2/authorization/kakao'

function KakaoIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.25C6.201 2.25 1.5 5.894 1.5 10.388c0 2.918 1.878 5.483 4.71 6.97l-1.2 4.374a.375.375 0 0 0 .563.411l4.835-3.207A12.7 12.7 0 0 0 12 18.75c5.799 0 10.5-3.644 10.5-8.362S17.799 2.25 12 2.25Z" />
    </svg>
  )
}

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuthStore()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await login({ email, password })
      navigate('/dashboard', { replace: true })
    } catch (err: any) {
      setError(err.response?.data?.message ?? '로그인에 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="w-full rounded-2xl bg-white p-8 shadow-xl"
      style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.10)' }}
    >
      {/* Header */}
      <div className="mb-8 text-center">
        <div
          className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl"
          style={{ background: 'linear-gradient(135deg, #FF8C8C 0%, #FF6464 100%)' }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm0 5a3 3 0 1 1-3 3 3 3 0 0 1 3-3Zm0 13a7.93 7.93 0 0 1-6-2.75A6 6 0 0 1 12 14a6 6 0 0 1 6 3.25A7.93 7.93 0 0 1 12 20Z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold" style={{ color: '#08060d', letterSpacing: '-0.5px' }}>
          로그인
        </h1>
        <p className="mt-1 text-sm" style={{ color: '#6b6375' }}>
          계정에 로그인하세요
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div
          className="mb-5 flex items-center gap-2 rounded-lg px-4 py-3 text-sm"
          style={{ background: '#fff1f0', color: '#cf1322', border: '1px solid #ffa39e' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm1 15h-2v-2h2v2Zm0-4h-2V7h2v6Z" />
          </svg>
          {error}
        </div>
      )}

      {/* Kakao Login Button */}
      <a
        href={KAKAO_AUTH_URL}
        className="mb-4 flex w-full items-center justify-center gap-2.5 rounded-xl py-3 text-sm font-semibold transition-all duration-150"
        style={{
          background: '#FEE500',
          color: 'rgba(0,0,0,0.85)',
          textDecoration: 'none',
          border: '1px solid transparent'
        }}
        onMouseEnter={(e) => {
          ;(e.currentTarget as HTMLAnchorElement).style.background = '#F0D900'
          ;(e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 4px 12px rgba(254,229,0,0.5)'
        }}
        onMouseLeave={(e) => {
          ;(e.currentTarget as HTMLAnchorElement).style.background = '#FEE500'
          ;(e.currentTarget as HTMLAnchorElement).style.boxShadow = 'none'
        }}
      >
        <KakaoIcon />
        카카오로 로그인
      </a>

      {/* Divider */}
      <div className="relative my-5 flex items-center">
        <div className="flex-1" style={{ height: '1px', background: '#e5e4e7' }} />
        <span className="mx-3 text-xs font-medium" style={{ color: '#9ca3af' }}>
          또는 이메일로 로그인
        </span>
        <div className="flex-1" style={{ height: '1px', background: '#e5e4e7' }} />
      </div>

      {/* Email / Password Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium" style={{ color: '#374151' }}>
            이메일
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@email.com"
            required
            className="w-full rounded-xl px-4 py-2.5 text-sm outline-none transition-all duration-150"
            style={{
              border: '1.5px solid #e5e4e7',
              background: '#fafafa',
              color: '#08060d'
            }}
            onFocus={(e) => {
              e.target.style.border = '1.5px solid #aa3bff'
              e.target.style.boxShadow = '0 0 0 3px rgba(170,59,255,0.12)'
              e.target.style.background = '#fff'
            }}
            onBlur={(e) => {
              e.target.style.border = '1.5px solid #e5e4e7'
              e.target.style.boxShadow = 'none'
              e.target.style.background = '#fafafa'
            }}
          />
        </div>

        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label className="text-sm font-medium" style={{ color: '#374151' }}>
              비밀번호
            </label>
            <Link
              to="/auth/reset-password"
              className="text-xs transition-colors duration-150"
              style={{ color: '', textDecoration: 'none' }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#FF8C8C')}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#FF8C8C')}
            >
              비밀번호 재설정
            </Link>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            className="w-full rounded-xl px-4 py-2.5 text-sm outline-none transition-all duration-150"
            style={{
              border: '1.5px solid #e5e4e7',
              background: '#fafafa',
              color: '#08060d'
            }}
            onFocus={(e) => {
              e.target.style.border = '1.5px solid #aa3bff'
              e.target.style.boxShadow = '0 0 0 3px rgba(170,59,255,0.12)'
              e.target.style.background = '#fff'
            }}
            onBlur={(e) => {
              e.target.style.border = '1.5px solid #e5e4e7'
              e.target.style.boxShadow = 'none'
              e.target.style.background = '#fafafa'
            }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl py-2.5 text-sm font-semibold text-white transition-all duration-150 disabled:cursor-not-allowed disabled:opacity-50"
          style={{
            background: loading ? '#9ca3af' : 'linear-gradient(135deg, #FF8C8C 0%, #FF8C8C 100%)'
          }}
          onMouseEnter={(e) => {
            if (!loading)
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                '0 4px 14px rgba(170,59,255,0.45)'
          }}
          onMouseLeave={(e) => {
            ;(e.currentTarget as HTMLButtonElement).style.boxShadow = 'none'
          }}
        >
          {loading ? '로그인 중...' : '로그인'}
        </button>
      </form>

      {/* Register Link */}
      <p className="mt-5 text-center text-sm" style={{ color: '#6b6375' }}>
        계정이 없으신가요?{' '}
        <Link
          to="/auth/register"
          className="font-semibold transition-colors duration-150"
          style={{ color: '#aa3bff', textDecoration: 'none' }}
          onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#7c3aed')}
          onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#aa3bff')}
        >
          회원가입
        </Link>
      </p>
    </div>
  )
}
