import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import { FaCircleUser } from "react-icons/fa6";
import { useOutletContext } from 'react-router-dom';

function CompanyProfile() {
  const { user } = useOutletContext();
  const [image, setImage] = useState(null);
  const [edit, setEdit] = useState(false);
  const [email, setEmail] = useState(user.email);
  const [number, setNumber] = useState(user.companyContactNumber);
  const [address, setAddress] = useState(user.companyAddress);
  const [businessInfo, setBusinessInfo] = useState(user.businessInfo);

  const hiddenFileInput = useRef(null);

  useEffect(() => {
    console.log('user values : ', user);
  }, [user]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('email', email);
    formData.append('number', number);
    formData.append('address', address);
    formData.append('businessInfo', businessInfo);
    formData.append('user_id', user.companyOwnerID);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await axios.post('http://localhost:8080/backend/api/company/update_profile.php', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Profile updated successfully', response.data);
      setEdit(false); // exit edit mode on successful update
    } catch (error) {
      console.error('There was an error updating the profile!', error);
    }
  };

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  return (
    <div>
      {!edit && (
        <div className=' d-flex py-4 w-100 flex-column justify-content-center'>
          <div className=' d-flex py-4 w-100 xs-flex-column justify-content-center m-auto'>
            <div className='justify-content-center d-flex w-30  align-items-start ms-5'>
              {image ? (
                <img src={URL.createObjectURL(image)} alt="upload image" className="w-75 rounded-circle align-items-center justify-content-center" />
              ) : (
                user.image ? (
                  <img src={user.image} alt=" image" className="w-100 rounded-circle align-items-start d-flex " />
                ) : (
                  <FaCircleUser className="w-64 h-64 rounded-circle bg-white " />
                )
              )}
            </div>
            <div className='md-w-75 sm-w-100 xs-w-100 d-flex m-auto flex-column justify-content-center fs-5 p-4'>
              <div className='w-100 d-flex mb-1 justify-content-center'>
                <div className='md-w-25 sm-w-50 xs-w-50'>Name </div>:
                <div className='w-50 ps-2'>{user.companyOwnerName} </div>
              </div>
              <div className='w-100 d-flex mb-1 justify-content-center'>
                <div className='md-w-25 sm-w-50 xs-w-50'>Shop Name</div>:
                <div className='w-50 ps-2'>{user.companyName}</div>
              </div>
              <div className='w-100 d-flex mb-1 justify-content-center'>
                <div className='md-w-25 sm-w-50 xs-w-50'>Email Address</div>:
                <div className='w-50 ps-2'>{user.email}</div>
              </div>
              <div className='w-100 d-flex mb-1 justify-content-center'>
                <div className='md-w-25 sm-w-50 xs-w-50'>Mobile Number</div>:
                <div className='w-50 ps-2'>{user.companyContactNumber}</div>
              </div>
              <div className='w-100 d-flex mb-1 justify-content-center'>
                <div className='md-w-25 sm-w-50 xs-w-50'>District</div>:
                <div className='w-50 ps-2'>{user.district}</div>
              </div>
              <div className='w-100 d-flex mb-1 justify-content-center'>
                <div className='md-w-25 sm-w-50 xs-w-50'>Address</div>:
                <div className='w-50 ps-2'>{user.companyAddress}</div>
              </div>
              <div className='w-100 d-flex mb-1 justify-content-center'>
                <div className='md-w-25 sm-w-50 xs-w-50'>Business Info</div>:
                <div className='w-50 ps-2'>{user.businessInfo}</div>
              </div>
              <div className='d-flex mt-5 justify-content-center'>
                <button className='btn btn-secondary w-25' onClick={() => setEdit(true)}>Edit</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {edit && (
        <div className=' flex-grow-1 '>
          <div className='d-flex xs-flex-column'>
            <div className='pt-5 d-felx justify-content-center w-50'>
              {image ? (
                <img src={URL.createObjectURL(image)} alt="upload image" className="w-75 d-flex m-auto rounded-circle align-items-center justify-content-center" />
              ) : (
                user.image ? (
                  <img src={user.image} alt=" image" className="w-75 mb-3 rounded-circle align-items-start d-flex " />
                ) : (
                  <FaCircleUser className="w-64 h-64 rounded-circle bg-white " />
                )
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
                  <button onClick={handleClick} style={{ cursor: "pointer" }} className={`${image ? "d-none" : "d-block"} btn btn-secondary`}>Choose file</button>
                  <button onClick={handleClick} style={{ cursor: "pointer" }} className={`${image ? "d-block" : "d-none"} btn btn-info my-3`}>Edit</button>
                </div>
              </div>
            </div>
            <div className='justify-content-center fs-6 d-flex w-full'>
              <form className='my-5 w-75'>
                <div className="mb-3">
                  <label htmlFor="inputFirstName" className="form-label"> CompanyOwner Name</label>
                  <input type="text" className="form-control" id="lname" disabled value={user.companyOwnerName} />
                </div>
                <div className="mb-3">
                  <label htmlFor="inputLastName" className="form-label"> Company Name</label>
                  <input type="text" className="form-control" id="fname " disabled value={user.companyName} />
                </div>
                <div className="mb-3">
                  <label htmlFor="inputEmail1" className="form-label" >Email address</label>
                  <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label htmlFor="inputMobile" className="form-label">Contact No</label>
                  <input type="number" className="form-control" id="mobile" value={number} onChange={(e) => setNumber(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label htmlFor="inputDistrict" className="form-label" >District</label>
                  <select className="form-select" aria-label="Default select example" disabled value={user.district}>
                    <option value="1">Jaffna</option>
                    <option value="2">Kilinochchi</option>
                    <option value="3">Mullaitivu</option>
                    <option value="4">Mannar</option>
                    <option value="5">Vavuniya</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="inputAddress" className="form-label" >Address</label>
                  <input type="text" className="form-control" id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label htmlFor="inputRefNo" className="form-label">Business Info</label>
                  <input type="text" className="form-control" id="refno" value={businessInfo} onChange={(e) => setBusinessInfo(e.target.value)} />
                </div>
                <button type="submit" className=" save w-50 m-auto justify-content-center d-flex align-items-center fs-4" onClick={handleSubmit}>Save</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CompanyProfile;
