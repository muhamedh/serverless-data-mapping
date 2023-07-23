import { s3Adapter } from '../driven/s3Adapter';

const validateDocument = async (s3Notifications:S3Notification[]) => { 
    // read document from s3
    //s3Adapter();
    for(const S3Notification of s3Notifications){
        console.log('validateDocument' + JSON.stringify(S3Notification));
    }
 };

export { validateDocument };
