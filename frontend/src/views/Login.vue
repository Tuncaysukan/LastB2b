<template>
  <div class="min-h-screen flex">
    <!-- Sol Panel - Branding & İllüstrasyon -->
    <div class="hidden lg:flex lg:w-1/2 bg-brand-gradient relative overflow-hidden">
      <!-- Arka plan deseni -->
      <div class="absolute inset-0 bg-black bg-opacity-10"></div>
      <div class="absolute inset-0">
        <svg class="absolute top-0 left-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>
      
      <!-- Floating Elements -->
      <div class="absolute top-20 left-20 w-32 h-32 bg-white bg-opacity-10 rounded-full animate-bounce-subtle"></div>
      <div class="absolute bottom-32 right-16 w-16 h-16 bg-white bg-opacity-10 rounded-full animate-pulse-subtle"></div>
      <div class="absolute top-1/3 right-20 w-8 h-8 bg-white bg-opacity-10 rounded-full animate-bounce-subtle"></div>
      
      <!-- İçerik -->
      <div class="relative z-10 flex flex-col justify-center items-center p-12 text-white">
        <div class="text-center space-y-8 animate-fade-in">
          <!-- Logo/Marka -->
          <div class="mb-8">
            <div class="w-24 h-24 mx-auto bg-white bg-opacity-20 rounded-2xl flex items-center justify-center backdrop-blur-sm hover:bg-opacity-30 transition-all duration-300">
              <svg class="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13 3L4 14h7l-2 7 9-11h-7l2-7z"/>
              </svg>
            </div>
          </div>
          
          <div>
            <h1 class="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              B2B Prime Tur
            </h1>
            <p class="text-xl text-blue-100 mb-8 font-medium">Modern CRM Çözümünüz</p>
            <p class="text-blue-200 max-w-md leading-relaxed">
              Müşteri ilişkilerinizi yönetin, satışlarınızı artırın ve işinizi büyütün. 
              Profesyonel CRM sistemiyle tanışın.
            </p>
          </div>
          
          <!-- Özellikler -->
          <div class="space-y-4 text-left max-w-sm">
            <div class="flex items-center space-x-3 group">
              <div class="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
              </div>
              <span class="text-blue-100 group-hover:text-white transition-colors">Müşteri Yönetimi</span>
            </div>
            <div class="flex items-center space-x-3 group">
              <div class="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
              </div>
              <span class="text-blue-100 group-hover:text-white transition-colors">Satış Takibi</span>
            </div>
            <div class="flex items-center space-x-3 group">
              <div class="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
              </div>
              <span class="text-blue-100 group-hover:text-white transition-colors">Raporlama & Analiz</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Sağ Panel - Login Formu -->
    <div class="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div class="w-full max-w-md">
        <!-- Mobil Logo -->
        <div class="lg:hidden text-center mb-8 animate-slide-down">
          <div class="w-16 h-16 mx-auto bg-brand-gradient-small rounded-xl flex items-center justify-center mb-4 shadow-brand">
            <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13 3L4 14h7l-2 7 9-11h-7l2-7z"/>
            </svg>
          </div>
          <h1 class="text-2xl font-bold text-gray-800">B2B Prime Tur</h1>
        </div>

        <!-- Login Formu -->
        <div class="bg-white rounded-4xl shadow-strong p-8 border border-gray-100 login-card animate-slide-up">
          <div class="text-center mb-8">
            <h2 class="text-3xl font-bold text-gray-800 mb-2">Hoş Geldiniz!</h2>
            <p class="text-gray-600">Hesabınıza giriş yapın</p>
          </div>

          <form @submit.prevent="login" class="space-y-6">
            <!-- E-posta -->
            <div class="form-control">
              <label class="label">
                <span class="label-text font-medium text-gray-700">E-posta Adresi</span>
              </label>
              <div class="relative">
                <input
                  v-model="email"
                  type="email"
                  placeholder="ornek@email.com"
                  class="input input-bordered w-full pl-12 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-300"
                  :class="{ 'input-error': emailError, 'input-success': email && !emailError }"
                  required
                />
                <svg class="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2 input-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
              </div>
              <label v-if="emailError" class="label">
                <span class="label-text-alt text-error animate-slide-down">{{ emailError }}</span>
              </label>
            </div>

            <!-- Şifre -->
            <div class="form-control">
              <label class="label">
                <span class="label-text font-medium text-gray-700">Şifre</span>
              </label>
              <div class="relative">
                <input
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="Şifrenizi girin"
                  class="input input-bordered w-full pl-12 pr-12 py-3 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-300"
                  :class="{ 'input-error': passwordError, 'input-success': password && !passwordError }"
                  required
                />
                <svg class="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2 input-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"/>
                </svg>
                <button
                  type="button"
                  @click="togglePassword"
                  class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 password-toggle"
                >
                  <svg v-if="!showPassword" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                    <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"/>
                  </svg>
                  <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clip-rule="evenodd"/>
                    <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z"/>
                  </svg>
                </button>
              </div>
              <label v-if="passwordError" class="label">
                <span class="label-text-alt text-error animate-slide-down">{{ passwordError }}</span>
              </label>
            </div>

            <!-- Hatırla / Şifremi Unuttum -->
            <div class="flex justify-between items-center">
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" v-model="rememberMe" class="checkbox checkbox-primary checkbox-sm" />
                <span class="text-sm text-gray-600">Beni hatırla</span>
              </label>
              <a href="#" class="text-sm text-brand-600 hover:text-brand-800 font-medium transition-colors">
                Şifremi unuttum
              </a>
            </div>

            <!-- Loading state için buton -->
            <button 
              type="submit" 
              class="btn btn-primary w-full h-12 text-base font-semibold btn-gradient rounded-xl"
              :class="{ 'loading': isLoading }"
              :disabled="isLoading"
            >
              <span v-if="!isLoading">Giriş Yap</span>
              <span v-else>Giriş yapılıyor...</span>
            </button>
          </form>

          <!-- Hata mesajı -->
          <div v-if="loginError" class="alert alert-error mt-4 rounded-xl">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
            </svg>
            <span>{{ loginError }}</span>
          </div>

          <!-- Sosyal Giriş Seçenekleri (İsteğe bağlı) -->
          <div class="divider text-gray-400 text-sm my-6">veya</div>
          
          <div class="grid grid-cols-2 gap-3">
            <button type="button" class="btn btn-outline btn-sm rounded-xl hover:bg-gray-50">
              <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </button>
            <button type="button" class="btn btn-outline btn-sm rounded-xl hover:bg-gray-50">
              <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Facebook
            </button>
          </div>

          <!-- Kayıt -->
          <div class="text-center mt-8">
            <p class="text-sm text-gray-600">
              Henüz hesabınız yok mu?
              <a href="#" class="text-brand-600 hover:text-brand-800 font-medium transition-colors">
                Kayıt olun
              </a>
            </p>
          </div>
        </div>

        <!-- Alt bilgi -->
        <div class="text-center mt-8">
          <p class="text-xs text-gray-500">
            © 2024 B2B Prime Tur. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
  
