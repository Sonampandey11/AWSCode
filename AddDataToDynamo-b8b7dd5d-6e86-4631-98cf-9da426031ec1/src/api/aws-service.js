const AWS = require('aws-sdk');

AWS.config.update({
    region: "us-east-1"
});
const doclient = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3();

//function to add data to dynamoDb
async function addDataToDynamoDb(params){
    let addData= await doclient.put(params).promise().then((data)=>{
        // let saveRecord= docClient.put(uploadRecord).promise().then((data)=>{
         console.log('Item successfuly Inserted to DynamoDB');
        return data;
    }).catch((error)=>{
        console.log("failed to add data to DynaomoDb",error);
        throw error;
        
    });
    return addData;
}


//function to retrieve data from DynamoDb

async function fetchDataFromDynamoDb(params){
    console.log("params",params);
    let fetchData= await doclient.get(params).promise().then((data)=>{
        // let saveRecord= docClient.put(uploadRecord).promise().then((data)=>{
         console.log('Item successfuly fetched from DynamoDB');
        return data;
    }).catch((error)=>{
        console.log("failed to fetch data from DynaomoDb",error);
        throw error;
        
    });
    return fetchData;
}


//function to update data of DynamoDb

async function updateDataOfDynamoDb(params){
     console.log("params",params);
    let updateData= await doclient.update(params).promise().then((data)=>{
        // let saveRecord= docClient.put(uploadRecord).promise().then((data)=>{
         console.log('Item successfuly update to DynamoDB');
        return data;
    }).catch((error)=>{
        console.log("failed to fetch update to DynaomoDb",error);
        throw error;
        
    });
    return updateData;
}


async function deleteDataFromDynamodb(params){
    console.log("params",params);
    let deletedData= doclient.delete(params).promise().then((data)=>{
        console.log("Data deleted successfuly");
        return data;
    }).catch((error)=>{
        console.log("Fails to delete data from DynamoDb",error);
    });
    return deletedData;
}


async function addImageToS3(params){
    console.log(":S3 parameter",params);
    let S3Data = s3.putObject(params).promise().then((data)=>{
        console.log("data added to S3 successfuly");
        return data;
    }).catch((error)=>{
        console.log("Fails to add data in S3",error);
    });
    return S3Data;
}

module.exports={
    addDataToDynamoDb,
    fetchDataFromDynamoDb,
    updateDataOfDynamoDb,
    deleteDataFromDynamodb,
    addImageToS3
};