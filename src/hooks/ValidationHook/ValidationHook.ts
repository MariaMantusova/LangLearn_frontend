import React, {useEffect} from "react";
import {IValidations} from "../../interfaces/mainInterfaces";

const useValidation = (value: string, validations: IValidations) => {
    const [isEmpty, setIsEmpty] = React.useState(true);
    const [minLengthError, setMinLengthError] = React.useState(false);
    const [emailError, setEmailError] = React.useState(false);
    const [nameError, setNameError] = React.useState(false);
    const [inputValid, setInputValid] = React.useState(false);
    const [translationError, setTranslationError] = React.useState(false);
    const [englishWordError, setEnglishWordError] = React.useState(false);

    useEffect(() => {
        for (const validation in validations) {
            switch (validation) {
                case 'minLength':
                    value.length < validations[validation] ? setMinLengthError(true) : setMinLengthError(false)
                    break;
                case 'isEmpty':
                    value ? setIsEmpty(false) : setIsEmpty(true);
                    break;
                case 'isEmail':
                    const regularExpEmail = /^([a-zA-Z0-9_-]+\.)*[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)*\.[a-zA-Z]{2,6}$/
                    regularExpEmail.test(String(value.toLowerCase())) ? setEmailError(false) : setEmailError(true)
                    break;
                case 'isName':
                    const regularExpName = /^[a-zа-яёA-ZА-ЯЁ\-\s/i]+$/
                    regularExpName.test(String(value.toLowerCase())) ? setNameError(false) : setNameError(true)
                    break;
                case 'isTranslation':
                    const regularExpTranslation = /^[А-Яа-яЁё\s]+$/
                    regularExpTranslation.test(String(value.toLowerCase())) ? setTranslationError(false) : setTranslationError(true)
                    break;
                case 'isEnglishWord':
                    const regularExpWord = /^[A-Za-z\s]+$/
                    regularExpWord.test(String(value.toLowerCase())) ? setEnglishWordError(false) : setEnglishWordError(true)
            }
        }
    }, [value])

    useEffect(() => {
        if (isEmpty || minLengthError || emailError || nameError || translationError || englishWordError) {
            setInputValid(false)
        } else {
            setInputValid(true)
        }
    }, [isEmpty, minLengthError, emailError, nameError, translationError, englishWordError])

    return {
        isEmpty,
        minLengthError,
        emailError,
        nameError,
        inputValid,
        translationError,
        englishWordError
    }
}

const useInput = (initialValue: string, validations: IValidations) => {
    const [value, setValue] = React.useState(initialValue);
    const [isDirty, setIsDirty] = React.useState(false);
    const valid = useValidation(value, validations);

    const onChange = (evt: any) => {
        setValue(evt.target.value)
    }

    const onBlur = () => {
        setIsDirty(true)
    }

    return {
        value,
        setValue,
        onChange,
        onBlur,
        isDirty,
        setIsDirty,
        ...valid
    }
}

export {useInput}
