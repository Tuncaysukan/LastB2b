// API Base Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL
    this.token = localStorage.getItem('auth_token')
  }

  // Set auth token
  setAuthToken(token) {
    this.token = token
    if (token) {
      localStorage.setItem('auth_token', token)
    } else {
      localStorage.removeItem('auth_token')
    }
  }

  // Get auth headers
  getHeaders() {
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`
    }

    return headers
  }

  // Generic API call method
  async makeRequest(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`
    const config = {
      headers: this.getHeaders(),
      ...options,
    }

    try {
      const response = await fetch(url, config)
      
      // Handle different response types
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }

      // Check if response has content
      const contentType = response.headers.get('content-type')
      if (contentType && contentType.includes('application/json')) {
        return await response.json()
      }
      
      return response
    } catch (error) {
      console.error('API Request failed:', error)
      throw error
    }
  }

  // Auth methods
  async login(credentials) {
    return this.makeRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    })
  }

  async register(userData) {
    return this.makeRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    })
  }

  async logout() {
    try {
      await this.makeRequest('/auth/logout', {
        method: 'POST',
      })
    } finally {
      this.setAuthToken(null)
    }
  }

  async refreshToken() {
    return this.makeRequest('/auth/refresh', {
      method: 'POST',
    })
  }

  async getUser() {
    return this.makeRequest('/auth/user')
  }

  // Customer methods
  async getCustomers(params = {}) {
    const queryString = new URLSearchParams(params).toString()
    return this.makeRequest(`/customers${queryString ? `?${queryString}` : ''}`)
  }

  async getCustomer(id) {
    return this.makeRequest(`/customers/${id}`)
  }

  async createCustomer(customerData) {
    return this.makeRequest('/customers', {
      method: 'POST',
      body: JSON.stringify(customerData),
    })
  }

  async updateCustomer(id, customerData) {
    return this.makeRequest(`/customers/${id}`, {
      method: 'PUT',
      body: JSON.stringify(customerData),
    })
  }

  async deleteCustomer(id) {
    return this.makeRequest(`/customers/${id}`, {
      method: 'DELETE',
    })
  }

  // Sales methods
  async getSales(params = {}) {
    const queryString = new URLSearchParams(params).toString()
    return this.makeRequest(`/sales${queryString ? `?${queryString}` : ''}`)
  }

  async getSale(id) {
    return this.makeRequest(`/sales/${id}`)
  }

  async createSale(saleData) {
    return this.makeRequest('/sales', {
      method: 'POST',
      body: JSON.stringify(saleData),
    })
  }

  async updateSale(id, saleData) {
    return this.makeRequest(`/sales/${id}`, {
      method: 'PUT',
      body: JSON.stringify(saleData),
    })
  }

  // Reports methods
  async getReports(type, params = {}) {
    const queryString = new URLSearchParams(params).toString()
    return this.makeRequest(`/reports/${type}${queryString ? `?${queryString}` : ''}`)
  }

  async getDashboardStats() {
    return this.makeRequest('/dashboard/stats')
  }
}

// Export singleton instance
export default new ApiService() 