import React from 'react'

const dataContext = React.createContext({})

export const DataProvider = dataContext.Provider
export const DataConsumer = dataContext.Consumer

export default dataContext