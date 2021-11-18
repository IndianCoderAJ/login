
export const  headers = () =>  {
    return {
        'Content-Type': 'application/json',
        'authorization':localStorage.getItem('user-auth')?localStorage.getItem('user-auth'):null
    }
}