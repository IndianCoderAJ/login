export * from './alert.actions';
export * from './user.actions';


export function validEmail(text) {
    const regex = RegExp(
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      );
     
    return regex.test(text);
}

export function minMaxLength(text, minLength, maxLength) {
       let result =  text.length > minLength && text.length < maxLength 
        return result;
    }