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

  const list = useCallback(
    async () => {
      await api.get('/list').then(

        (organizedData) => {
          const typedData: OrganizedDataType = organizedData.data.organizedData
          console.log(typedData);
          setResults(typedData)
        }
      )
    }, [])

  useEffect(() => {
    list()
  }, [list])

  return (
    <div className='app-container'>
      <Bimestre number={1} results={results?.PRIMEIRO} />

      <Bimestre number={2} results={results?.SEGUNDO} />

      <Bimestre number={3} results={results?.TERCEIRO} />

      <Bimestre number={4} results={results?.QUARTO} />
    </div>
  )
}

export default App
