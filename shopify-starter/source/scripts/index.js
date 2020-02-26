window.config = window.config || {}

export default window.config = {
  asset_url: "{{ asset_path | split: '?' | first }}",
  modules: {
    currencies: 'https://cdn.shopify.com/s/javascripts/currencies.js',
    countries: '{{ shop.secure_url }}/services/countries.js',
    photoswipe: "{{ 'photoswipe.js' | asset_url }}"
  },
  session: {
    history: [],
    params: Object,
    path: Object,
    viewed_products: []
  },
  customer: {
    device: '',
    discount: '',
    bogo: false,
    authenticated: '{{ customer_auth }}',
    newsletter: true,
    password_reset: false
  },
  locale: {
    language: 'EN',
    code: 'SE',
    continent: 'Scandinavia',
    country: 'Sweden',
    currency: 'SEK',
    flag: '',
    shipping_rate: 0
  }
}
