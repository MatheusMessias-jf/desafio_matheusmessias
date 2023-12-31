import './style.sass'
import gradeLogo from '../../assets/Chart.svg'
import trash from '../../assets/trash.svg'

export function SubjectCard() {
  return (
    <div className='container'>
      <div className="subject-card">
        <div className="subject-card-header">
          <h3 className="subject-card-title">Biologia</h3>
          <p className="subject-card-date">20/12/2023</p>
        </div>
        <div className="subject-card-footer">
          <img src={gradeLogo} alt="nota" />
          <div className="subject-card-grade">Nota: 5</div>
        </div>
      </div>
      <a>
        <img src={trash} alt="" />
      </a>
    </div>
  )
}