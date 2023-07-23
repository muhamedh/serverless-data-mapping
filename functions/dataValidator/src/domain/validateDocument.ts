import { s3Adapter } from '../driven/s3Adapter';

const validateDocument = async (s3Payloads:S3Payload[]) => { 
    // read document from s3
    //s3Adapter();
    for(const s3Payload of s3Payloads){
        console.log('validateDocument' + JSON.stringify(s3Payload));
    }
 };

export { validateDocument };
