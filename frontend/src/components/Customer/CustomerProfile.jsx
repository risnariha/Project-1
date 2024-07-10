import React, { useState, useRef } from 'react';

function CustomerProfile() {
  const [image, setImage] = useState(null);
  const hiddenFileInput = useRef(null);
  const [selectedDistrict, setSelectedDistrict] = useState("1"); // Add state for selected district

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

  // const handleUploadButtonClick = (file) => {
  //   var myHeaders = new Headers();
  //   const token = "adhgsdaksdhk938742937423";
  //   myHeaders.append("Authorization", `Bearer ${token}`);

  //   var formdata = new FormData();
  //   formdata.append("file", file);

  //   var requestOptions = {
  //     method: "POST",
  //     headers: myHeaders,
  //     body: formdata,
  //     redirect: "follow",
  //   };

  //   fetch("https://trickuweb.com/upload/profile_pic", requestOptions)
  //     .then((response) => response.text())
  //     .then((result) => {
  //       console.log(JSON.parse(result));
  //       const profileurl = JSON.parse(result);
  //       setImage(profileurl.img_url);
  //     })
  //     .catch((error) => console.log("error", error));
  // };

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const handleDistrictChange = (event) => {
    setSelectedDistrict(event.target.value);
  };

  return (
    <>    
    <div className='d-flex bg-secondary w-full h-full' >
      <div id='myDiv' className='bg-info d-flex flex-column py-4 w-25'>
        <div className='justify-content-center d-flex mt-5 pt-5'>
          {image ? (
            <img src={URL.createObjectURL(image)} alt="upload image" className="w-75 h-100 rounded-circle align-items-center justify-content-center" />
          ) : (
            <img src="./../../../public/Elitez.png" alt="upload image" className="w-64 h-64 rounded-circle" />
          )}

          <input
            id="image-upload-input"
            type="file"
            onChange={handleImageChange}
            ref={hiddenFileInput}
            style={{ display: "none" }}
          />
        </div>
        <div className=" d-flex justify-content-center relative">
          <div className="d-flex">
            <button
              className={`${image ? "d-block" : "d-none"} btn btn-success d-flex mx-2 my-3`}
              // onClick={handleUploadButtonClick}
            >
              Upload
            </button>
            <button onClick={handleClick} style={{ cursor: "pointer" }} className={`${image ? "d-none" : "d-block"} btn btn-secondary my-3`}>Choose file</button>
            <button onClick={handleClick} style={{ cursor: "pointer" }} className={`${image ? "d-block" : "d-none"} btn btn-info my-3`}>Edit</button>
          </div>
        </div>
      </div>

      <div className=' bg-secondary flex-grow-1 '>
        <div className='d-flex '>
          <div className='ms-5 pt-5 d-felx'>
            {image ? (
              <img src={URL.createObjectURL(image)} alt="upload image" className="p-2 h-32 w-32 rounded-circle align-items-center justify-content-center" />
            ) : (
              <img src="./../../../public/Elitez.png" alt="upload image" className="w-32 h-32 rounded-circle" />
            )}
          </div>
          <div className='justify-content-center d-flex w-100'>
            <form className='mt-5 w-75'>
                <div className="mb-3">
                <label htmlFor="inputFirstName" className="form-label">First Name</label>
                <input type="text" className="form-control" id="lname" />
              </div>
              <div className="mb-3">
                <label htmlFor="inputLastName" className="form-label">Last Name</label>
                <input type="text" className="form-control" id="fname" />
              </div>
              <div className="mb-3">
                <label htmlFor="inputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" />
              </div>
              <div className="mb-3">
                <label htmlFor="inputMobile" className="form-label">Mobile Number</label>
                <input type="number" className="form-control" id="mobile" />
              </div>
              <div className="mb-3">
                <label htmlFor="inputDistrict" className="form-label">District</label>
                <select className="form-select" aria-label="Default select example" value={selectedDistrict} onChange={handleDistrictChange}>
                  <option value="1">Jaffna</option>
                  <option value="2">Kilinochchi</option>
                  <option value="3">Mullaitivu</option>
                  <option value="4">Mannar</option>
                  <option value="5">Vavuniya</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="inputAddress" className="form-label">Address</label>
                <input type="text" className="form-control" id="address" />
              </div>
              <div className="mb-3">
                <label htmlFor="inputRefNo" className="form-label">Reffrence No</label>
                <input type="text" className="form-control" id="refno" />
              </div>
              <button type="submit" className="btn btn-success">Save</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default CustomerProfile
