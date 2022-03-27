import axios from "axios";
import { resolve } from "path";


class IPFSService {
    testAuthentication = () => {
        const url = `https://api.pinata.cloud/data/testAuthentication`;
        return axios
            .get(url, {
                headers: {
                    'pinata_api_key': import.meta.env.VITE_PINATA_KEY,
                    'pinata_secret_api_key': import.meta.env.VITE_PINATA_KEY_SECRET
                }
            })
            .then(function (response) {
                console.log('Resp ', response)
            })
            .catch(function (error) {
                //handle error here
                console.log('error ', error)
            });
    }

    pinFileToIPFS = async (selectedFile:any) => {
        console.log('IMAGE TO UPLOAD: ', selectedFile)
        const metadata = JSON.stringify({
            name: selectedFile.name || 'imageName',
            keyvalues: {
                accountId: '0x000'
            }
        });
        const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
        //we gather a local file from the API for this example, but you can gather the file from anywhere
        // Update the formData object
        const formData = new FormData();
        formData.append( "file",selectedFile, `${selectedFile.name}`);
        formData.append('pinataMetadata', metadata);

        const response = await axios.post(url,
            formData,
            {
                headers: {
                    'Content-Type': `multipart/form-data; ; boundary=${formData._boundary}`,
                    'pinata_api_key': import.meta.env.VITE_PINATA_KEY,
                    'pinata_secret_api_key': import.meta.env.VITE_PINATA_KEY_SECRET
                }
            }
        )
        return response;
    };


}

const ipfsService = new IPFSService();

export { ipfsService }