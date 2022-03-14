import React, {useContext} from 'react'
import { Form, Button } from 'react-bootstrap'
import { Context } from '../context/AppContext'
export default function InputCount({inputName, button, setFunction, item, amount, setClicked, inputType}) {
    const {updateAmount, updateList } = useContext(Context)

    const closeButton = () =>{
        setClicked(prev => {
            return {...prev, [button]:false}
          })
    }
    return (
        <Form key={item.id} className="input-control">
        <Form.Control onChange={(e)=> {
          setFunction(e.target.value)
          
        }}className="count-input" type={inputType} name={inputName} value={amount}/>
        <Button 
            className="btn-margin form-btns"
            variant="success"
            onClick={()=> {
                updateList(item.id, inputName, amount)
                closeButton()
            }}
            size="sm">
                &#x2713;
            </Button>
        <Button className="form-btns"variant="danger" onClick={closeButton}size="sm">X</Button>
      </Form>
    )
}
