const upload =(items) =>{
  
    // start uploading files to firebase ---
  items.forEach( (item) =>{ 
    // console.log()
    
  // put uploads file ..upload file to this storage
  
  const uploadTask=storage.ref(`/items/${item.file.name}`).put(item);
  //  check percentage of file uploading
  uploadTask.on("state_changes",(snapshot) =>{
  // formula of percentage ..simplest
    const progress=(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log(`upload is ${progress}% done`);
  
  },err =>console.log(err),() =>{
    uploadTask.snapshot.ref.getDownloadURL().then( (url) =>{
      setFormData( (preState) =>{
        return {...preState,[item.label]:url}
      })
      setUploaded( (preState) =>preState + 1 )
    })
  })
  })
  }
  