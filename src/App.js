import { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Button, Container, Input, Section, Balance } from './components/components'


const compoundInterest = ( deposit, contribution, years, rate )=>{
  let total = deposit;

  for( let i = 0; i < years; i++ ){
      total = ( total + contribution ) * ( rate + 1 )
  }
  return Math.round( total );
};


const formatter = new Intl.NumberFormat('en-US',{
  style: 'currency',
  currency: 'EUR',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
})
function App() {

  const [balance, setBalance] = useState('')
  const handleSubmit = ( { deposit, contribution, years, rate }) =>{
    const val = compoundInterest( 
      Number( deposit ), 
      Number( contribution), 
      Number( years ), 
      Number( rate )
      );
      setBalance(formatter.format( val ));
  }

 
  return (
    <Container>
      <Section>
         <Formik
          initialValues={ {
            deposit: '',
            contribution: '',
            years: '',
            rate:''
          }}
          onSubmit={ handleSubmit }
          validationSchema={ Yup.object({
            // Propiedades para pasar la validación
            deposit     : Yup.number().required('Obligatorio').typeError('Debe ser un número'),
            contribution: Yup.number().required('Obligatorio').typeError('Debe ser un número'),
            years       : Yup.number().required('Obligatorio').typeError('Debe ser un número'),
            rate        : Yup
              .number()
              .required('Obligatorio')
              .typeError('Debe ser un número')
              .min(0, 'El valor minimo es 0')
              .max(1, 'El valor máximo es 1'),
          })}

         >
           <Form>
             <Input name="deposit" label="Depósito Inicial" />
             <Input name="contribution" label="Aportación anual" />
             <Input name="years" label="Años" />
             <Input name="rate" label="Interés estimado" />
             <Button type='submit'>Calcular</Button>
           </Form>
         </Formik>
         { balance !=='' 
          ? <Balance>Balance final: { balance } </Balance>  
          : null 
          }
      </Section>
    </Container>
    
  );
}

export default App;
