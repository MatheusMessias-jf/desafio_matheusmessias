import './style.sass'
import gradeLogo from '../../assets/Chart.svg'
import trash from '../../assets/trash.svg'
import { api } from '../../api/api'
import * as dayjs from 'dayjs'
dayjs.locale('pt-br')

import * as Tooltip from '@radix-ui/react-tooltip';

interface SubjectCardProps {
  id: string
  nota: number
  disciplina: string
  bimestre: string
  createdAt: Date
  updatedAt: Date | null
  reload: () => void
}

export function SubjectCard(props: SubjectCardProps) {
  const cardType = `card-${props.disciplina}`

  async function deleteNota(id: string) {
    await api.delete(`/remove/${id}`)
    props.reload();
  }

  let nota;
  switch (true) {
    case props.nota <= 5:
      nota = "redGrade"
      break;
    case props.nota > 5 && props.nota < 8:
      nota = "yellowGrade"
      break;
    case props.nota >= 8:
      nota = "greenGrade"
      break;
    default:
      nota = "redGrade"
      break;
  }

  const footerClass = `subject-card-footer ${nota}`


  return (
    <div className='container'>
      <div className={cardType}>
        <div className='subject-card' >
          <div className="subject-card-header">
            <h3 className="subject-card-title">{props.disciplina}</h3>
            <p className="subject-card-date">{dayjs(props.createdAt).format('DD/MM/YYYY')}</p>
          </div>
          <div className={footerClass}>
            <img src={gradeLogo} alt="nota" />
            <div className="subject-card-grade">Nota: {props.nota}</div>
          </div>
        </div>
      </div>

      <Tooltip.Provider>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <button
              onClick={() => {
                deleteNota(props.id)
              }}>
              <img src={trash} alt="" />
            </button>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content className="TooltipContent" sideOffset={5}>
              Apagar nota
              <Tooltip.Arrow className="TooltipArrow" />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>
    </div>
  )
}