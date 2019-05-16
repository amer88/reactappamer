import React, { Component } from 'react'
import classes from './ItemInformation.css'

import Input from '../../UI/Input/Input'
import Button from '../../UI/Button/Button'
class ItemInformation extends Component {
    state = {
        itemForm: {
            itemid: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter Item Id"'
                },
                value: '',
                validation: {
                    required: true
                },
                valid:false,
                touched:false
            },
            itemname: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter Item Name"'
                },
                value: '',
                validation: {
                    required: true
                },
                valid:false,
                touched:false
            },
            itemprice: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter Item Price"'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 3,
                    maxLength: 5

                } ,
                valid:false,
                touched:false
            },
            itemcat: {
                elementType: 'select',
                elementConfig: {
                    options: [{ value: 'Veg', displayValue: 'Tomota' },
                    { value: 'Meet', displayValue: 'Chicken' }],


                },
                value: '',
                valid:true
            }
        },
        formIsValid:false,
        loading:false

    }
    submitForm = () => {
        console.log('Submit Data');
    }
    inputChangedHandler = (event, inputIdentifier) => {
        const updatedItemInformation = {
            ...this.state.itemForm
        };
        const updatedFormElement = {
            ...updatedItemInformation[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid=this.checkValidity(updatedFormElement.value,updatedFormElement.validation)
        updatedFormElement.touched=true;
        updatedItemInformation[inputIdentifier] = updatedFormElement;
     // console.log(updatedItemInformation[inputIdentifier].valid)
        
        let formIsValid=true;
        for(let inputIdentifier in updatedItemInformation){
            formIsValid=updatedItemInformation[inputIdentifier].valid&&formIsValid;
        }
        console.log('AMER'+formIsValid);
        this.setState({ itemForm: updatedItemInformation,formIsValid:formIsValid });

    }
    itemHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for (let formElementIdentifier in this.state.itemForm) {
            formData[formElementIdentifier] = this.state.itemForm[formElementIdentifier].value;
        }
        const itemInfo = {
            itemData: formData

        }
        console.log(itemInfo)
        /*
        axios.post('url',itemInfo)
        .then(response=>{
            this.setState({loading:false})
            this.props.history.push('/')
            console.log(response)
        }).catch(error=>{
            this.setState({loading:false})
        })*/
    }
    checkValidity (value, rules){
        let isValid = true;
        if (rules.required) {
            isValid = value.trim() !== ''&&isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength&&isValid;
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength&&isValid;
        }
        console.log(isValid)
        return isValid;
    }
    render() {
        const formArrayElement = [];
        for (let key in this.state.itemForm) {
            formArrayElement.push({
                id: key,
                config: this.state.itemForm[key]
            })
        }
        let form = (
            <form onSubmit={this.itemHandler}>
                {formArrayElement.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />

                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>Submit Form</Button>

            </form>
        );

        return (
            <div className={classes.ItemInformation}>
                <h4>Please Enter Item Information </h4>
                {form}
            </div>
        )
    }
}
export default ItemInformation;