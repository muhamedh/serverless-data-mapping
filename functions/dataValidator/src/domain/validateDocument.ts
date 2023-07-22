import { s3Adapter } from '../driven/s3Adapter';

const validateDocument = async (record:any) => { 
    // read document from s3
    s3Adapter();
 };

export { validateDocument };
