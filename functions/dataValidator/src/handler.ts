import { v4 as uuidv4 } from 'uuid';

const handler = (() => {
    console.log(uuidv4());
    return 'hello';
});

export { handler };    
