import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import { FaCircleUser } from "react-icons/fa6";
import { useOutletContext } from 'react-router-dom';

function CustomerProfile() {
  const {user} =useOutletContext();
  const [image, setImage] = useState(null);
  const [edit, setEdit] = useState(false);
  const [email,setEmail] = useState();
  const [number, setNumber]=useState();
  const [address,setAddress]=useState();
  
  const hiddenFileInput = useRef(null);
  const [selectedDistrict, setSelectedDistrict] = useState("1"); // Add state for selected district

  useEffect(()=>{
    if(!email){
      setEmail(user.email);
    }
    if(!number){
      setNumber(user.customerContactNumber);
    }
    if(!address){
      setAddress(user.customerAddress);
    }
    const user_id =user.ID;
  },[edit])
useEffect(()=>{
  console.log('user values : ',user);
},[user])

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const imgname = event.target.files[0].name;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const img = new Image();
      img.src = reader.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const maxSize = Math.max(img.width, img.height);
        canvas.width = maxSize;
        canvas.height = maxSize;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(
          img,
          (maxSize - img.width) / 2,
          (maxSize - img.height) / 2
        );
        canvas.toBlob(
          (blob) => {
            const file = new File([blob], imgname, {
              type: "image/png",
              lastModified: Date.now(),
            });

            console.log(file);
            setImage(file);
          },
          "image/jpeg",
          0.8
        );
      };
    };
  };
const handleSubmit= async (e)=>{
      const response = await axios.put('http://localhost:8080/backend/api/customer',{user_idemail,address,number})

};

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const handleDistrictChange = (event) => {
    setSelectedDistrict(event.target.value);
  };

  return (
    <>
      <div className={``} >
      {!edit && ( <div id='myDiv' className=' d-flex py-4 w-100 flex-column justify-content-center'>
          <div className=' d-flex py-4 w-100 xs-flex-column justify-content-center m-auto'>
          <div className='justify-content-center d-flex w-25 m-auto align-items-center '>
            {image ? (
              <img src={URL.createObjectURL(image)} alt="upload image" className="w-75 h-100 rounded-circle align-items-center justify-content-center" />
            ) : (
              //  <img src="./../../../public/Elitez.png" alt="upload image" className="w-64 h-64 rounded-circle" />
              <FaCircleUser className="w-64 h-64 rounded-circle bg-white " />
            )}

            
          </div>
          <div className='md-w-75 sm-w-100 xs-w-100 d-flex m-auto flex-column justify-content-center fs-5 p-4'>
            <div className='w-100 d-flex mb-1 justify-content-center'>
              <div className='md-w-25 sm-w-50 xs-w-50'>Name </div>: 
              <div className='w-50 ps-2'>{user.customerName} </div>
            </div>
            <div className='w-100 d-flex mb-1 justify-content-center'>
              <div className='md-w-25 sm-w-50 xs-w-50'>Shop Name</div>: 
              <div className='w-50 ps-2'>{user.customerShopName}</div>
            </div>
            <div className='w-100 d-flex mb-1 justify-content-center'>
              <div className='md-w-25 sm-w-50 xs-w-50'>Email Address</div>: 
              <div className='w-50 ps-2'>{user.email}</div>
            </div>
            <div className='w-100 d-flex mb-1 justify-content-center'>
              <div className='md-w-25 sm-w-50 xs-w-50'>Mobile Number</div>: 
              <div className='w-50 ps-2'>{user.customerContactNumber}</div>
            </div>
            <div className='w-100 d-flex mb-1 justify-content-center'>
              <div className='md-w-25 sm-w-50 xs-w-50'>District</div>: 
              <div className='w-50 ps-2'>{user.customerDistrict}</div>
            </div>
            <div className='w-100 d-flex mb-1 justify-content-center'>
              <div className='md-w-25 sm-w-50 xs-w-50'>Address</div>: 
              <div className='w-50 ps-2'>{user.customerAddress}</div>
            </div>
            <div className='w-100 d-flex mb-1 justify-content-center'>
              <div className='md-w-25 sm-w-50 xs-w-50'>Reference No</div>: 
              <div className='w-50 ps-2'>{user.customerShopReferenceNo}</div>
            </div>
            <div className='d-flex mt-5 justify-content-center'>
            <button className='btn btn-secondary w-25' onClick={()=>setEdit(true)}>Edit</button>
          </div>
          </div>
          </div>
          
            
        </div>)} 
        {edit && (
          <div className=' flex-grow-1 '>
            <div className='d-flex xs-flex-column'>
              <div className='pt-5 d-felx justify-content-center w-50'>
                {image ? (
                  <img src={URL.createObjectURL(image)} alt="upload image" className="w-75  rounded-circle align-items-center justify-content-center d-flex m-auto" />
                ) : (
                  <FaCircleUser className="w-75 h-50 m-auto rounded-circle bg-white justify-content-center d-flex" />

                )}
                <input
              id="image-upload-input"
              type="file"
              onChange={handleImageChange}
              ref={hiddenFileInput}
              style={{ display: "none" }}
            />
                <div className=" d-flex justify-content-center">
                  <div className="d-flex row">
                    {/* <button
                      className={`${image ? "d-block" : "d-none"} btn btn-success  d-flex mt-3 justify-content-center`}
                    // onClick={handleUploadButtonClick}
                    >
                      Upload
                    </button> */}
                    <button onClick={handleClick} style={{ cursor: "pointer" }} className={`${image ? "d-none" : "d-block"} btn btn-secondary`}>Choose file</button>
                    <button onClick={handleClick} style={{ cursor: "pointer" }} className={`${image ? "d-block" : "d-none"} btn btn-info my-3`}>Edit</button>
                  </div>
                </div>
              </div>
              <div className='justify-content-center fs-6 d-flex w-full'>
                <form className='my-5 w-75'>
                  <div className="mb-3">
                    <label htmlFor="inputFirstName" className="form-label"> Customer Name</label>
                    <input type="text" className="form-control" id="lname" disabled value={user.customerName} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="inputLastName" className="form-label">Shop Name</label>
                    <input type="text" className="form-control" id="fname " disabled value={user.customerShopName}/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="inputEmail1" className="form-label" >Email address</label>
                    <input type="email" className="form-control" id="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="inputMobile" className="form-label">Mobile Number</label>
                    <input type="number" className="form-control" id="mobile" value={number} onChange={(e)=>setNumber(e.target.value)} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="inputDistrict" className="form-label" >District</label>
                    <select className="form-select" aria-label="Default select example" disabled value={user.customerDistrict}>
                      <option value="1">Jaffna</option>
                      <option value="2">Kilinochchi</option>
                      <option value="3">Mullaitivu</option>
                      <option value="4">Mannar</option>
                      <option value="5">Vavuniya</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="inputAddress" className="form-label" >Address</label>
                    <input type="text" className="form-control" id="address" value={address} onChange={(e)=>setAddress(e.target.value)}/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="inputRefNo" className="form-label">Reffrence No</label>
                    <input type="text" className="form-control" id="refno" disabled value={user.customerShopReferenceNo} />
                  </div>
                  <button type="submit" className=" save w-50 m-auto justify-content-center d-flex align-items-center fs-4" onClick={handleUploadButtonClick}>Save</button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default CustomerProfile
