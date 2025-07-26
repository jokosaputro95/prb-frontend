'use client'

import { useState, FormEvent, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FaGoogle, FaEye, FaEyeSlash, FaSun, FaMoon, FaCheck, FaTimes,
  FaDice, FaCopy, FaCheckCircle, FaTimesCircle, FaInfoCircle,
  FaExclamationCircle
} from 'react-icons/fa'
import { toast, Toaster } from 'react-hot-toast'
import { useTheme } from '../providers/ThemeProvider'

type AuthMode = 'login' | 'register' | 'forgot'
type ToastType = 'success' | 'error' | 'info' | 'warning'

interface FormData {
  email: string
  password: string
  confirmPassword: string
  rememberMe: boolean
}

interface FormErrors {
  email?: string
  password?: string
  confirmPassword?: string
}

interface PasswordStrength {
  score: number
  label: string
  color: string
  percentage: number
  feedback: string[]
}

interface PasswordOptions {
  length: number
  uppercase: boolean
  lowercase: boolean
  numbers: boolean
  symbols: boolean
}

// Custom Toast Component (BIG, animated, macho)
const CustomToast = ({ message, type }: { message: string; type: ToastType }) => {
  const icons = {
    success: <FaCheckCircle className="w-5 h-5" />,
    error: <FaTimesCircle className="w-5 h-5" />,
    info: <FaInfoCircle className="w-5 h-5" />,
    warning: <FaExclamationCircle className="w-5 h-5" />
  }

  const colors = {
    success: 'from-green-700 to-green-500',
    error: 'from-red-700 to-red-500',
    info: 'from-blue-800 to-blue-500',
    warning: 'from-yellow-500 to-yellow-400'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -100, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -60, scale: 0.92 }}
      transition={{ type: "spring", duration: 0.4 }}
      className={`flex items-center gap-3 p-4 rounded-xl shadow-xl shadow-black/20 border
        bg-gradient-to-r ${colors[type]} text-white font-semibold text-base ring-2 ring-white/20`}
      style={{ minWidth: 250, maxWidth: 350 }}
    >
      {icons[type]}
      <span>{message}</span>
    </motion.div>
  )
}

// Show custom toast
const showToast = (message: string, type: ToastType = 'info') => {
  toast.custom((t) => <CustomToast message={message} type={type} />, {
    duration: 1200,
    position: 'top-center',
    style: { marginTop: '40px' },
  })
}

