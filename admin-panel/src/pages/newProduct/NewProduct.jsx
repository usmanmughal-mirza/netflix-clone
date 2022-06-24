import { useContext, useState } from "react";
import "./newProduct.css";
import storage from "../../firebase"; 
import {ref,uploadBytesResumable,getDownloadURL} from "firebase/storage"
import {MovieContext} from '../../context/movieContext/MovieContext'
import {createMovie} from '../../context/movieContext/apiCalls'


export default function NewProduct() {
  const [formData,setFormData]=useState(null);
  // these 5 are files 
  const [img,setImg]=useState(null);
  const [imgTitle,setImgTitle]=useState(null);
  const [imgSm,setImgSm]=useState(null);
  const [trailer,setTrailer]=useState(null);
  const [video,setVideo]=useState(null);
  const [uploadingProgress,setUploadingProgress]=useState(false);
  // it shows how many files uploaded , in the beginning its 0 
  const [uploaded,setUploaded]=useState(0);

  const {dispatch}=useContext(MovieContext);


  // console.log(formData);
  // setImg(e.target.files[0]) 
  // files is array ..check console 

  const changeHandler =(e) =>{
    const {value,name}=e.target;

    setFormData({
      ...formData,
      [name]:value
    })
  }

  // when uploads files then ----------
  const submitHandler =(e)=>{
    e.preventDefault();
    createMovie(formData,dispatch);
  }
// when we click on upload button  -----------------
// -------------------------------------
// ----------------------------------
  const handleUpload =(e) =>{
    e.preventDefault();
    
    // label must be same(schema name)that in our backend ------
    upload([
      {file:img,label:'img'},
      {file:imgTitle,label:'imgTitle'},
      {file:imgSm,label:'imgSm'},
      {file:trailer,label:'trailer'},
      {file:video,label:'video'}
    ])
    }
    

  // when we click on upload button it calls handleUpload()
  // in which upload() calls and we receives files at 
  // parameter of upload (item) 

  // The forEach() method executes a provided function once for each array element 
// items is an array 

const upload =(items) =>{
items.forEach( (item) =>{
  // item.file.name check item in console.item is an array it cotains object file in which name filed..img name
  // create a folder and then write file name 
  // console.log(item);

  // create folder in firebase 
  // create fileName so if we have same fileName it aviods..because every upload new time is added with file Name..time is also a fileName ..
//  + is concatenate time and file name,label

  const fileName=new Date().getTime() + item.label + item.file.name;
  console.log(fileName);
  const FilesRef=ref(storage,`/items/${fileName}`);


 const uploadTask=uploadBytesResumable(FilesRef,item.file);
//  'state_changed' observer, called any time the state changes
//  Observe state change events such as progress, pause, and resume

 uploadTask.on("state_changed",(snapshot) =>{
  //  percentage of file uploading..very simple..
  // normal school life formula

  const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  console.log('Upload is ' + progress + '% done');
  {progress ? setUploadingProgress(true):setUploadingProgress(false) };

 },(error) =>{
   // Handle unsuccessful uploads
   console.log(error)
 },() =>{
   // Handle successful uploads on complete
getDownloadURL(uploadTask.snapshot.ref).then( (downloadURL) =>{
   
  // we set item.label in upload function 
  // label is name of file(useState name of file)
  setFormData( (preState) =>{
    return {...preState,[item.label]:downloadURL}
  } )
  // increase number of files one by one .. to 5  
  setUploaded( (preState) => preState + 1);
})
 } )
})
}


// console.log(formData);
  return (
    <>
    {uploadingProgress ? 'uploading progress ...)':''}
    <div className="newProduct">
      <h1 className="addProductTitle">New Movie  </h1>
      <form className="addProductForm">

        {/* input file --------------------------- */}

        <div className="addProductItem">
          <label>Image</label>
          <input type="file" id="img" name="img" 
          onChange={(e) =>setImg(e.target.files[0])} />
        </div>

        <div className="addProductItem">
          <label>Title Image</label>
          <input type="file" id="imgTitle"
           name="imgTitle" 
           onChange={(e) =>setImgTitle(e.target.files[0])}
            />
        </div>

        <div className="addProductItem">
          <label>Thumbnail Image</label>
          <input
           onChange={(e) =>setImgSm(e.target.files[0])}
           type="file" id="imgSm" name="imgSm" />
        </div>

        {/* input fields -------------------- */}
        <div className="addProductItem">
          <label>Title</label>
          <input  onChange={changeHandler}
           type="text" placeholder="Usman Mughal" name="title" />
        </div>

        <div className="addProductItem">
          <label>Description</label>
          <input  onChange={changeHandler}
           type="text" placeholder="description" name="desc" />
        </div>

        <div className="addProductItem">
          <label>Year</label>
          <input  onChange={changeHandler}
           type="text" placeholder="Year" name="year" />
        </div>

        <div className="addProductItem">
          <label>Genre</label>
          <input  onChange={changeHandler}
          type="text" placeholder="Genre" name="genre" />
        </div>

        <div className="addProductItem">
          <label>Duration</label>
          <input  onChange={changeHandler}
           type="text" placeholder="Duration" name="duration" />
        </div>

        <div className="addProductItem">
          <label>limit</label>
          <input  onChange={changeHandler}
           type="text" placeholder="limit" name="limit" />
        </div>


        <div className="addProductItem">
          <label>Is Series ?</label>
          <select  onChange={changeHandler}
           name="isSeries" id="isSeries">
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>

        {/* input file --------------------------- */}

        <div className="addProductItem">
          <label>Trailer</label>
          <input onChange={(e) =>setTrailer(e.target.files[0])}
           type="file" name="trailer" />
        </div>

        <div className="addProductItem">
          <label>Video </label>
          <input
           onChange={(e) =>setVideo(e.target.files[0])}
           type="file" name="video" />
        </div>
        {/* when all files are uploaded then uploaded ===5  */}

        {uploaded === 5 ? (
 <button className="addProductButton" onClick={submitHandler}>Create</button>
        ) :(
          <button className="addProductButton" onClick={handleUpload}>Upload</button>
        ) }
      </form>
    </div>
    </>
  );
}
