export const trackLink = (category, action, label) => event => {
  if (window.ga) {
    event.preventDefault()
    const url = event.currentTarget.href
    window.ga('send', 'event', category, action, label, {
      transport: 'beacon',
      hitCallback() {
        document.location = url
      },
    })
  }
}
