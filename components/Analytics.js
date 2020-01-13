import React from 'react'

const AnalyticsContext = React.createContext()

export function AnalyticsProvider({ analytics, children }) {
  return (
    <AnalyticsContext.Provider value={analytics}>
      {children}
    </AnalyticsContext.Provider>
  )
}

export function useAnalytics() {
  return React.useContext(AnalyticsContext)
}
