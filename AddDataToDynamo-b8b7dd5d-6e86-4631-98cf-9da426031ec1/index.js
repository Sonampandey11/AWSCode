const awsservice=require('./src/api/aws-service');
//adding data to DynaomoDb table EmployeeDetails and performing all the CRUD operation
exports.handler = async (event) => {
    try{
    console.log("Value of event",event);
    let dataparams = {
        TableName :"EmployeeDetails",
        Item : {
            "EmployeeName":"Anaya",
            "EmployeeId":"123450",
            "Desig":"SeniorAnalyst"
        }
    };
   // console.log("data",awsservice.addDataToDynamoDb());
   
   // This function add data to DynamoDb
    let addEmployee= await awsservice.addDataToDynamoDb(dataparams);
   console.log("addEmployees successfuly",addEmployee);
   
   
   //To fetch Data from Dynamodb
   
   
    let retrieveData ={
        TableName : "EmployeeDetails",
        Key :{
            "EmployeeId": "142366"
        }
        
    };
    let fetchData= await awsservice.fetchDataFromDynamoDb(retrieveData);
    console.log("Fetched data successfuly from Dynamodb",fetchData);
    
   
   
   
   
   
   
   // update data in DynamoDb on basis of EmployeeId
   
    let updateParams ={
        TableName :"EmployeeDetails",
        Key :{
            "EmployeeId":"142367"
        },
        UpdateExpression : " set EmployeeName = :EmployeeName",
      
        ExpressionAttributeValues :{
            ":EmployeeName":"Rohan"
            
        },
        ReturnValues:"UPDATED_NEW"
    };
   
    let updateData = await awsservice.updateDataOfDynamoDb(updateParams);
    console.log("Data updated successfuly",updateData);
     


    
    
    
    // To delete data from DynamoDb
 let deleteParams ={
     TableName : "EmployeeDetails",
     Key :{
         "EmployeeId":"142366"
        // "EmployeeName":"Neha"
     }
    
 };
 let deleteData= await awsservice.deleteDataFromDynamodb(deleteParams);
 console.log("Data deleted successfully",deleteData);
 
 
 
      let s3Params = {
        Bucket: "reunite-images-test",
        Key: "UploadFile",
        Body:"https://images.news18.com/ibnlive/uploads/2017/01/sonia-gandhi-pti-875.jpg" ,

    };
    
    let insertDataToS3 = await awsservice.addImageToS3(s3Params);
    console.log("Images added to S3", insertDataToS3);
}//end of function


catch(error){
    console.log("Fails to execute lambda",error);
}
};