const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const showPassword = ref(false)
const isLoading = ref(false)
const loginError = ref('')

// Validasyon
const emailError = computed(() => {
  if (!email.value) return ''
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email.value) ? '' : 'Geçerli bir e-posta adresi girin'
})

const passwordError = computed(() => {
  if (!password.value) return ''
  return password.value.length >= 6 ? '' : 'Şifre en az 6 karakter olmalı'
})

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const login = async () => {
  // Hata mesajını temizle
  loginError.value = ''
  
  // Basit validasyon kontrolü
  if (!email.value) {
    loginError.value = 'E-posta adresi gerekli'
    return
  }
  
  if (!password.value) {
    loginError.value = 'Şifre gerekli'
    return
  }
  
  if (emailError.value || passwordError.value) {
    loginError.value = 'Lütfen form hatalarını düzeltin'
    return
  }
  
  // Loading state
  isLoading.value = true
  
  // Simüle edilmiş giriş süreci
  setTimeout(() => {
    isLoading.value = false
    
    // Demo token kaydet
    localStorage.setItem('token', 'demo-token-' + Date.now())
    localStorage.setItem('user', JSON.stringify({
      name: 'Admin User',
      email: email.value
    }))
    
    // Başarılı giriş mesajı
    console.log('Giriş başarılı!')
    
    // Dashboard'a yönlendir
    router.push('/dashboard')
  }, 1500)
}

