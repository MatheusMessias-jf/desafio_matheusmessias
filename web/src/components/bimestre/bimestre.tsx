import { Result } from '../../App'
import { AddButton } from '../add-button/add-button'
import { SubjectCard } from '../subject-card/subject-card'
import './style.sass'

interface BimestreProps {
  number: number
  results: Result[] | undefined
}

export function Bimestre({ number, results }: BimestreProps) {
  return (
    <div className="bimestre-container">
      <div className="bimestre-header">
        <h2 className="bimestre-header-title"> Bimestre {number}</h2>
        <AddButton />
      </div>

      <div className="cards-container">
        {results && results!.map((result: Result) => {
          return (
            <SubjectCard {...result} key={result.disciplina} />
          )
        })}
      </div>
    </div>

  )
}