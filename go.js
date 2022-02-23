const AWS = require('aws-sdk');
const S3 = new AWS.S3();

exports.handler = async (event, context, callback) => {
    try {
        console.log("RGAAAAAAAAAAAAAAAAATTTRRRRRRRRRRRRRRGGGGGGG")
        const cfRequest = event.Records[0].cf.request;
        // only replace when is index page
        if (cfRequest.uri == '/') {
            console.log("ooAAAAAAAAAAAAAAAAAAsxsxsxsxoooooooO")

            const importMapConfig = {
                "mf-this": "https://edfdgfgfgfgdfg.com/mf-this",
                "mf-that": "https://edfdgfgfgfgdfg.com/mf-that",
                "mf-whatever": "https://edfdgfgfgfgdfg.com/mf-whatever",
                "mf-something": "https://edfdgfgfgfgdfg.com/mf-something",
                "mf-something-else": "https://edfdgfgfgfgdfg.com/mf-something-else",
            }

            const mainConfig = {
                blah: "dsfsdfgdfbdfgdsds",
                bdddddh: "deeeeesds",
                bdddddh: "deyyyyyyyyyyysds",
            }

            var params = {
                Bucket: "geroins-chum-bucket",
                Key: 'index.html',
            };

            let data = await getS3Object(params);

            console.log("New New New ", data);
            data = data.Body.toString('utf8');

            let updatedLandingPage = data.replace("___IMPORTMAP_PLACEHOLDER____", JSON.stringify(importMapConfig));
            updatedLandingPage = updatedLandingPage.replace("____CONFIG_PLACEHOLDER____", JSON.stringify(mainConfig));
            console.log("updated landing opage ", updatedLandingPage);

            const base64NewManifest = Buffer.from(updatedLandingPage, 'utf8').toString('base64');

            const response = {
                status: 200,
                body: base64NewManifest,
                bodyEncoding: 'base64',
            };

            console.log(response);
            return response;
        }

        return cfRequest;
    } catch (err) {
        console.log("Error probably in lambda ", err)
    }
}

async function getS3Object(params) {
    return S3.getObject(params).promise()
        .then(data => data)
        .catch(err => { throw new Error("s3 error ", err) })
}