// Auto-focus email input on mount
import { onMounted } from 'vue'
onMounted(() => {
  // İlk input'a otomatik focus
  const emailInput = document.querySelector('input[type="email"]')
  if (emailInput) {
    emailInput.focus()
  }
})
</script>

<style scoped>
/* Custom Gradient Definitions - Modern CRM Design */
.bg-brand-gradient {
  background: linear-gradient(135deg, #2563eb 0%, #7c3aed 50%, #1d4ed8 100%);
  background-size: 200% 200%;
  animation: gradientShift 8s ease infinite;
}

.bg-brand-gradient-small {
  background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
}

@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

/* Modern Button Styling */
.btn-gradient {
  background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
  border: none;
  color: white;
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-gradient::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.btn-gradient:hover::before {
  left: 100%;
}

.btn-gradient:hover {
  background: linear-gradient(135deg, #1d4ed8 0%, #6d28d9 100%);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(37, 99, 235, 0.4);
}

.btn-gradient:active {
  transform: translateY(0);
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
}

/* Enhanced Form Styling */
.form-control {
  @apply transition-all duration-300;
}

.input:focus {
  transform: translateY(-1px);
  box-shadow: 0 8px 25px rgba(37, 99, 235, 0.15);
  @apply ring-2 ring-brand-500 border-brand-500;
}

.input:focus + .input-icon {
  @apply text-brand-500;
}

/* Input Icons */
.input-icon {
  transition: color 0.2s ease;
}

/* Loading States */
.loading {
  opacity: 0.7;
  cursor: not-allowed;
  position: relative;
}

.loading:hover {
  transform: none !important;
  box-shadow: none !important;
}

.loading::after {
  content: '';
  position: absolute;
  width: 20px;
  height: 20px;
  margin: auto;
  border: 2px solid transparent;
  border-top-color: #ffffff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

@keyframes spin {
  0% { transform: translate(-50%, -50%) rotate(0deg); }
  100% { transform: translate(-50%, -50%) rotate(360deg); }
}

/* Alert Animations */
.alert {
  @apply animate-fade-in;
}

/* Enhanced Mobile Responsiveness */
@media (max-width: 1024px) {
  .bg-brand-gradient {
    background: linear-gradient(180deg, #2563eb 0%, #7c3aed 100%);
  }
}

/* Smooth Transitions */
* {
  transition: color 0.2s ease, background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
}

/* Focus Visible Enhancement */
.input:focus-visible {
  outline: 2px solid #2563eb;
  outline-offset: 2px;
}

/* Password Toggle Button */
.password-toggle {
  @apply transition-all duration-200 hover:scale-110 active:scale-95;
}

/* Success/Error States */
.input-success {
  @apply border-green-500 focus:border-green-500 focus:ring-green-500;
}

.input-error {
  @apply border-red-500 focus:border-red-500 focus:ring-red-500;
}

/* Custom Checkbox Styling */
.checkbox:checked {
  @apply bg-brand-600 border-brand-600;
}

.checkbox:focus {
  @apply ring-2 ring-brand-500 ring-offset-2;
}

/* Link Hover Effects */
a {
  @apply transition-all duration-200;
}

a:hover {
  @apply transform scale-105;
}

/* Card Shadow Enhancement */
.login-card {
  box-shadow: 
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06),
    0 0 0 1px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.3s ease;
}

.login-card:hover {
  box-shadow: 
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04),
    0 0 0 1px rgba(0, 0, 0, 0.05);
}
</style>