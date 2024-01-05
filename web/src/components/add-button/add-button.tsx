import './style.sass'
import addLogo from '../../assets/add.svg'
import * as Dialog from '@radix-ui/react-dialog';
import close from '../../assets/close.svg'
import * as RadioGroup from '@radix-ui/react-radio-group';
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import { api } from '../../api/api';
import { useState } from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';
import React from 'react';


interface AddButtonProps {
  bimDescription: string
  reload: () => void
}

const formSchema = z.object({
  disciplina: z.enum(['Biologia', 'Artes', 'Geografia', 'Sociologia']),
  nota: z.coerce.number().min(0, 'A nota deve ser maior que 0!').max(10, 'A nota deve ser maior que 10!'),
  bimestre: z.string()
})

type formSchemaType = z.infer<typeof formSchema>

export function AddButton({ bimDescription, reload }: AddButtonProps) {
  const [dialogState, setDialogState] = useState(false)
  const [addedSubjects, setAddedSubjects] = useState([] as string[])

  const subjects = ['Biologia', 'Artes', 'Geografia', 'Sociologia']
  const { handleSubmit, control, register, formState: errors } = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bimestre: bimDescription,
    }
  })

  async function createNota(data: formSchemaType) {
    await api.post('/create', data)
    setDialogState(false)
    reload()
  }

  async function updateAddedSubjects(bimestre: string) {
    await api.get(`/list/${bimestre}`).then((data) => {
      const resultTyped: string[] = data.data.result
      setAddedSubjects(resultTyped)
    })
  }

  const MyButton = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>((props, forwardedRef) => (
    <button className="add-button" id='myButton ' {...props} ref={forwardedRef} >
      <img src={addLogo} alt="" />
    </button>

  ));

  return (
    <Dialog.Root open={dialogState} onOpenChange={(value) => {
      setDialogState(value)
      if (value) {
        updateAddedSubjects(bimDescription)
      }
    }}>
      <Tooltip.Provider>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <Dialog.Trigger asChild >
              <MyButton>Open dialog</MyButton>
            </Dialog.Trigger>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content className="TooltipContent" sideOffset={5}>
              Lançar nota
              <Tooltip.Arrow className="TooltipArrow" />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>

      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <div className='dialog-header'>
            <Dialog.Title className="DialogTitle" >Bimestre 1</Dialog.Title>
            <Dialog.Close asChild>
              <button className="IconButton" aria-label="Close">
                <img src={close} alt="" />
              </button>
            </Dialog.Close>
          </div>
          <form onSubmit={handleSubmit(createNota)}>
            <h3 className='items-title'>Disciplina</h3>
            <Controller
              defaultValue='Biologia'
              control={control}
              name='disciplina'
              render={({ field }) => {
                return (
                  <RadioGroup.Root className="RadioGroupRoot" onValueChange={field.onChange} value={field.value}>
                    <div className="items">
                      {subjects.map((subject) => {
                        const className = `RadioGroupItem ${subject}`
                        let disabled = false
                        addedSubjects.map((disciplina) => {
                          if (disciplina == subject) {
                            disabled = true
                          }
                        })
                        return (
                          <RadioGroup.Item disabled={disabled} className={className} value={subject} id={subject} key={subject}  >
                            {subject}
                          </RadioGroup.Item>
                        )
                      })}
                    </div>
                  </RadioGroup.Root>
                )
              }}
            />
            <div className="nota-container">
              <label htmlFor="nota">Nota</label>
              <input type="text" id='nota' {...register('nota')} />
            </div>

            <div className='erro'>
              {errors.errors.nota && <span>{errors.errors.nota.message}</span>}
            </div>
            <div style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}>
              <button type='submit' className="Button">Confirmar</button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root >
  )
}