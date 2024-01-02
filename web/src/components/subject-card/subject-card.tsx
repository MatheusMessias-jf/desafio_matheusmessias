import './style.sass'
import gradeLogo from '../../assets/Chart.svg'
import trash from '../../assets/trash.svg'
import { Result } from '../../App'

export function SubjectCard(props: Result) {
  const cardType = `card-${props.disciplina}`
  console.log(cardType);
  return (
    <div className='container'>
      <div className={cardType}>
        <div className='subject-card' >
          <div className="subject-card-header">
            <h3 className="subject-card-title">{props.disciplina}</h3>
            <p className="subject-card-date">{props.createdAt.toString()}</p>
          </div>
          <div className="subject-card-footer">
            <img src={gradeLogo} alt="nota" />
            <div className="subject-card-grade">Nota: {props.nota}</div>
          </div>
        </div>
      </div>

      <a>
        <img src={trash} alt="" />
      </a>
    </div>
  )
}