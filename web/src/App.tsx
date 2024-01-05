import { useCallback, useEffect, useState } from 'react'
import './App.sass'
import { api } from './api/api'
import { Bimestre } from './components/bimestre/bimestre'


export interface Result {
  id: string
  nota: number
  disciplina: string
  bimestre: string
  createdAt: Date
  updatedAt: Date | null
}

interface OrganizedDataType {
  PRIMEIRO?: Result[]
  SEGUNDO?: Result[]
  TERCEIRO?: Result[]
  QUARTO?: Result[]
}

function App() {
  const [results, setResults] = useState<OrganizedDataType>();
  const [newDate, setNewDate] = useState(new Date())

  function reload() {
    setNewDate(new Date())
  }

  const list = useCallback(
    async () => {
      await api.get('/list').then(
        (organizedData) => {
          const typedData: OrganizedDataType = organizedData.data.organizedData
          setResults(typedData)
        }
      )
    }, [])

  useEffect(() => {
    list()
  }, [list, newDate])

  return (
    <div className='app-container'>
      <Bimestre reload={reload} number={1} bimDescription='PRIMEIRO' results={results?.PRIMEIRO} />

      <Bimestre reload={reload} number={2} bimDescription='SEGUNDO' results={results?.SEGUNDO} />

      <Bimestre reload={reload} number={3} bimDescription='TERCEIRO' results={results?.TERCEIRO} />

      <Bimestre reload={reload} number={4} bimDescription='QUARTO' results={results?.QUARTO} />
    </div>
  )
}

export default App