export default function AuthForm() {
  const [mode, setMode] = useState<AuthMode>('login')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showPasswordGenerator, setShowPasswordGenerator] = useState(false)
  const [generatedPassword, setGeneratedPassword] = useState('')
  const [copied, setCopied] = useState(false)
  const [passwordOptions, setPasswordOptions] = useState<PasswordOptions>({
    length: 16,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true
  })
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>({
    score: 0,
    label: '',
    color: '',
    percentage: 0,
    feedback: []
  })
  const { theme, toggleTheme } = useTheme()

  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    rememberMe: false
  })

  const [errors, setErrors] = useState<FormErrors>({})

  // Password strength calculator with real-time feedback
  const calculatePasswordStrength = (password: string): PasswordStrength => {
    let score = 0
    const feedback = []

    if (!password) {
      return { score: 0, label: '', color: '', percentage: 0, feedback: [] }
    }

    // Length check
    if (password.length >= 8) {
      score += 1
    } else {
      feedback.push('Gunakan minimal 8 karakter')
    }

    if (password.length >= 12) {
      score += 1
    }

    // Character variety checks
    if (/[a-z]/.test(password)) {
      score += 1
    } else {
      feedback.push('Tambahkan huruf kecil')
    }

    if (/[A-Z]/.test(password)) {
      score += 1
    } else {
      feedback.push('Tambahkan huruf besar')
    }

    if (/[0-9]/.test(password)) {
      score += 1
    } else {
      feedback.push('Tambahkan angka')
    }

    if (/[^A-Za-z0-9]/.test(password)) {
      score += 1
    } else {
      feedback.push('Tambahkan karakter khusus')
    }

    // Common patterns check
    if (!/(.)\1{2,}/.test(password)) score += 1
    if (!/^[0-9]+$/.test(password) && !/^[a-zA-Z]+$/.test(password)) score += 1

    const percentage = (score / 8) * 100

    if (score <= 2) {
      return { score, label: 'Lemah', color: 'bg-red-500', percentage, feedback }
    } else if (score <= 4) {
      return { score, label: 'Sedang', color: 'bg-yellow-500', percentage, feedback }
    } else if (score <= 6) {
      return { score, label: 'Bagus', color: 'bg-blue-500', percentage, feedback }
    } else {
      return { score, label: 'Sangat Kuat', color: 'bg-green-500', percentage, feedback }
    }
  }

  // Generate random password
  const generatePassword = () => {
    let charset = ''
    if (passwordOptions.lowercase) charset += 'abcdefghijklmnopqrstuvwxyz'
    if (passwordOptions.uppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    if (passwordOptions.numbers) charset += '0123456789'
    if (passwordOptions.symbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?'

    if (!charset) {
      showToast('Pilih minimal satu jenis karakter', 'warning')
      return
    }

    let password = ''
    for (let i = 0; i < passwordOptions.length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length))
    }

    setGeneratedPassword(password)
    setCopied(false)
  }

  // Copy generated password
  const copyPassword = () => {
    navigator.clipboard.writeText(generatedPassword)
    setCopied(true)
    showToast('Password berhasil disalin!', 'success')
    setTimeout(() => setCopied(false), 2000)
  }

  // Apply generated password to form
  const applyGeneratedPassword = () => {
    setFormData({ ...formData, password: generatedPassword, confirmPassword: generatedPassword })
    setShowPasswordGenerator(false)
    showToast('Password berhasil diterapkan!', 'success')
  }

  // Update password strength when password changes
  useEffect(() => {
    if (formData.password) {
      const strength = calculatePasswordStrength(formData.password)
      setPasswordStrength(strength)

      if (mode === 'register' && formData.password.length > 0) {
        if (strength.score <= 2) {
          setErrors(prev => ({ ...prev, password: 'Password terlalu lemah' }))
        } else {
          setErrors(prev => ({ ...prev, password: undefined }))
        }
      }
    } else {
      setPasswordStrength({ score: 0, label: '', color: '', percentage: 0, feedback: [] })
    }
  }, [formData.password, mode])

  useEffect(() => {
    if (showPasswordGenerator) {
      generatePassword()
    }
  }, [showPasswordGenerator])

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email) {
      newErrors.email = 'Email wajib diisi'
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Format email tidak valid'
    }

    // Password validation
    if (mode !== 'forgot') {
      if (!formData.password) {
        newErrors.password = 'Password wajib diisi'
      } else if (formData.password.length < 6) {
        newErrors.password = 'Password minimal 6 karakter'
      } else if (mode === 'register' && passwordStrength.score <= 2) {
        newErrors.password = 'Password terlalu lemah'
      }

      // Confirm password validation
      if (mode === 'register') {
        if (!formData.confirmPassword) {
          newErrors.confirmPassword = 'Konfirmasi password wajib diisi'
        } else if (formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = 'Password tidak cocok'
        }
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      showToast('Mohon perbaiki kesalahan pada form', 'error')
      return
    }

    setLoading(true)

    // Simulasi API call
    setTimeout(() => {
      setLoading(false)

      if (mode === 'login') {
        showToast('Login berhasil! Mengalihkan...', 'success')
      } else if (mode === 'register') {
        showToast('Registrasi berhasil! Silakan login.', 'success')
        setMode('login')
      } else {
        showToast('Link reset password telah dikirim ke email Anda', 'success')
        setMode('login')
      }

      setFormData({
        email: '',
        password: '',
        confirmPassword: '',
        rememberMe: false
      })
      setErrors({})
    }, 2000)
  }

  const handleGoogleAuth = () => {
    setLoading(true)
    showToast('Menghubungkan dengan Google...', 'info')

    setTimeout(() => {
      setLoading(false)
      showToast('Berhasil masuk dengan Google!', 'success')
    }, 2000)
  }

  const pageVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 }
  }

  const inputClasses = `w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 
                       bg-white/50 dark:bg-gray-800/50 text-gray-900 dark:text-white
                       focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary
                       transition-all duration-300 font-poppins backdrop-blur-sm`

  // Password criteria for visual feedback
  const passwordCriteria = [
    { met: formData.password.length >= 8, text: 'Minimal 8 karakter' },
    { met: /[A-Z]/.test(formData.password), text: 'Huruf kapital' },
    { met: /[a-z]/.test(formData.password), text: 'Huruf kecil' },
    { met: /[0-9]/.test(formData.password), text: 'Angka' },
    { met: /[^A-Za-z0-9]/.test(formData.password), text: 'Karakter khusus' }
  ]

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden px-2 sm:px-4">
      {/* Animated gradient background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-secondary via-accent to-primary dark:from-dark-background dark:via-secondary dark:to-dark-background">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-secondary/60 rounded-full mix-blend-multiply filter blur-2xl opacity-80 animate-blob"></div>
        <div className="absolute top-0 -right-8 w-[420px] h-[340px] bg-accent/80 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-12 left-20 w-96 h-80 bg-primary/80 rounded-full mix-blend-multiply filter blur-2xl opacity-80 animate-blob animation-delay-4000"></div>
      </div>

      {/* Toast Container */}
      <Toaster
        position="top-center"
        toastOptions={{
          className: '',
          style: { marginTop: '40px' },
        }}
      />

      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className="fixed top-4 right-4 p-3 rounded-full bg-white/80 dark:bg-gray-800/80
                   backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300
                   border border-gray-200 dark:border-gray-700 z-50"
        aria-label="Toggle theme"
      >
        <motion.div
          initial={false}
          animate={{ rotate: theme === 'dark' ? 180 : 0 }}
          transition={{ duration: 0.5 }}
        >
          {theme === 'light' ? (
            <FaMoon className="w-5 h-5 text-primary" />
          ) : (
            <FaSun className="w-5 h-5 text-yellow-400" />
          )}
        </motion.div>
      </button>

      {/* Centered Form Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full z-10 flex justify-center items-center"
      >
        <div className="mx-auto w-full max-w-lg sm:max-w-xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-800/20 ring-2 ring-primary/10 max-h-[90vh] min-h-fit overflow-y-auto p-3 sm:p-4 md:p-6 lg:p-10 my-8 sm:my-12">
          {/* Logo/Header with Gradient */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="relative w-24 h-24 mx-auto mb-4"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-accent rounded-full animate-spin-slow"></div>
              <div className="absolute inset-1 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center">
                <span className="text-3xl font-bold bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text transition-colors">PRB</span>
              </div>
            </motion.div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-accent text-transparent bg-clip-text">
              {mode === 'login' && 'Selamat Datang'}
              {mode === 'register' && 'Buat Akun Baru'}
              {mode === 'forgot' && 'Reset Password'}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              {mode === 'login' && 'Masuk ke akun Anda untuk melanjutkan'}
              {mode === 'register' && 'Daftar untuk memulai perjalanan Anda'}
              {mode === 'forgot' && 'Masukkan email untuk reset password'}
            </p>
          </div>

          <AnimatePresence mode="wait">
            <motion.form
              key={mode}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              {/* Email Input */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`${inputClasses} ${errors.email ? 'input-error' : ''}`}
                  placeholder="nama@email.com"
                  aria-label="Email"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    id="email-error"
                    className="text-red-500 text-sm mt-1"
                  >
                    {errors.email}
                  </motion.p>
                )}
              </div>

              {/* Password Input */}
              {mode !== 'forgot' && (
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className={`${inputClasses} pr-24 ${errors.password ? 'input-error' : ''}`}
                      placeholder="••••••••"
                      aria-label="Password"
                      aria-invalid={!!errors.password}
                      aria-describedby={errors.password ? 'password-error' : undefined}
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center space-x-2">
                      {mode === 'register' && (
                        <button
                          type="button"
                          onClick={() => setShowPasswordGenerator(true)}
                          className="text-primary hover:text-accent transition-colors"
                          aria-label="Generate password"
                          title="Generate password"
                        >
                          <FaDice size={20} />
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-gray-500 hover:text-primary dark:hover:text-primary transition-colors"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                      </button>
                    </div>
                  </div>
                  {errors.password && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      id="password-error"
                      className="text-red-500 text-sm mt-1"
                    >
                      {errors.password}
                    </motion.p>
                  )}

                  {/* Real-time Password Strength Indicator */}
                  {formData.password && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-3 space-y-2"
                    >
                      {/* Strength Bar */}
                      <div className="flex items-center space-x-2">
                        <div className="flex-1">
                          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${passwordStrength.percentage}%` }}
                              transition={{ duration: 0.3 }}
                              className={`h-full ${passwordStrength.color} transition-all duration-300`}
                            />
                          </div>
                        </div>
                        <motion.span
                          key={passwordStrength.label}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className={`text-sm font-medium ${passwordStrength.label === 'Lemah' ? 'text-red-500' :
                            passwordStrength.label === 'Sedang' ? 'text-yellow-500' :
                              passwordStrength.label === 'Bagus' ? 'text-blue-500' :
                                'text-green-500'
                            }`}
                        >
                          {passwordStrength.label}
                        </motion.span>
                      </div>

                      {/* Password Criteria - Only show in register mode */}
                      {mode === 'register' && (
                        <>
                          <div className="grid grid-cols-2 gap-1">
                            {passwordCriteria.map((criterion, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className={`flex items-center space-x-1 text-xs ${criterion.met ? 'text-green-600 dark:text-green-400' : 'text-gray-400'
                                  }`}
                              >
                                {criterion.met ? (
                                  <FaCheck className="w-3 h-3" />
                                ) : (
                                  <FaTimes className="w-3 h-3" />
                                )}
                                <span>{criterion.text}</span>
                              </motion.div>
                            ))}
                          </div>

                          {/* Real-time feedback */}
                          {passwordStrength.feedback.length > 0 && (
                            <motion.div
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-xs text-gray-600 dark:text-gray-400 mt-2"
                            >
                              <p className="font-medium">Saran:</p>
                              <ul className="list-disc list-inside space-y-1">
                                {passwordStrength.feedback.map((item, index) => (
                                  <li key={index}>{item}</li>
                                ))}
                              </ul>
                            </motion.div>
                          )}
                        </>
                      )}
                    </motion.div>
                  )}
                </div>
              )}

              {/* Confirm Password Input */}
              {mode === 'register' && (
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Konfirmasi Password
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className={`${inputClasses} pr-12 ${errors.confirmPassword ? 'input-error' : ''}`}
                      placeholder="••••••••"
                      aria-label="Confirm Password"
                      aria-invalid={!!errors.confirmPassword}
                      aria-describedby={errors.confirmPassword ? 'confirm-password-error' : undefined}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500
                               hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                      aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                    >
                      {showConfirmPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      id="confirm-password-error"
                      className="text-red-500 text-sm mt-1"
                    >
                      {errors.confirmPassword}
                    </motion.p>
                  )}
                </div>
              )}

              {/* Remember Me & Forgot Password */}
              {mode === 'login' && (
                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.rememberMe}
                      onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                      className="w-4 h-4 text-primary rounded focus:ring-primary"
                      aria-label="Remember me"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Ingat saya</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setMode('forgot')}
                    className="text-sm text-primary hover:text-accent transition-colors"
                  >
                    Lupa password?
                  </button>
                </div>
              )}

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="relative w-full overflow-hidden rounded-xl p-[2px] disabled:opacity-50 
                         disabled:cursor-not-allowed group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent 
                              animate-gradient-x group-hover:animate-gradient-x-fast"></div>
                <div className="relative bg-white dark:bg-gray-900 text-gray-900 dark:text-white 
                              group-hover:bg-transparent group-hover:text-white
                              transition-all duration-300 py-3 px-6 rounded-xl font-semibold">
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-current border-t-transparent 
                                  rounded-full animate-spin mx-auto" />
                  ) : (
                    <span>
                      {mode === 'login' && 'Masuk'}
                      {mode === 'register' && 'Daftar Sekarang'}
                      {mode === 'forgot' && 'Kirim Link Reset'}
                    </span>
                  )}
                </div>
              </motion.button>

              {/* Google Auth Button */}
              {mode !== 'forgot' && (
                <>
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">Atau</span>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={handleGoogleAuth}
                    disabled={loading}
                    className="w-full flex items-center justify-center space-x-3 
                             bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 
                             font-medium py-3 px-6 rounded-xl border-2 border-gray-200 
                             dark:border-gray-700 hover:border-primary dark:hover:border-primary
                             hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className="relative">
                      <FaGoogle className="w-5 h-5 text-red-500 group-hover:scale-110 transition-transform" />
                    </div>
                    <span>Masuk dengan Google</span>
                  </motion.button>
                </>
              )}

              {/* Mode Switch */}
              <div className="text-center mt-6">
                {mode === 'login' && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Belum punya akun?{' '}
                    <button
                      type="button"
                      onClick={() => setMode('register')}
                      className="text-primary hover:text-accent transition-colors font-medium"
                    >
                      Daftar sekarang
                    </button>
                  </p>
                )}
                {mode === 'register' && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Sudah punya akun?{' '}
                    <button
                      type="button"
                      onClick={() => setMode('login')}
                      className="text-primary hover:text-accent transition-colors font-medium"
                    >
                      Masuk
                    </button>
                  </p>
                )}
                {mode === 'forgot' && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Ingat password Anda?{' '}
                    <button
                      type="button"
                      onClick={() => setMode('login')}
                      className="text-primary hover:text-accent transition-colors font-medium"
                    >
                      Kembali ke login
                    </button>
                  </p>
                )}
              </div>
            </motion.form>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Password Generator Modal */}
      <AnimatePresence>
        {showPasswordGenerator && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setShowPasswordGenerator(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Generator Password
              </h3>

              {/* Generated Password Display */}
              <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 mb-4">
                <div className="flex items-center justify-between">
                  <code className="text-sm font-mono text-gray-900 dark:text-white break-all">
                    {generatedPassword}
                  </code>
                  <button
                    onClick={copyPassword}
                    className={`ml-2 p-2 rounded-lg transition-all ${copied
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                      }`}
                    aria-label="Copy password"
                  >
                    {copied ? <FaCheck size={16} /> : <FaCopy size={16} />}
                  </button>
                </div>
              </div>

              {/* Password Options */}
              <div className="space-y-3 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Panjang Password: {passwordOptions.length}
                  </label>
                  <input
                    type="range"
                    min="8"
                    max="32"
                    value={passwordOptions.length}
                    onChange={(e) => setPasswordOptions({ ...passwordOptions, length: parseInt(e.target.value) })}
                    className="w-full accent-primary"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={passwordOptions.uppercase}
                      onChange={(e) => setPasswordOptions({ ...passwordOptions, uppercase: e.target.checked })}
                      className="w-4 h-4 text-primary rounded focus:ring-primary"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Huruf Besar (A-Z)</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={passwordOptions.lowercase}
                      onChange={(e) => setPasswordOptions({ ...passwordOptions, lowercase: e.target.checked })}
                      className="w-4 h-4 text-primary rounded focus:ring-primary"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Huruf Kecil (a-z)</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={passwordOptions.numbers}
                      onChange={(e) => setPasswordOptions({ ...passwordOptions, numbers: e.target.checked })}
                      className="w-4 h-4 text-primary rounded focus:ring-primary"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Angka (0-9)</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={passwordOptions.symbols}
                      onChange={(e) => setPasswordOptions({ ...passwordOptions, symbols: e.target.checked })}
                      className="w-4 h-4 text-primary rounded focus:ring-primary"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Simbol (!@#$)</span>
                  </label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={generatePassword}
                  className="flex-1 bg-gradient-to-r from-primary to-accent text-white 
                           font-medium py-2 px-4 rounded-xl hover:shadow-lg transition-all"
                >
                  <FaDice className="inline mr-2" />
                  Generate Ulang
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={applyGeneratedPassword}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white 
                           font-medium py-2 px-4 rounded-xl hover:shadow-lg transition-all"
                >
                  Gunakan Password
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
