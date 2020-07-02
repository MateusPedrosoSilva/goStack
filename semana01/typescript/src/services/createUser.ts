// Interface: Define the structure of data
// tipagem de conjunto de dados.
interface techObject {
    title: string,
    experience: number,
}

interface CreateUserData {
    name?: string, // ?: optional 
    email: string,
    password: string,
    techs: Array<string | techObject> // More than one type
    // techs: string[] // Just on type
}

// Define the type of data. In case, an object of CreateUserData type.
export default function createUser({name = '', email, password}: CreateUserData) {
    const user = {
        name,
        email,
        password,
    }
    // return the created user.
    return user;
}